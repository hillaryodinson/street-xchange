import { z } from "zod";
import { TypedRequestBody, TypedRequestQuery } from "../configs/requests";
import { generateRandomNumbers } from "../utils/helper";
import db from "../configs/db";
import { AppError, ERROR_CODES } from "../utils/errors";
import { NodemailerDB } from "../services/nodemailer-db";
import { Request, Response } from "express";
import { bankSchema } from "../configs/zod";

export const addBankAccount = async (req: Request, res: Response) => {
	const request = req as TypedRequestBody<z.infer<typeof bankSchema>>;
	const payload = request.body;
	const customer = request.user;

	if (!customer)
		throw new AppError(
			ERROR_CODES.USER_SESSION_EXPIRED,
			"Invalid customer",
			401
		);

	const zodResponse = bankSchema.safeParse(payload);
	if (zodResponse.error) throw zodResponse;

	const otp = generateRandomNumbers(6);
	const bank = await db.customerBank.create({
		data: {
			...zodResponse.data,
			otp,
			deletedAt: new Date(),
			customer: {
				connect: {
					id: customer.id,
				},
			},
		},
	});

	const mailer = new NodemailerDB(db);
	const CLIENT_URL = process.env.CLIENT_URL || "localhost:3001";
	const SITEMAIL = process.env.APP_NO_REPLY || "no-reply@appname.com";
	await mailer.sendOrQueue({
		to: customer.email,
		subject: "Verify Bank Account",
		template: "verify_bank_account",
		context: {
			name: customer.name,
			otp: otp,
		},
		from: SITEMAIL,
	});

	res.json({
		success: true,
		message:
			"Please confirm bank account action. Check your email for more details",
	});
};

export const confirmAddBankAccount = async (req: Request, res: Response) => {
	const request = req as TypedRequestBody<{ otp: string }>;
	const customer = request.user;
	const otp = request.body.otp;

	if (!customer)
		throw new AppError(
			ERROR_CODES.USER_SESSION_EXPIRED,
			"Unauthorized",
			401
		);

	if (!otp)
		throw new AppError(
			ERROR_CODES.VALIDATION_MISSING_FIELD,
			"Bad request, OTP not set",
			400
		);

	const customerBankData = await db.customerBank.findFirst({
		where: {
			otp,
			customerId: customer.id,
		},
	});

	if (!customerBankData)
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"Invalid OTP or OTP has expired",
			400
		);

	await db.customerBank.update({
		where: {
			id: customerBankData.id,
		},
		data: {
			otp: null,
			deletedAt: null,
		},
	});

	res.json({
		success: true,
		message: "Bank Account was created successfully",
	});
};

export const deleteBankAccount = async (req: Request, res: Response) => {
	const request = req as TypedRequestQuery<{ id: string }>;
	const customer = request.user;
	const accountId = request.query.id;

	if (!customer)
		throw new AppError(
			ERROR_CODES.USER_SESSION_EXPIRED,
			"Unauthorized",
			401
		);

	if (!accountId)
		throw new AppError(
			ERROR_CODES.VALIDATION_MISSING_FIELD,
			"Bad request, accountId not set",
			400
		);

	const customerBankData = await db.customerBank.findFirst({
		where: {
			id: accountId,
			customerId: customer.id,
		},
	});

	if (!customerBankData)
		throw new AppError(
			ERROR_CODES.USER_NOT_AUTHORIZED,
			"Invalid account or you do not have access to delete this account",
			400
		);

	await db.customerBank.delete({
		where: {
			id: customerBankData.id,
		},
	});

	res.json({
		success: true,
		message: "Bank Account was deleted successfully",
	});
};

export const getCustomerBankAccounts = async (req: Request, res: Response) => {
	const request = req as TypedRequestQuery<{}>;
	const customer = request.user;

	if (!customer)
		throw new AppError(
			ERROR_CODES.USER_SESSION_EXPIRED,
			"Unauthorized",
			401
		);

	const customerBankList = await db.customerBank.findMany({
		select: {
			id: true,
			bankName: true,
			accountName: true,
			accountNo: true,
		},
		where: {
			customerId: customer.id,
		},
	});

	res.json({
		success: true,
		message: "Ok",
		data: customerBankList,
	});
};
