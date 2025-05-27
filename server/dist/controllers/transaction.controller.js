"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGiftCardTransaction = exports.confirmCryptoOrder = exports.createCryptoSellOrder = exports.bookFlight = exports.getTransactionByTransId = void 0;
const zod_1 = require("../configs/zod");
const db_1 = __importDefault(require("../configs/db"));
const errors_1 = require("../utils/errors");
const helper_1 = require("../utils/helper");
const nodemailer_db_1 = require("../services/nodemailer-db");
const getTransactionByTransId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const user = request.user;
    const transId = req.params.transId;
    //if the current user is not an administrator or the transaction does not belong to the user throw an error
    if (!user) {
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNAUTHENTICATED, "User not authenticated", 401);
    }
    const transaction = yield db_1.default.transaction.findFirst({
        where: {
            transId: transId,
        },
        include: {
            flightTrans: true,
            cryptoTrans: true,
            giftcardTrans: true,
        },
    });
    if (user.id != (transaction === null || transaction === void 0 ? void 0 : transaction.customerId) && user.role !== "Admin") {
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNAUTHENTICATED, "User not authorized to view this transaction", 401);
    }
    if (!transaction)
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "Invalid transaction or transaction does not exist");
    if (transaction.status === "Completed")
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "Transaction already completed");
    if (transaction.status === "Failed")
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "Transaction already expired");
    res.status(200).json({
        success: true,
        message: "Transaction was retrieved successfully",
        data: Object.assign({}, transaction),
    });
});
exports.getTransactionByTransId = getTransactionByTransId;
const bookFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get the data from the front end
    const request = req;
    const customerId = request.user ? request.user.id : null;
    if (!customerId) {
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_AUTHORIZED, "Invalid user or user not authorized", 401);
    }
    //validate data from frontend
    const zodResponse = zod_1.bookingSchema.safeParse(request.body);
    if (zodResponse.error)
        throw zodResponse;
    //add flight details and notify admin of the new flight booking via whatsapp and mail
    const transactionDetails = {
        transId: (0, helper_1.generateRandomString)(7).toUpperCase(),
        transType: "Flight",
        description: `Flight Booking - ${zodResponse.data.from} to ${zodResponse.data.to}`,
        customerId: customerId,
    };
    yield db_1.default.flightTransaction.create({
        data: Object.assign(Object.assign({}, zodResponse.data), { customerId: customerId, transaction: {
                create: Object.assign(Object.assign({}, transactionDetails), { status: "Pending" }),
            } }),
    });
    //TODO: Add whatsapp notifications
    //notify admin that theres a request for a service
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
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
        message: "Flight request has been sent. We will get back to you on the cost",
        data: {
            bookingRef: transactionDetails.transId,
        },
    });
});
exports.bookFlight = bookFlight;
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
const createCryptoSellOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const customer = request.user;
    const body = request.body;
    if (!customer)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNAUTHENTICATED, "User not authenticated", 401);
    const zodResponse = zod_1.CryptoTransactionSchema.safeParse(body);
    if (zodResponse.error)
        throw zodResponse;
    const transactionDetails = {
        transId: (0, helper_1.generateRandomString)(7).toUpperCase(),
        transType: "Crypto Sell",
        description: `Crypto Exchange - ${zodResponse.data.cryptoTypeSent} to ${zodResponse.data.fiatCurrency}`,
        customerId: customer.id,
    };
    const ct = yield db_1.default.cryptoTransaction.create({
        data: Object.assign(Object.assign({}, zodResponse.data), { customerId: customer.id, Transaction: {
                create: Object.assign(Object.assign({}, transactionDetails), { status: "Pending" }),
            } }),
    });
    res.status(200).json({
        success: true,
        message: "Crypto transaction was created successfully",
        data: Object.assign(Object.assign({}, ct), transactionDetails),
    });
});
exports.createCryptoSellOrder = createCryptoSellOrder;
const confirmCryptoOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const request = req;
    const customer = request.user;
    const body = request.body;
    console.error(req.params, req.query, req.body);
    if (!customer)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNAUTHENTICATED, "User not authenticated", 401);
    if (!request.query.transId)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_INVALID_TOKEN, "Transaction ID not provided", 400);
    const transaction = yield db_1.default.transaction.findFirst({
        where: {
            transId: request.query.transId,
        },
        include: {
            cryptoTrans: true,
        },
    });
    if (!transaction || ((_a = transaction.cryptoTrans) === null || _a === void 0 ? void 0 : _a.customerId) !== customer.id)
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "Invalid transaction or transaction does not exist");
    if (transaction.status === "Completed")
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "Transaction already completed");
    if (((_b = transaction.cryptoTrans) === null || _b === void 0 ? void 0 : _b.status) === "PaymentExpired")
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "Transaction already expired");
    //update transaction status to completed
    yield db_1.default.cryptoTransaction.update({
        where: {
            id: (_c = transaction.cryptoTrans) === null || _c === void 0 ? void 0 : _c.id,
        },
        data: {
            status: "PaymentDone",
        },
    });
    //notify administrator of pending transaction...
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
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
        message: "Payment done and undergoing review.",
    });
});
exports.confirmCryptoOrder = confirmCryptoOrder;
//TODO: Add GiftCard Transaction
const createGiftCardTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const customer = request.user;
    const body = request.body;
    if (!customer)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNAUTHENTICATED, "User not authenticated", 401);
    const zodResponse = zod_1.GiftCardTransactionSchema.safeParse(body);
    if (zodResponse.error)
        throw zodResponse;
    const transactionDetails = {
        transId: (0, helper_1.generateRandomString)(7).toUpperCase(),
        transType: "GiftCard",
        description: `GiftCard - ${zodResponse.data.cardType} (${zodResponse.data.country})`,
        customerId: customer.id,
    };
    const ct = yield db_1.default.giftCardTransaction.create({
        data: Object.assign(Object.assign({}, zodResponse.data), { customerId: customer.id, Transaction: {
                create: Object.assign(Object.assign({}, transactionDetails), { status: "Pending" }),
            } }),
    });
    //notify administrator of pending transaction...
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost.com";
    const SITEMAIL = process.env.APP_NO_REPLY || "noreply@sitename.com";
    const APP_URL = process.env.APP_URL || "https://localhost:3000";
    const TransactionLink = `${APP_URL}/sxadmin/transactions/${transactionDetails.transId}`;
    mailer.sendMail({
        to: ADMIN_EMAIL,
        from: SITEMAIL,
        subject: "Service Request - (GiftCard Exchange)",
        template: "notif_service_request",
        context: {
            service: transactionDetails.transType,
            description: transactionDetails.description,
            transId: transactionDetails.transId,
            amount: `${zodResponse.data.amount} ${zodResponse.data.cardType}`,
            amountReceived: `${zodResponse.data.country}${zodResponse.data.amount}`,
            transUrl: TransactionLink,
        },
    });
    res.status(200).json({
        success: true,
        message: "GiftCard transaction was created successfully",
        data: Object.assign(Object.assign({}, ct), transactionDetails),
    });
});
exports.createGiftCardTransaction = createGiftCardTransaction;
//TODO: View GiftCard Transactions
//TODO: View Crypto Transactions
//TOD0: View Single Crypto Transaction
//TODO: Mark Crypto Transaction as Done
//TODO: Delete Crypto Transaction
//TODO: View Flights Transactions
//TODO: View Single Flight Transaction
//TODO: Delete Flights Transaction
//TODO: Mark Flight Transaction as Done
//TODO: View Single GiftCard Transaction
//TODO: Delete GiftCard Transaction
//TODO: Mark GiftCard Transaction as Done
