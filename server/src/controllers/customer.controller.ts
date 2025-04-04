import { Request, Response } from "express";
import { newAccountSchema } from "../configs/zod";
import db from "../configs/db";
import { AppError, ERROR_CODES } from "../utils/errors";
import * as argon2 from "argon2";
import { NodemailerDB } from "../services/nodemailer-db";
import { randomUUID } from "crypto";

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
			surname: payload.surname,
			middlename: payload.middlename,
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
