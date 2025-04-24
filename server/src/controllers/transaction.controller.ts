import { Request, Response } from "express";
import {
	CustomResponse,
	TypedRequest,
	TypedRequestBody,
	TypedRequestQuery,
	TypedResponse,
} from "../configs/requests";
import { bookingSchema, CryptoTransactionSchema } from "../configs/zod";
import {
	CryptoTransactionType,
	FlightBookingType,
	TransactionType,
} from "../configs/types";
import db from "../configs/db";
import { AppError, ERROR_CODES } from "../utils/errors";
import {
	generateRandomString,
	generateUniqueRandomStrings,
} from "../utils/helper";
import { NodemailerDB } from "../services/nodemailer-db";
import { TransactionStatus } from "@prisma/client";

export const fetchTransactions = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	const request = req as TypedRequestQuery<{
		transId?: string;
		customerId?: string;
		type?: string;
		status?: string;
	}>;
};

export const bookFlight = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	//get the data from the front end
	const request = req as TypedRequestBody<FlightBookingType>;
	const customerId = request.user ? request.user.id : null;

	if (!customerId) {
		throw new AppError(
			ERROR_CODES.USER_NOT_AUTHORIZED,
			"Invalid user or user not authorized",
			401
		);
	}
	//validate data from frontend
	const zodResponse = bookingSchema.safeParse(request.body);
	if (zodResponse.error) throw zodResponse;

	//add flight details and notify admin of the new flight booking via whatsapp and mail
	const transactionDetails: TransactionType = {
		transId: generateRandomString(7).toUpperCase(),
		transType: "Flight",
		description: `Flight Booking - ${zodResponse.data.from} to ${zodResponse.data.to}`,
		customerId: customerId,
	};

	await db.flightTransaction.create({
		data: {
			...zodResponse.data,
			customerId: customerId,
			transaction: {
				create: { ...transactionDetails, status: "Pending" },
			},
		},
	});

	//TODO: Add whatsapp notifications
	//notify admin that theres a request for a service
	const mailer = new NodemailerDB(db);
	const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@admin.com";
	const SITEMAIL = process.env.APP_NO_REPLY || "admin@admin.com";
	mailer.sendMail({
		to: ADMIN_EMAIL,
		from: SITEMAIL,
		subject: "Service Request - (Flight Booking)",
		template: "notif_service_request",
		context: {
			service: transactionDetails.transType,
			description: transactionDetails.description,
			transId: transactionDetails.transId,
			transUrl: "#",
		},
	});

	//return flight object
	res.json({
		success: true,
		message:
			"Flight request has been sent. We will get back to you on the cost",
		data: {
			bookingRef: transactionDetails.transId,
		},
	});
};

// export const reviewFlight = async (req: Request, res: Response) => {
// 	//get the data from the front end
// 	const request = req as TypedRequest<{ id: string }, FlightBookingType>;
// 	const flightId = request.params.id;

// 	//find the flight details
// 	const flight = await db.flightTransaction.findFirst({
// 		where: {
// 			id: flightId,
// 		},
// 	});
// 	if (!flight)
// 		throw new AppError(
// 			ERROR_CODES.DB_RECORD_NOT_FOUND,
// 			"Invalid flight or flight details does not exist"
// 		);
// 	//validate data from frontend
// 	const zodResponse = bookingSchema.safeParse(request.body);
// 	if (zodResponse.error) throw zodResponse;

// 	//add flight details and notify admin of the new flight booking via whatsapp and mail
// 	db.flightTransaction.create({
// 		data: {
// 			...zodResponse.data,
// 		},
// 	});

// 	//TODO: Add whatsapp notifications
// 	//return flight object
// 	return res.json({
// 		success: true,
// 		message:
// 			"Flight request has been sent. We will get back to you on the cost",
// 	});
// };

export const createCryptoSellOrder = async (req: Request, res: Response) => {
	const request = req as TypedRequestBody<CryptoTransactionType>;
	const customer = request.user;
	const body = request.body;

	if (!customer)
		throw new AppError(
			ERROR_CODES.VALIDATION_UNAUTHENTICATED,
			"User not authenticated",
			401
		);

	const zodResponse = CryptoTransactionSchema.safeParse(body);
	if (zodResponse.error) throw zodResponse;

	const transactionDetails: TransactionType = {
		transId: generateRandomString(7).toUpperCase(),
		transType: "Crypto Sell",
		description: `Crypto Exchange - ${zodResponse.data.cryptoTypeSent} to ${zodResponse.data.fiatCurrency}`,
		customerId: customer.id,
	};

	const ct = await db.cryptoTransaction.create({
		data: {
			...zodResponse.data,
			customerId: customer.id,
			Transaction: {
				create: { ...transactionDetails, status: "Pending" },
			},
		},
	});

	res.status(200).json({
		success: true,
		message: "Crypto transaction was created successfully",
		data: {
			...ct,
			...transactionDetails,
		},
	});
};

export const confirmCryptoOrder = async (req: Request, res: Response) => {
	const request = req as TypedRequestBody<{ transId: string }>;
	const customer = request.user;
	const body = request.body;

	if (!customer)
		throw new AppError(
			ERROR_CODES.VALIDATION_UNAUTHENTICATED,
			"User not authenticated",
			401
		);

	const transaction = await db.transaction.findFirst({
		where: {
			transId: body.transId,
		},
		include: {
			cryptoTrans: true,
		},
	});

	if (!transaction || transaction.cryptoTrans?.customerId !== customer.id)
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"Invalid transaction or transaction does not exist"
		);

	if (transaction.status === "Completed")
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"Transaction already completed"
		);

	if (transaction.cryptoTrans?.status === "PaymentExpired")
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"Transaction already expired"
		);

	//update transaction status to completed
	await db.cryptoTransaction.update({
		where: {
			id: transaction.cryptoTrans?.id,
		},
		data: {
			status: "PaymentDone",
		},
	});

	//notify administrator of pending transaction...

	const mailer = new NodemailerDB(db);
	const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@admin.com";
	const SITEMAIL = process.env.APP_NO_REPLY || "no-reply@sitename.com";
	const APP_URL = process.env.APP_URL || "https://sitename.com";
	const TransactionLink = `${APP_URL}/sxadmin/transactions/${transaction.transId}`;
	mailer.sendMail({
		to: ADMIN_EMAIL,
		from: SITEMAIL,
		subject: "Service Request - (Crypto Exchange)",
		template: "notif_service_request",
		context: {
			service: transaction.transType,
			description: transaction.description,
			transId: transaction.transId,
			amount: `${transaction.cryptoTrans.cryptoAmountSent} ${transaction.cryptoTrans.cryptoTypeSent}`,
			amountReceived: `${transaction.cryptoTrans.fiatCurrency}${transaction.cryptoTrans.fiatAmountReceived}`,
			transUrl: TransactionLink,
		},
	});

	res.status(200).json({
		success: true,
		message: "Crypto transaction was updated successfully",
	});
};

//TODO: View Crypto Transactions
//TOD0: View Single Crypto Transaction
//TODO: Mark Crypto Transaction as Done
//TODO: Delete Crypto Transaction
//TODO: View Flights Transactions
//TODO: View Single Flight Transaction
//TODO: Delete Flights Transaction
//TODO: Mark Flight Transaction as Done
//TODO: Add GiftCard Transaction
//TODO: View GiftCard Transactions
//TODO: View Single GiftCard Transaction
//TODO: Delete GiftCard Transaction
//TODO: Mark GiftCard Transaction as Done
