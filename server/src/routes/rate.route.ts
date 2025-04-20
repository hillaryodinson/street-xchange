import { fetchRate } from "../controllers/rate.controller";
import Express from "express";
import { tryCatch } from "../middlewares/middleware";

const RateRoute = Express.Router();

/**
 * @swagger
 * /rates:
 *   get:
 *     summary: Fetch current rates
 *     tags: [Rate]
 *     responses:
 *       200:
 *         description: get the current rate in NGN
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
 *                    type: object
 *                    properties:
 *                          rate:
 *                              type: number
 *                              description: current rate
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
RateRoute.get("/", tryCatch(fetchRate));

export default RateRoute;
