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
exports.fetchSupportedCryptoNetworks = exports.fetchSupportedCrypto = exports.deleteWallet = exports.manageWallet = exports.fetchRandomWalletAddress = exports.fetchWallets = exports.addWallet = void 0;
const errors_1 = require("../utils/errors");
const db_1 = __importDefault(require("../configs/db"));
const zod_1 = require("../configs/zod");
const addWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const user = request.user;
    //check if admin
    if (!user || user.role !== "sxadmin")
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_AUTHORIZED, "Unauthorized", 403);
    //validate address
    const zodResponse = zod_1.WalletSchema.safeParse(req.body);
    if (zodResponse.error)
        throw zodResponse;
    //add wallet to db
    const wallet = yield db_1.default.walletAddress.create({
        data: Object.assign({}, zodResponse.data),
    });
    //return response
    res.json({
        success: true,
        message: "Wallet was created successfully",
    });
});
exports.addWallet = addWallet;
const fetchWallets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get all wallets
    const result = yield db_1.default.walletAddress.findMany();
    res.status(200).json({
        success: true,
        message: "Ok",
        data: result,
    });
});
exports.fetchWallets = fetchWallets;
const fetchRandomWalletAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    if (!request.query.symbol || !request.query.network)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_MISSING_FIELD, "Please specify a crypto and network", 400);
    //get all wallets
    console.log(request.query.network, request.query.symbol);
    const result = yield db_1.default.walletAddress.findMany({
        where: {
            symbol: request.query.symbol,
            network: request.query.network,
            isActive: true,
        },
    });
    if (result.length === 0) {
        res.status(404).json({
            success: false,
            message: "No wallet addresses found",
        });
        return;
    }
    const randomIndex = Math.floor(Math.random() * result.length);
    const randomWallet = result[randomIndex];
    res.status(200).json({
        success: true,
        message: "Ok",
        data: randomWallet,
    });
});
exports.fetchRandomWalletAddress = fetchRandomWalletAddress;
const manageWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate if its admins work
    const request = req;
    const user = request.user;
    const id = request.query.id;
    const action = request.query.action;
    if (!id)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_MISSING_FIELD, "ID is missing", 400);
    if (!action || (action !== "activate" && action !== "deactivate"))
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_INVALID_TYPE, "Please specify an action", 400);
    if (!user || user.role !== "sxadmin")
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNAUTHORIZED, "Unauthorized", 403);
    //get all wallets
    const result = yield db_1.default.walletAddress.update({
        data: {
            isActive: action == "activate",
        },
        where: {
            id,
        },
    });
    res.status(200).json({
        success: true,
        message: `Wallet was ${action}d successfully`,
    });
});
exports.manageWallet = manageWallet;
const deleteWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const user = request.user;
    const id = request.query.id;
    if (!id)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_MISSING_FIELD, "ID is missing", 400);
    if (!user || user.role !== "sxadmin")
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNAUTHORIZED, "Unauthorized", 403);
    //delete wallet
    const result = yield db_1.default.walletAddress.delete({
        where: {
            id,
        },
    });
    if (!result)
        throw new errors_1.AppError(errors_1.ERROR_CODES.DB_RECORD_NOT_FOUND, "Wallet not found", 404);
    res.status(200).json({
        success: true,
        message: "Wallet was deleted successfully",
    });
});
exports.deleteWallet = deleteWallet;
const fetchSupportedCrypto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.walletAddress.findMany({
        select: {
            id: true,
            name: true,
            symbol: true,
        },
        where: {
            isActive: true,
        },
        distinct: ["symbol"],
    });
    if (result.length === 0) {
        res.status(404).json({
            success: false,
            message: "No wallet addresses found",
        });
        return;
    }
    res.status(200).json({
        success: true,
        message: "Ok",
        data: result,
    });
});
exports.fetchSupportedCrypto = fetchSupportedCrypto;
const fetchSupportedCryptoNetworks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    if (!request.query.crypto)
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_MISSING_FIELD, "Please specify a crypto", 400);
    const result = yield db_1.default.walletAddress.findMany({
        select: {
            id: true,
            network: true,
        },
        where: {
            isActive: true,
            symbol: request.query.crypto,
        },
        distinct: ["network"],
    });
    res.status(200).json({
        success: true,
        message: "Ok",
        data: result,
    });
});
exports.fetchSupportedCryptoNetworks = fetchSupportedCryptoNetworks;
