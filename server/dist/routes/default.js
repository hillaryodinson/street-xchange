"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const customer_route_1 = __importDefault(require("./customer.route"));
const transaction_route_1 = __importDefault(require("./transaction.route"));
const bank_route_1 = __importDefault(require("./bank.route"));
const file_route_1 = __importDefault(require("./file.route"));
const kyc_route_1 = __importDefault(require("./kyc.route"));
const wallet_route_1 = __importDefault(require("./wallet.route"));
const setting_route_1 = __importDefault(require("./setting.route"));
const initRoutes = (baseRoute, app) => {
    app.use(`${baseRoute}/customers`, customer_route_1.default);
    app.use(`${baseRoute}/auth`, auth_route_1.default);
    app.use(`${baseRoute}/transactions`, transaction_route_1.default);
    app.use(`${baseRoute}/banks`, bank_route_1.default);
    app.use(`${baseRoute}/file`, file_route_1.default);
    app.use(`${baseRoute}/kyc`, kyc_route_1.default);
    app.use(`${baseRoute}/wallets`, wallet_route_1.default);
    app.use(`${baseRoute}/settings`, setting_route_1.default);
};
exports.default = initRoutes;
