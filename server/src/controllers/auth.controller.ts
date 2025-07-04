import {
	confirmPasswordResetSchema,
	loginSchema,
	resetPasswordSchema,
} from "../configs/zod";
import db from "../configs/db";
import JWT from "jsonwebtoken";
import { TypedRequest } from "../configs/requests";
import {
	AccessTokenType,
	ConfirmPasswordResetType,
	LoginType,
	ResetPasswordType,
} from "../configs/types";
import argon2 from "argon2";
import { randomUUID } from "crypto";
import { NodemailerDB } from "../services/nodemailer-db";
import dotenv from "dotenv";
import { AppError, ERROR_CODES } from "../utils/errors";
import { Request, Response } from "express";
import { sendActivationEmail } from "../utils/helper";
import { generateActivationToken } from "../services/token-gen";
dotenv.config();

export const login = async (
	req: TypedRequest<{}, LoginType>,
	res: Response
) => {
	//validate the user input
	const data = req.body;
	const zodResponse = loginSchema.safeParse(data);

	if (zodResponse.error) throw zodResponse.error;

	//get the user data from the database
	const dbResponse = await db.user.findUnique({
		where: {
			email: data.email,
		},
		include: {
			kyc: true,
		},
	});

	if (!dbResponse)
		throw new AppError(
			ERROR_CODES.USER_NOT_FOUND,
			"Invalid Username or Password"
		);

	//check if the password is correct
	const isValidPassword = await argon2.verify(
		dbResponse.password,
		data.password
	);
	if (!isValidPassword)
		throw new AppError(
			ERROR_CODES.USER_PASSWORD_INCORRECT,
			"Invalid Username or Password"
		);

	if (dbResponse.actiToken !== null) {
		const token = await generateActivationToken(dbResponse);
		if (!token)
			throw new AppError(
				ERROR_CODES.APP_GENERIC_ERROR,
				"An error occured generating token",
				500
			);
		await sendActivationEmail(token, dbResponse);
		throw new AppError(
			ERROR_CODES.USER_ACCOUNT_NOT_ACTIVE,
			"This account has not been activated. Please check email for activation message and try again"
		);
	}

	//create a jwt token
	const token = JWT.sign(
		{
			id: dbResponse.id,
			name: `${dbResponse.firstname} ${dbResponse.surname}`,
			email: dbResponse.email,
			role: "user",
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: "1h",
		}
	);

	const { id, firstname, middlename, surname, email, createdAt, isVerified } =
		dbResponse;

	//send the jwt token in the response
	res.status(200).json({
		success: true,
		message: "User logged in successfully",
		data: {
			token,
			user: {
				id,
				firstname,
				middlename,
				surname,
				email,
				createdAt,
				role: "customer",
			},
			isVerified:
				isVerified == 0 && dbResponse.kyc.length > 0
					? "pending"
					: isVerified == 1
					? "verified"
					: "not-verified",
		},
	});
};

export const resetPassword = async (
	req: TypedRequest<{}, ResetPasswordType>,
	res: Response
) => {
	//accepts a callback url and email
	const zodResponse = resetPasswordSchema.safeParse(req.body);

	if (zodResponse.error) throw zodResponse.error;

	const { email, callback_url } = zodResponse.data;

	const user = await db.user.findUnique({
		where: {
			email,
		},
	});
	//checks if email is valid
	if (!user)
		throw new AppError(ERROR_CODES.USER_NOT_FOUND, "Invalid email address");

	//request a password reset
	const token = randomUUID();
	await db.user.update({
		where: {
			id: user.id,
		},
		data: {
			resetToken: token,
			tokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), //token is valid for 1 hour
		},
	});

	//generate a random token sent to email
	const mailer = new NodemailerDB(db);
	const resetUrl = `${callback_url}?token=${token}`;

	await mailer.sendMail({
		to: user.email,
		subject: "Password Reset",
		template: "password_reset",
		context: {
			name: `${user.firstname} ${user.surname}`,
			resetUrl,
		},
		from: "B9vY1@example.com",
	});

	res.status(200).json({
		success: true,
		message: "Password reset request was sent to your email",
	});
};

