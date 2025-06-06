import Express from "express";
import {
	bookFlight,
	confirmCryptoOrder,
	createCryptoSellOrder,
	createGiftCardTransaction,
	getTransactionByTransId,
} from "../controllers/transaction.controller";
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

/**
 * @swagger
 * /transactions/crypto/sell-order:
 *   post:
 *     summary: Create a crypto sell order
 *     description: Endpoint to create a crypto sell order.
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
 *               cryptoTypeSent:
 *                 type: string
 *                 description: The type of cryptocurrency being sent.
 *                 example: BTC
 *               cryptoAmountSent:
 *                 type: number
 *                 description: The amount of cryptocurrency being sent.
 *                 example: 0.5
 *               fiatAmountReceived:
 *                 type: number
 *                 description: The amount of fiat currency to be received.
 *                 example: 25000
 *               fiatCurrency:
 *                 type: string
 *                 description: The fiat currency to be received.
 *                 example: USD
 *               fiatRate:
 *                 type: number
 *                 description: The exchange rate for the fiat currency.
 *                 example: 50000
 *               currentUSDRate:
 *                 type: number
 *                 description: The current USD rate for the cryptocurrency.
 *                 example: 50000
 *               walletAddress:
 *                 type: string
 *                 description: The wallet address to send the cryptocurrency to.
 *                 example: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
 *               walletNetwork:
 *                 type: string
 *                 description: The network of the wallet address.
 *                 example: "Bitcoin"
 *
 *     responses:
 *       201:
 *         description: Crypto sell order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the sell order was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the sell order.
 *       400:
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the sell order was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the sell order.
 *                   example: "Bad request"
 *       401:
 *         description: Unauthorized. User is not authorized to create a sell order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the sell order was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the sell order.
 *                   example: "Unauthorized"
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
 *                   description: Indicates if the sell order was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the sell order.
 *                   example: "An error occurred, please contact admin"
 */
transRoute.post(
	"/crypto/sell-order",
	authorize,
	tryCatch(createCryptoSellOrder)
);
/**
 * @swagger
 * /transactions/crypto/confirm-order:
 *   put:
 *     summary: Confirm a crypto order
 *     description: Endpoint to confirm a crypto order. Marks a payment as done and awaits admin confirmation.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: transId
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction ID to confirm.
 *         example: ase3rsefgt5
 *
 *     responses:
 *       200:
 *         description: Crypto order confirmed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the confirmation was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the confirmation.
 *       400:
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the confirmation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the confirmation.
 *                   example: "Bad request"
 *       401:
 *         description: Unauthorized. User is not authorized to confirm the order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the confirmation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the confirmation.
 *                   example: "Unauthorized"
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
 *                   description: Indicates if the confirmation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the confirmation.
 *                   example: "An error occurred, please contact admin"
 */
transRoute.put(
	"/crypto/confirm-order",
	authorize,
	tryCatch(confirmCryptoOrder)
);

/**
 * @swagger
 * /transactions/{transId}:
 *   get:
 *     summary: Get transaction by transaction ID
 *     description: Endpoint to retrieve a transaction by its ID.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: parameter
 *         name: transId
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction ID to confirm.
 *         example: ase3rsefgt5
 *
 *     responses:
 *       200:
 *         description: Gift card order confirmed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the confirmation was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the confirmation.
 *       400:
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the confirmation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the confirmation.
 *                   example: "Bad request"
 *       401:
 *         description: Unauthorized. User is not authorized to confirm the order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the confirmation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the confirmation.
 *                   example: "Unauthorized"
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
 *                   description: Indicates if the confirmation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the confirmation.
 *                   example: "An error occurred, please contact admin"
 */
transRoute.get("/:transId", authorize, tryCatch(getTransactionByTransId));

/**
 * @swagger
 * /transactions/giftcard/sell-order:
 *   post:
 *     summary: Create a giftcard sell order
 *     description: Endpoint to create a giftcard sell order.
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
 *               type:
 *                 type: string
 *                 description: The type of gift card being sold.
 *                 example: Amazon
 *               amount:
 *                 type: number
 *                 description: The amount of the gift card.
 *                 example: 100
 *               cardType:
 *                 type: string
 *                 description: The type of the card (e.g., physical or e-code).
 *                 example: e-code
 *               country:
 *                 type: string
 *                 description: The country where the gift card is valid.
 *                 example: US
 *               accountId:
 *                 type: string
 *                 description: The account ID of the user selling the gift card.
 *                 example: "12345"
 *               speed:
 *                 type: number
 *                 description: The speed of the transaction (optional).
 *                 example: 1
 *               pin:
 *                 type: string
 *                 description: The pin of the gift card.
 *                 example: "1234-5678-9012"
 *               additionalInfo:
 *                 type: string
 *                 description: Additional information about the gift card.
 *                 example: "Valid for online purchases only"
 *               cardCode:
 *                 type: string
 *                 description: The code of the gift card.
 *                 example: "AMZ123456789"
 *               cardImage:
 *                 type: string
 *                 description: A URL or base64 string of the gift card image.
 *                 example: "https://example.com/card-image.jpg"
 *
 *     responses:
 *       201:
 *         description: Gift card sell order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the sell order was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the sell order.
 *       400:
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the sell order was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the sell order.
 *                   example: "Bad request"
 *       401:
 *         description: Unauthorized. User is not authorized to create a sell order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the sell order was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the sell order.
 *                   example: "Unauthorized"
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
 *                   description: Indicates if the sell order was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the sell order.
 *                   example: "An error occurred, please contact admin"
 */
transRoute.post(
	"/giftcard/sell-order",
	authorize,
	tryCatch(createGiftCardTransaction)
);
export default transRoute;
