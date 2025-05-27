"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middlewares/middleware");
const setting_controller_1 = require("../controllers/setting.controller");
const settingRoute = express_1.default.Router();
/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Fetch current settings
 *     tags: [Setting]
 *     parameters:
 *       - in: query
 *         name: setting
 *         schema:
 *           type: string
 *           enum: [rate, size]
 *         required: true
 *         description: The setting to fetch (rate or size)
 *     responses:
 *       200:
 *         description: Successfully fetched the setting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Ok
 *                 data:
 *                   type: object
 *                   properties:
 *                     setting:
 *                       type: string
 *                       description: The requested setting
 *                     value:
 *                       type: number
 *                       description: The value of the requested setting
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthenticated
 *       403:
 *         description: User does not have the necessary permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
settingRoute.get("/", (0, middleware_1.tryCatch)(setting_controller_1.fetchSetting));
/**
 * @swagger
 * /settings:
 *   put:
 *     summary: Update a specific setting
 *     tags: [Setting]
 *     parameters:
 *       - in: query
 *         name: setting
 *         schema:
 *           type: string
 *           enum: [rate, size]
 *         required: true
 *         description: The setting to update (rate or size)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 description: The new value for the setting
 *             required:
 *               - value
 *     responses:
 *       200:
 *         description: Successfully updated the setting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Setting updated successfully
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthenticated
 *       403:
 *         description: User does not have the necessary permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
settingRoute.put("/", middleware_1.authorize, (0, middleware_1.tryCatch)(setting_controller_1.updateSetting));
exports.default = settingRoute;
