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
exports.generateActivationToken = void 0;
const crypto_1 = require("crypto");
const db_1 = __importDefault(require("../configs/db"));
const helper_1 = require("../utils/helper");
const generateActivationToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actiToken = (0, crypto_1.randomUUID)();
        yield db_1.default.user.update({
            data: {
                actiToken,
                tokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
            },
            where: {
                id: user.id,
            },
        });
        yield (0, helper_1.sendActivationEmail)(actiToken, user);
        return actiToken;
    }
    catch (error) {
        console.log("GenerateActivationToken Error: ", error);
        return false;
    }
});
exports.generateActivationToken = generateActivationToken;
