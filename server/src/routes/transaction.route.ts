import Express from "express";
import { bookFlight } from "../controllers/transaction.controller";
import { authorize, tryCatch } from "../middlewares/middleware";

const transRoute = Express.Router();

/**
 * @swagger
 * /transactions/flight/book:
 *   post:
 *     summary: Book a flight
 *     description: Endpoint to book a flight.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 description: The departure airport
 *                 example: JFK
 *               to:
 *                 type: string
 *                 description: The destination airport
 *                 example: LAX
 *               scheduledFlightDate:
 *                 type: date
 *                 description: The scheduled flight date.
 *                 example: 2025-04-02
 *               type:
 *                 type: string
 *                 description: The seat type.
 *                 example: economy
 *               paymentMethod:
 *                 type: string
 *                 description: The method of payment, btc,eth,usd .etc
 *                 example: btc
 *               passengers:
 *                 type: number
 *                 description: How many passengers are you booking for
 *                 example: 1
 *
 *     responses:
 *       201:
 *         description: Flight booked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the booking was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the booking.
 *       400:
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the booking was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the booking.
 *                   example: "Bad request"
 *       401:
 *         description: Unauthorized. User is not authorized to book a flight.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the booking was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the booking.
 *                   example: "Unathorized"
 *                 code:
 *                   type: string
 *                   example: E1104
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the booking was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the booking.
 *                   example: "An error occured please contact admin"
 */
transRoute.post("/flight/book", authorize, tryCatch(bookFlight));

export default transRoute;
