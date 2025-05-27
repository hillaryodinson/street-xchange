"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSettings = exports.SettingColunns = void 0;
exports.SettingColunns = {
    NGN_RATE: "ngn_rate",
    TRANS_EXPIRY_SEC: "trans_expiry_sec", // 30 minutes
};
exports.DefaultSettings = {
    [exports.SettingColunns.NGN_RATE]: 0,
    [exports.SettingColunns.TRANS_EXPIRY_SEC]: 1800, // 30 minutes
};
