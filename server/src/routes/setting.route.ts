import Express from "express";
import { authorize, tryCatch } from "../middlewares/middleware";
import { fetchSetting, updateSetting } from "../controllers/setting.controller";

const settingRoute = Express.Router();

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
settingRoute.get("/", tryCatch(fetchSetting));

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
settingRoute.put("/", authorize, tryCatch(updateSetting));

export default settingRoute;
