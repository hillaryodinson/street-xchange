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
exports.deleteFile = exports.uploadFile = void 0;
const errors_1 = require("../utils/errors");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const files = req.files;
    const request = req;
    const generateThumbnails = request.query.withThumb || false;
    const customer = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!customer)
        throw new errors_1.AppError(errors_1.ERROR_CODES.USER_NOT_AUTHORIZED, "Unauthorized", 401);
    if (!files || files.length === 0) {
        throw new errors_1.AppError(errors_1.ERROR_CODES.FILE_NOT_FOUND, "No file was uploaded", 400);
    }
    // Ensure temp/customer directory exists
    const tempCustomerPath = path_1.default.join("temp", customer);
    if (!fs_1.default.existsSync(tempCustomerPath)) {
        fs_1.default.mkdirSync(tempCustomerPath, { recursive: true });
    }
    const response = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const tempThumbPath = path_1.default.join(tempCustomerPath, "thumb", file.filename);
        const tempMainPath = path_1.default.join(tempCustomerPath, "main", file.filename);
        // Ensure temp/thumb and temp/main directories exist
        if (generateThumbnails) {
            const tempThumbDir = path_1.default.join(tempCustomerPath, "thumb");
            if (!fs_1.default.existsSync(tempThumbDir)) {
                fs_1.default.mkdirSync(tempThumbDir, { recursive: true });
            }
        }
        const tempMainDir = path_1.default.join(tempCustomerPath, "main");
        if (!fs_1.default.existsSync(tempMainDir)) {
            fs_1.default.mkdirSync(tempMainDir, { recursive: true });
        }
        if (generateThumbnails) {
            // Resize the image to thumbnail
            yield (0, sharp_1.default)(file.path).resize(150, 150).toFile(tempThumbPath);
        }
        // Resize the image to main size
        yield (0, sharp_1.default)(file.path).resize(800, 800).toFile(tempMainPath);
        // Return paths for thumb and main images
        const BASEURL = process.env.SERVER_URL || "http://localhost:3000";
        return generateThumbnails
            ? {
                thumb: `${BASEURL}/${tempThumbPath}`,
                main: `${BASEURL}/${tempMainPath}`,
            }
            : {
                main: `${BASEURL}/${tempMainPath}`,
            };
    })));
    res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: response,
    });
});
exports.uploadFile = uploadFile;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const filename = request.body.filename;
    if (!filename)
        throw new errors_1.AppError(errors_1.ERROR_CODES.FILE_NOT_FOUND, "File name is required", 400);
    // Build the paths for both thumb and main images
    const thumbPath = path_1.default.join("uploads", "thumb", filename);
    const mainPath = path_1.default.join("uploads", "main", filename);
    // Function to delete a file
    const deleteFile = (filePath) => {
        return new Promise((resolve, reject) => {
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    return reject(`Error deleting file: ${filePath}`);
                }
                resolve();
            });
        });
    };
    // Delete the files (thumb and main)
    yield Promise.all([deleteFile(thumbPath), deleteFile(mainPath)]);
    res.status(200).json({
        success: true,
        message: "File was deleted successfully",
    });
});
exports.deleteFile = deleteFile;
