import { Request, Response } from "express";
import { newAccountSchema } from "../configs/zod";
import db from "../configs/db";
import { AppError, ERROR_CODES } from "../utils/errors";
import * as argon2 from "argon2";
import { NodemailerDB } from "../services/nodemailer-db";
import { randomUUID } from "crypto";
import { TypedRequestBody } from "../configs/requests";
import { equal } from "assert";

export const register = async (req: Request, res: Response) => {
	//validate the user payload
	const zodResponse = newAccountSchema.safeParse(req.body);
	if (zodResponse.error) throw zodResponse;

	//verify if the account already exist with similar email
	const account = await db.user.findUnique({
		where: {
			email: zodResponse.data.email,
		},
	});
	if (account)
		throw new AppError(
			ERROR_CODES.DB_DUPLICATE_RECORD,
			"Account already exists"
		);

	//hash password
	const hashedPassword = await argon2.hash(zodResponse.data.password);

	//store new user
	const payload = zodResponse.data;
	const activationToken = randomUUID();
	const customer = await db.user.create({
		data: {
			firstname: payload.firstname,
			lastname: payload.lastname,
			email: payload.email,
			password: hashedPassword,
			residentialAddress: payload.address,
			phoneNo: payload.phoneNumber,
			dob: new Date(payload.dateOfBirth),
			actiToken: activationToken,
		},
	});
	//send pending activation email
	const mailer = new NodemailerDB(db);
	const CLIENT_URL = process.env.CLIENT_URL || "localhost:3001";
	const activationUrl = `${CLIENT_URL}activate?token=${activationToken}`;
	const SITEMAIL = process.env.APP_NO_REPLY || "no-reply@appname.com";
	await mailer.sendMail({
		to: customer.email,
		subject: "Activate Account",
		template: "activate_account",
		context: {
			name: customer.firstname,
			activationURL: activationUrl,
		},
		from: SITEMAIL,
	});

	console.log(activationUrl);

	//send successful response
	res.json({
		success: true,
		message: "Registration successful",
	});
};

export const changePassword = async (req: Request, res: Response) => {
	//validate the user
	const request = req as TypedRequestBody<{
		password: string;
		oldpassword: string;
	}>;
	const user = request.user;
	const password = request.body.password;
	const oldpassword = request.body.password;

	//check if the user exists
	if (!password)
		throw new AppError(
			ERROR_CODES.VALIDATION_MISSING_FIELD,
			"Password field can not be empty",
			400
		);

	if (!user)
		throw new AppError(
			ERROR_CODES.VALIDATION_UNAUTHENTICATED,
			"Unathenticated",
			401
		);
	//validate user
	const validatedUser = await db.user.findFirst({
		where: {
			id: user.id,
		},
	});

	if (!validatedUser)
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"User not exist",
			400
		);
	const isPasswordMatch = argon2.verify(validatedUser?.password, oldpassword);
	if (!isPasswordMatch)
		throw new AppError(
			ERROR_CODES.VALIDATION_INVALID_TYPE,
			"Incorrect password please input your original password and your new password",
			400
		);

	//update the password
	const hashedPassword = await argon2.hash(password);
	await db.user.update({
		data: { password: hashedPassword },
		where: { id: user.id },
	});

	const mailer = new NodemailerDB(db);
	const SITEMAIL = process.env.APP_NO_REPLY || "noreply@appname.com";
	await mailer.sendMail({
		to: validatedUser.email,
		from: SITEMAIL,
		subject: "Password change successful",
		template: "password_change_notification",
		context: {
			name: `${validatedUser.firstname} ${validatedUser.lastname}`,
		},
	});

	res.status(200).json({
		success: true,
		message: "Password changed successfully",
	});
};

export const updateProfile = async (req: Request, res: Response) => {
	//validate the user
	const request = req as TypedRequestBody<{
		firstname: string;
		lastname: string;
		address: string;
		phoneNumber: string;
		dateOfBirth?: string;
		country?: string;
		state?: string;
	}>;
	const user = request.user;

	if (!user)
		throw new AppError(
			ERROR_CODES.VALIDATION_UNAUTHENTICATED,
			"Unathenticated",
			401
		);

	const {
		firstname,
		lastname,
		address,
		phoneNumber,
		dateOfBirth,
		country,
		state,
	} = request.body;

	const existingUser = await db.user.findFirst({
		where: {
			id: user.id,
		},
	});

	if (!existingUser)
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"User not found",
			404
		);

	await db.user.update({
		where: { id: user.id },
		data: {
			firstname: firstname || existingUser.firstname,
			lastname: lastname || existingUser.lastname,
			phoneNo: phoneNumber || existingUser.phoneNo,
			dob: dateOfBirth || existingUser.dob,
			residentialAddress:
				`${address}, ${state}, ${country}` ||
				existingUser.residentialAddress,
		},
	});

	res.status(200).json({
		success: true,
		message: "Profile updated successfully",
	});
};

export const accountOverview = async (req: Request, res: Response) => {
	//validate the user
	const request = req as TypedRequestBody<{
		id: string;
	}>;
	const user = request.user;

	if (!user)
		throw new AppError(
			ERROR_CODES.VALIDATION_UNAUTHENTICATED,
			"Unathenticated",
			401
		);

	const account = await db.user.findFirst({
		where: {
			id: user.id,
		},
		select: {
			id: true,
			firstname: true,
			lastname: true,
			email: true,
			residentialAddress: true,
			dob: true,
			phoneNo: true,
			Wallet: {
				select: {
					balance: true,
				},
			},
			Transaction: {
				where: {
					status: "Pending",
				},
				select: {
					status: true,
				},
			},
		},
	});

	if (!account)
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"User not found",
			404
		);

	res.status(200).json({
		success: true,
		data: account,
	});
};
