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
exports.upload = exports.limiter = exports.tryCatch = exports.errorHandler = exports.authorizeAccess = exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const errors_1 = require("../utils/errors");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const authorize = (req, res, next) => {
    var _a;
    //get the token from header
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return next(new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_INVALID_TOKEN, "Unauthorized", 401));
    try {
        const tokenInfo = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = tokenInfo;
    }
    catch (error) {
        return next(new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_INVALID_TOKEN, "Unauthorized", 401));
    }
    next();
};
exports.authorize = authorize;
const authorizeAccess = (req, res, next) => {
    //get the list of routes and the places they can access
};
exports.authorizeAccess = authorizeAccess;
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            message: `V${100}: Validation Errors`,
            errors: err.errors.map((e) => ({
                fields: e.path.join(", "),
                message: e.message,
            })),
        });
    }
    else if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: `E${err.errorCode}`,
        });
    }
    else {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Oops an error occured. Please contact administrator",
            code: "EE00",
        });
    }
};
exports.errorHandler = errorHandler;
const tryCatch = (fn) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.tryCatch = tryCatch;
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP/user to 100 requests per windowMs
    handler: function (req, res, next) {
        res.status(429).json({
            message: "Too many requests, please try again later.",
        });
    },
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/original/");
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const filename = Date.now() + ext;
        cb(null, filename);
    },
});
exports.upload = (0, multer_1.default)({ storage });
