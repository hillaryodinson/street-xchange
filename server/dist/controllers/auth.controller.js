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
exports.adminLogin = exports.refreshToken = exports.activateAccount = exports.confirmPasswordReset = exports.resetPassword = exports.login = void 0;
const zod_1 = require("../configs/zod");
const db_1 = __importDefault(require("../configs/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const crypto_1 = require("crypto");
const nodemailer_db_1 = require("../services/nodemailer-db");
const dotenv_1 = __importDefault(require("dotenv"));
const errors_1 = require("../utils/errors");
const helper_1 = require("../utils/helper");
const token_gen_1 = require("../services/token-gen");
dotenv_1.default.config();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the user input
    const data = req.body;
    const zodResponse = zod_1.loginSchema.safeParse(data);
    if (zodResponse.error)
        throw zodResponse.error;
    //get the user data from the database
    const dbResponse = yield db_1.default.user.findUnique({
        where: {
            email: data.email,
        },
        include: {
            kyc: true,
        },
    });
    if (!dbResponse)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_FOUND, "Invalid Username or Password");
    //check if the password is correct
    const isValidPassword = yield argon2_1.default.verify(dbResponse.password, data.password);
    if (!isValidPassword)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_PASSWORD_INCORRECT, "Invalid Username or Password");
    if (dbResponse.actiToken !== null) {
        const token = yield (0, token_gen_1.generateActivationToken)(dbResponse);
        if (!token)
            throw new errors_1.AppError(errors_1.ERROR_CODES.APP_GENERIC_ERROR, "An error occured generating token", 500);
        yield (0, helper_1.sendActivationEmail)(token, dbResponse);
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_ACCOUNT_NOT_ACTIVE, "This account has not been activated. Please check email for activation message and try again");
    }
    //create a jwt token
    const token = jsonwebtoken_1.default.sign({
        id: dbResponse.id,
        name: `${dbResponse.firstname} ${dbResponse.surname}`,
        email: dbResponse.email,
        role: "user",
    }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    const { id, firstname, middlename, surname, email, createdAt, isVerified } = dbResponse;
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
            isVerified: isVerified == 0 && dbResponse.kyc.length > 0
                ? "pending"
                : isVerified == 1
                    ? "verified"
                    : "not-verified",
        },
    });
});
exports.login = login;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //accepts a callback url and email
    const zodResponse = zod_1.resetPasswordSchema.safeParse(req.body);
    if (zodResponse.error)
        throw zodResponse.error;
    const { email, callback_url } = zodResponse.data;
    const user = yield db_1.default.user.findUnique({
        where: {
            email,
        },
    });
    //checks if email is valid
    if (!user)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_FOUND, "Invalid email address");
    //request a password reset
    const token = (0, crypto_1.randomUUID)();
    yield db_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            resetToken: token,
            tokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), //token is valid for 1 hour
        },
    });
    //generate a random token sent to email
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
    const resetUrl = `${callback_url}?token=${token}`;
    yield mailer.sendMail({
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
});
exports.resetPassword = resetPassword;
const confirmPasswordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zodResponse = zod_1.confirmPasswordResetSchema.safeParse(req.body);
    if (zodResponse.error)
        throw zodResponse.error;
    //gets the token and verifies if its valid
    const { token, password } = zodResponse.data;
    const user = yield db_1.default.user.findFirst({
        where: {
            resetToken: token,
        },
    });
    if (!user)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_INVALID_CREDENTIALS, "Invalid token");
    if (user.tokenExpiresAt && Date.now() > user.tokenExpiresAt.getTime())
        throw new Error("Token has expired");
    //hash the new password
    const hashedPassword = yield argon2_1.default.hash(password);
    //update the password in the database
    yield db_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
            resetToken: null,
            tokenExpiresAt: null,
        },
    });
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
    const SITEMAIL = process.env.APP_NO_REPLY || "no-reply@appname.com";
    yield mailer.sendMail({
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
});
exports.confirmPasswordReset = confirmPasswordReset;
//Activate Account
const activateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    console.log(token);
    if (!token) {
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_INVALID_TOKEN, "Token is required");
    }
    // Find the user with the matching activation token
    const user = yield db_1.default.user.findFirst({
        where: {
            actiToken: token,
        },
    });
    if (!user || (user.tokenExpiresAt && user.tokenExpiresAt < new Date())) {
        if (user) {
            yield (0, token_gen_1.generateActivationToken)(user);
        }
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_FOUND, "Invalid or expired token");
    }
    // Update the user's account status to active
    yield db_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            actiToken: null, // Clear the token after activation
            tokenExpiresAt: null,
        },
    });
    //send pending activation email
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
    const SITENAME = process.env.APP_NAME || "APP NAME";
    const SITEMAIL = process.env.APP_NO_REPLY || "no-reply@appname.com";
    yield mailer.sendMail({
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
});
exports.activateAccount = activateAccount;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Read the refresh token from the HttpOnly cookie
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) {
        return res.status(403).send({ message: "No refresh token provided" });
    }
    try {
        // Verify the refresh token
        const tokenInfo = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
        // If the token is valid and not expired, issue a new access token
        const newAccessToken = generateNewAccessToken(tokenInfo);
        return res.json({ success: true, data: { token: newAccessToken } });
    }
    catch (err) {
        // Handle errors, including expired tokens
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
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
});
exports.refreshToken = refreshToken;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the user input
    const data = req.body;
    const zodResponse = zod_1.loginSchema.safeParse(data);
    if (zodResponse.error)
        throw zodResponse.error;
    //get the user data from the database
    const dbResponse = yield db_1.default.admin.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!dbResponse)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_FOUND, "Invalid Username or Password");
    //check if the password is correct
    const isValidPassword = yield argon2_1.default.verify(dbResponse.password, data.password);
    if (!isValidPassword)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_PASSWORD_INCORRECT, "Invalid Username or Password");
    //create a jwt token
    const token = jsonwebtoken_1.default.sign({
        id: dbResponse.id,
        name: dbResponse.name,
        email: dbResponse.email,
        role: "sxadmin",
    }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
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
});
exports.adminLogin = adminLogin;
function generateNewAccessToken(data) {
    return jsonwebtoken_1.default.sign(Object.assign({}, data), process.env.JWT_SECRET, { expiresIn: "30d" } // Token expires in 30 days
    );
}