export const confirmPasswordReset = async (
	req: TypedRequest<{}, ConfirmPasswordResetType>,
	res: Response
) => {
	const zodResponse = confirmPasswordResetSchema.safeParse(req.body);
	if (zodResponse.error) throw zodResponse.error;

	//gets the token and verifies if its valid
	const { token, password } = zodResponse.data;
	const user = await db.user.findFirst({
		where: {
			resetToken: token,
		},
	});
	if (!user)
		throw new AppError(
			ERROR_CODES.USER_INVALID_CREDENTIALS,
			"Invalid token"
		);
	if (user.tokenExpiresAt && Date.now() > user.tokenExpiresAt.getTime())
		throw new Error("Token has expired");

	//hash the new password
	const hashedPassword = await argon2.hash(password);

	//update the password in the database
	await db.user.update({
		where: {
			id: user.id,
		},
		data: {
			password: hashedPassword,
			resetToken: null,
			tokenExpiresAt: null,
		},
	});

	const mailer = new NodemailerDB(db);
	const SITEMAIL = process.env.APP_NO_REPLY || "no-reply@appname.com";

	await mailer.sendMail({
		to: user.email,
		subject: "Password Reset",
		template: "password_reset_success",
		context: {
			name: `${user.firstname} ${user.surname}`,
		},
		from: SITEMAIL,
	});

	res.status(200).json({
		success: true,
		message: "Password reset successful",
	});
};

//Activate Account
export const activateAccount = async (req: Request, res: Response) => {
	const { token } = req.body;
	console.log(token);

	if (!token) {
		throw new AppError(
			ERROR_CODES.VALIDATION_INVALID_TOKEN,
			"Token is required"
		);
	}

	// Find the user with the matching activation token
	const user = await db.user.findFirst({
		where: {
			actiToken: token as string,
		},
	});

	if (!user || (user.tokenExpiresAt && user.tokenExpiresAt < new Date())) {
		if (user) {
			await generateActivationToken(user);
		}

		throw new AppError(
			ERROR_CODES.USER_NOT_FOUND,
			"Invalid or expired token"
		);
	}

	// Update the user's account status to active
	await db.user.update({
		where: {
			id: user.id,
		},
		data: {
			actiToken: null, // Clear the token after activation
			tokenExpiresAt: null,
		},
	});

	//send pending activation email
	const mailer = new NodemailerDB(db);
	const SITENAME = process.env.APP_NAME || "APP NAME";
	const SITEMAIL = process.env.APP_NO_REPLY || "no-reply@appname.com";
	await mailer.sendMail({
		to: user.email,
		subject: "Welcome to " + SITENAME,
		template: "welcome_email",
		context: {
			name: user.firstname,
		},
		from: SITEMAIL,
	});

	// Send successful response
	res.json({
		success: true,
		message: "Account activated successfully",
	});
};

export const refreshToken = async (req: Request, res: Response) => {
	// Read the refresh token from the HttpOnly cookie
	const refreshToken = req.cookies["refresh-token"];

	if (!refreshToken) {
		return res.status(403).send({ message: "No refresh token provided" });
	}

	try {
		// Verify the refresh token
		const tokenInfo = JWT.verify(
			refreshToken,
			process.env.JWT_SECRET as string
		) as AccessTokenType;

		// If the token is valid and not expired, issue a new access token
		const newAccessToken = generateNewAccessToken(tokenInfo);
		return res.json({ success: true, data: { token: newAccessToken } });
	} catch (err) {
		// Handle errors, including expired tokens
		if (err instanceof JWT.TokenExpiredError) {
			return res
				.status(403)
				.json({ success: false, message: "Refresh token expired" });
		}

		// Handle any other error (e.g., invalid token signature)
		return res.status(403).json({
			success: false,
			message: "Invalid or expired refresh token",
		});
	}
};

export const adminLogin = async (req: Request, res: Response) => {
	//validate the user input
	const data = req.body;
	const zodResponse = loginSchema.safeParse(data);

	if (zodResponse.error) throw zodResponse.error;

	//get the user data from the database
	const dbResponse = await db.admin.findUnique({
		where: {
			email: data.email,
		},
	});

	if (!dbResponse)
		throw new AppError(
			ERROR_CODES.USER_NOT_FOUND,
			"Invalid Username or Password"
		);

	//check if the password is correct
	const isValidPassword = await argon2.verify(
		dbResponse.password,
		data.password
	);
	if (!isValidPassword)
		throw new AppError(
			ERROR_CODES.USER_PASSWORD_INCORRECT,
			"Invalid Username or Password"
		);

	//create a jwt token
	const token = JWT.sign(
		{
			id: dbResponse.id,
			name: dbResponse.name,
			email: dbResponse.email,
			role: "sxadmin",
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: "1h",
		}
	);

	const { id, name, email } = dbResponse;

	//send the jwt token in the response
	res.status(200).json({
		success: true,
		message: "Login successfully",
		data: {
			token,
			user: {
				id,
				name,
				email,
				role: "sxadmin",
			},
		},
	});
};

function generateNewAccessToken(data: AccessTokenType) {
	return JWT.sign(
		{ ...data },
		process.env.JWT_SECRET as string,
		{ expiresIn: "30d" } // Token expires in 30 days
	);
}
