import Express from "express";
import { bookFlight } from "../controllers/transaction.controller";
import { authorize, tryCatch } from "../middlewares/middleware";

const transRoute = Express.Router();

/**
 * @swagger
 * /flight/book:
 *   post:
 *     summary: Book a flight
 *     description: Endpoint to book a flight.
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flightId:
 *                 type: string
 *                 description: The ID of the flight to book.
 *               userId:
 *                 type: string
 *                 description: The ID of the user booking the flight.
 *               paymentDetails:
 *                 type: object
 *                 description: Payment details for the booking.
 *                 properties:
 *                   cardNumber:
 *                     type: string
 *                     description: Credit card number.
 *                   expiryDate:
 *                     type: string
 *                     description: Expiry date of the card.
 *                   cvv:
 *                     type: string
 *                     description: CVV of the card.
 *     responses:
 *       200:
 *         description: Flight booked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the booking was successful.
 *                 bookingId:
 *                   type: string
 *                   description: The ID of the booking.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. User is not authorized to book a flight.
 *       500:
 *         description: Internal server error.
 */
transRoute.post("/flight/book", authorize, tryCatch(bookFlight));

export default transRoute;
