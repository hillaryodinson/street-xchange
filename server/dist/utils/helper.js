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
exports.moveImageToLive = exports.sendActivationEmail = void 0;
exports.generateRandomString = generateRandomString;
exports.generateRandomNumbers = generateRandomNumbers;
exports.generateUniqueRandomStrings = generateUniqueRandomStrings;
const nodemailer_db_1 = require("../services/nodemailer-db");
const db_1 = __importDefault(require("../configs/db"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sendActivationEmail = (token, user) => __awaiter(void 0, void 0, void 0, function* () {
    //verify email address
    const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";
    const ACTIVATION_ROUTE = process.env.CLIENT_ACTIVATION_ROUTE || "/activate";
    const ACTIVATION_URL = `${CLIENT_URL}${ACTIVATION_ROUTE}?token=${token}`;
    const mailer = new nodemailer_db_1.NodemailerDB(db_1.default);
    yield mailer.sendMail({
        to: user.email,
        subject: "Activate Your Account",
        template: `activate_account`,
        context: {
            name: user.email,
            activationURL: ACTIVATION_URL,
        },
        from: process.env.EMAIL || "no-reply@example.com",
    });
});
exports.sendActivationEmail = sendActivationEmail;
function generateRandomString(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // You can customize the character set
    let randomString = "";
    // Loop to generate a random string of the specified length
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
}
function generateRandomNumbers(length) {
    const charset = "0123456789"; // You can customize the character set
    let randomString = "";
    // Loop to generate a random string of the specified length
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
}
function generateUniqueRandomStrings(count, length) {
    const uniqueStrings = new Set(); // Set will automatically handle uniqueness
    // Generate unique strings until we have the required count
    while (uniqueStrings.size < count) {
        uniqueStrings.add(generateRandomString(length));
    }
    // Convert the Set back to an array and return it
    return Array.from(uniqueStrings);
}
/**
 * Helper method to move an image from temp to live directory
 * @param publicUrl - The public URL of the image
 * @param customer - The customer ID
 */
const moveImageToLive = (publicUrl, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = new URL(publicUrl).pathname; // Extract the path from the URL
    const tempPath = path_1.default.join("temp", customerId, imagePath.split("/").pop());
    const livePath = path_1.default.join("live", customerId, imagePath.split("/").pop());
    // Ensure live/customer directory exists
    const liveCustomerPath = path_1.default.join("live", customerId);
    if (!fs_1.default.existsSync(liveCustomerPath)) {
        fs_1.default.mkdirSync(liveCustomerPath, { recursive: true });
    }
    // Move the file from temp to live
    fs_1.default.renameSync(tempPath, livePath);
    // Delete all images in temp/customer folder
    const tempCustomerPath = path_1.default.join("temp", customerId);
    fs_1.default.rmSync(tempCustomerPath, { recursive: true, force: true });
    return livePath;
});
exports.moveImageToLive = moveImageToLive;
