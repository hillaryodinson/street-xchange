"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.changePassword = exports.register = void 0;
const zod_1 = require("../configs/zod");
const db_1 = __importDefault(require("../configs/db"));
const errors_1 = require("../utils/errors");
const argon2 = __importStar(require("argon2"));
const nodemailer_db_1 = require("../services/nodemailer-db");
const crypto_1 = require("crypto");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the user payload
    const zodResponse = zod_1.newAccountSchema.safeParse(req.body);
    if (zodResponse.error)
        throw zodResponse;
    //verify if the account already exist with similar email
    const account = yield db_1.default.user.findUnique({
        where: {
            email: zodResponse.data.email,
        },
    });
    if (account)
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_DUPLICATE_RECORD, "Account already exists");
    //hash password
    const hashedPassword = yield argon2.hash(zodResponse.data.password);
    //store new user
    const payload = zodResponse.data;
    const activationToken = (0, crypto_1.randomUUID)();
    const customer = yield db_1.default.user.create({
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
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
    const CLIENT_URL = process.env.CLIENT_URL || "localhost:3001";
    const activationUrl = `${CLIENT_URL}activate?token=${activationToken}`;
    const SITEMAIL = process.env.APP_NO_REPLY || "no-reply@appname.com";
    yield mailer.sendMail({
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
});
exports.register = register;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the user
    const request = req;
    const user = request.user;
    const password = request.body.password;
    const oldpassword = request.body.password;
    //check if the user exists
    if (!password)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_MISSING_FIELD, "Password field can not be empty", 400);
    if (!user)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNAUTHENTICATED, "Unathenticated", 401);
    //validate user
    const validatedUser = yield db_1.default.user.findFirst({
        where: {
            id: user.id,
        },
    });
    if (!validatedUser)
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "User not exist", 400);
    const isPasswordMatch = argon2.verify(validatedUser === null || validatedUser === void 0 ? void 0 : validatedUser.password, oldpassword);
    if (!isPasswordMatch)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_INVALID_TYPE, "Incorrect password please input your original password and your new password", 400);
    //update the password
    const hashedPassword = yield argon2.hash(password);
    yield db_1.default.user.update({
        data: { password: hashedPassword },
        where: { id: user.id },
    });
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
    const SITEMAIL = process.env.APP_NO_REPLY || "noreply@appname.com";
    yield mailer.sendMail({
        to: validatedUser.email,
        from: SITEMAIL,
        subject: "Password change successful",
        template: "password_change_notification",
        context: {
            name: `${validatedUser.firstname} ${validatedUser.surname}`,
        },
    });
    res.status(200).json({
        success: true,
        message: "Password changed successfully",
    });
});
exports.changePassword = changePassword;
