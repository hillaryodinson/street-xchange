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
exports.getCustomerBankAccounts = exports.deleteBankAccount = exports.confirmAddBankAccount = exports.addBankAccount = void 0;
const helper_1 = require("../utils/helper");
const db_1 = __importDefault(require("../configs/db"));
const errors_1 = require("../utils/errors");
const nodemailer_db_1 = require("../services/nodemailer-db");
const zod_1 = require("../configs/zod");
const addBankAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const payload = request.body;
    const customer = request.user;
    if (!customer)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_SESSION_EXPIRED, "Invalid customer", 401);
    const zodResponse = zod_1.bankSchema.safeParse(payload);
    if (zodResponse.error)
        throw zodResponse;
    const otp = (0, helper_1.generateRandomNumbers)(6);
    const bank = yield db_1.default.customerBank.create({
        data: Object.assign(Object.assign({}, zodResponse.data), { otp, deletedAt: new Date(), customer: {
                connect: {
                    id: customer.id,
                },
            } }),
    });
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
    const CLIENT_URL = process.env.CLIENT_URL || "localhost:3001";
    const SITEMAIL = process.env.APP_NO_REPLY || "no-reply@appname.com";
    yield mailer.sendMail({
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
        message: "Please confirm bank account action. Check your email for more details",
    });
});
exports.addBankAccount = addBankAccount;
const confirmAddBankAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const customer = request.user;
    const otp = request.body.otp;
    if (!customer)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_SESSION_EXPIRED, "Unauthorized", 401);
    if (!otp)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_MISSING_FIELD, "Bad request, OTP not set", 400);
    const customerBankData = yield db_1.default.customerBank.findFirst({
        where: {
            otp,
            customerId: customer.id,
        },
    });
    if (!customerBankData)
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "Invalid OTP or OTP has expired", 400);
    yield db_1.default.customerBank.update({
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
});
exports.confirmAddBankAccount = confirmAddBankAccount;
const deleteBankAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const customer = request.user;
    const accountId = request.query.id;
    if (!customer)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_SESSION_EXPIRED, "Unauthorized", 401);
    if (!accountId)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_MISSING_FIELD, "Bad request, accountId not set", 400);
    const customerBankData = yield db_1.default.customerBank.findFirst({
        where: {
            id: accountId,
            customerId: customer.id,
        },
    });
    if (!customerBankData)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_AUTHORIZED, "Invalid account or you do not have access to delete this account", 400);
    yield db_1.default.customerBank.delete({
        where: {
            id: customerBankData.id,
        },
    });
    res.json({
        success: true,
        message: "Bank Account was deleted successfully",
    });
});
exports.deleteBankAccount = deleteBankAccount;
const getCustomerBankAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const customer = request.user;
    if (!customer)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_SESSION_EXPIRED, "Unauthorized", 401);
    const customerBankList = yield db_1.default.customerBank.findMany({
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
});
exports.getCustomerBankAccounts = getCustomerBankAccounts;
