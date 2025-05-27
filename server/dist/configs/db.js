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
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDB = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("./constants");
require("dotenv").config();
let prisma;
prisma = global.prisma || new client_1.PrismaClient();
global.prisma = prisma;
exports.default = prisma;
const populateDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if ((((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "development" ||
        ((_b = process.env.NODE_ENV) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === "test") &&
        global.prisma) {
        try {
            const admin = yield prisma.user.findFirst();
            if (!admin) {
                console.log("No database found, initializing...");
                yield prisma.admin.create({
                    data: {
                        name: "Admin Account",
                        email: "admin@admin.com",
                        password: "$argon2id$v=19$m=65536,t=3,p=4$WwrESfCSMFODHyTjJfZ4mQ$FvgfpUwcg9Josfmq1+z3N4558gT9pIhJLfuePG4JtZI",
                    },
                });
                console.log("Database initialized");
            }
            const keys = Object.values(constants_1.SettingColunns);
            const settings = yield prisma.setting.findMany({
                where: {
                    key: {
                        in: keys,
                    },
                },
            });
            if (settings.length !== keys.length) {
                console.log("Some keys are missing in the settings table");
                console.log("Creating missing keys");
                const missingKeys = keys.filter((key) => !settings.some((setting) => setting.key === key));
                yield prisma.setting.createMany({
                    data: missingKeys.map((key) => ({
                        key,
                        value: String(constants_1.DefaultSettings[key]), // Convert default values to string
                    })),
                });
                console.log("Settings field configured");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.populateDB = populateDB;
