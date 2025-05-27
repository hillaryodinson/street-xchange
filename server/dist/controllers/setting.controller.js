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
exports.fetchSetting = exports.updateSetting = void 0;
const errors_1 = require("../utils/errors");
const db_1 = __importDefault(require("../configs/db"));
const constants_1 = require("../configs/constants");
const updateSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    // Ensure the user is an administrator
    if (!request.user || request.user.role !== "sxadmin") {
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_AUTHORIZED, "You are not authorized to update settings.", 403);
    }
    // Handle specific settings based on the query parameter
    const { setting } = request.query;
    if (!setting) {
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE, "Setting parameter is required.", 400);
    }
    switch (setting) {
        case "rate":
            const amount = req.body
                .amount;
            yield updateRate(amount);
            break;
        default:
            throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE, `Unsupported setting: ${setting}`, 400);
    }
    res.status(200).json({
        success: true,
        message: "Setting was updated successfully",
    });
});
exports.updateSetting = updateSetting;
const fetchSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { setting } = req.query;
    if (!setting) {
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE, "Setting parameter is required.", 400);
    }
    const result = yield db_1.default.setting.findUnique({
        where: { key: setting },
    });
    if (!result) {
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE, `Setting not found: ${setting}`, 404);
    }
    res.status(200).json({
        success: true,
        message: "Setting fetched successfully",
        data: result.value,
    });
});
exports.fetchSetting = fetchSetting;
//Private methods
const updateRate = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (!amount) {
        throw new errors_1.AppError(errors_1.ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE, "Amount is required to update the rate.", 400);
    }
    return yield db_1.default.setting.update({
        where: { key: constants_1.SettingColunns.NGN_RATE },
        data: { value: amount.toString() },
    });
});
