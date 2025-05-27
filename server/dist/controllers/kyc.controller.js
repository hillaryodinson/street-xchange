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
exports.listKYCRequests = exports.processKYCRequest = exports.addKYC = void 0;
const zod_1 = require("../configs/zod");
const errors_1 = require("../utils/errors");
const db_1 = __importDefault(require("../configs/db"));
const helper_1 = require("../utils/helper");
const addKYC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //get the customer
    const request = req;
    const customer = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!customer)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_AUTHORIZED, "Unauthorized", 401);
    //validate the KYC info
    const zodResponse = zod_1.kycSchema.safeParse(req.body);
    if (zodResponse.error)
        throw zodResponse;
    //check if kyc is already existing for the customer.
    const userKyc = yield db_1.default.kyc.findFirst({
        where: {
            customerId: customer,
        },
    });
    if (userKyc) {
        yield db_1.default.kyc.update({
            where: { id: userKyc.id },
            data: Object.assign(Object.assign({}, zodResponse.data), { isApproved: false, customer: {
                    update: {
                        isVerified: 0,
                    },
                } }),
        });
    }
    else {
        //create KYC request in db
        const kycData = yield db_1.default.kyc.create({
            data: Object.assign(Object.assign({}, zodResponse.data), { customer: {
                    connect: {
                        id: customer,
                    },
                } }),
        });
    }
    //return success message
    res.status(201).json({
        success: true,
        message: "KYC submitted verification is ongoing",
    });
});
exports.addKYC = addKYC;
const processKYCRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get the request id from query
    const request = req;
    const { id, action } = request.query;
    const user = request.user;
    let frontUrl = null;
    let backUrl = undefined;
    if (action !== "approve" && action !== "decline")
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_INVALID_TYPE, "Invalid action type");
    const resolution = {
        isVerified: action == "approve" ? 1 : 2,
        isApproved: action == "approve",
    };
    //check if the user is an admin
    if (!user || user.role !== "sxadmin")
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_AUTHORIZED, "Unauthorized", 403);
    //check if kyc request exists
    const kyc = yield db_1.default.kyc.findFirst({
        where: { id },
    });
    if (!kyc)
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "KYC record does not exist", 400);
    frontUrl = kyc === null || kyc === void 0 ? void 0 : kyc.frontimage;
    backUrl = kyc === null || kyc === void 0 ? void 0 : kyc.backimage;
    if (action == "approve") {
        const BASEURL = process.env.SERVER_URL || "http://localhost:3000";
        const newFrontPath = (0, helper_1.moveImageToLive)(kyc.frontimage, kyc.customerId);
        frontUrl = `${BASEURL}/${newFrontPath}`;
        if (backUrl) {
            const newBackPath = (0, helper_1.moveImageToLive)(backUrl, kyc.customerId);
            backUrl = `${BASEURL}/${newBackPath}`;
        }
    }
    //mark kyc as approved
    yield db_1.default.kyc.update({
        data: {
            isApproved: resolution.isApproved,
            frontimage: frontUrl,
            backimage: backUrl,
        },
        where: {
            id,
        },
    });
    yield db_1.default.user.update({
        where: {
            id: kyc.customerId,
        },
        data: {
            isVerified: resolution.isVerified,
        },
    });
    res.status(200).json({
        success: true,
        message: "User KYC has been " + action + "d",
    });
});
exports.processKYCRequest = processKYCRequest;
const listKYCRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //find out what type of list is being requested all | pending | failed | approved
    const request = req;
    const user = request.user;
    let type = request.query.type;
    let kycs = [];
    //check if the user is administrator
    if (!user || user.role !== "sxadmin") {
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_AUTHORIZED, "Unathorized", 403);
    }
    if (type == "pending") {
        //return the list
        kycs = yield db_1.default.kyc.findMany({
            include: {
                customer: {
                    select: {
                        isVerified: true,
                    },
                },
            },
            where: {
                isApproved: false,
                customer: {
                    isVerified: 0,
                },
            },
        });
    }
    else if (type == "approved") {
        kycs = yield db_1.default.kyc.findMany({
            where: {
                isApproved: true,
            },
        });
    }
    else if (type == "failed") {
        kycs = yield db_1.default.kyc.findMany({
            include: {
                customer: {
                    select: {
                        isVerified: true,
                    },
                },
            },
            where: {
                customer: {
                    isVerified: 2,
                },
            },
        });
    }
    else {
        kycs = yield db_1.default.kyc.findMany();
    }
    res.status(200).json({
        success: true,
        message: "Ok",
        data: kycs,
    });
});
exports.listKYCRequests = listKYCRequests;
