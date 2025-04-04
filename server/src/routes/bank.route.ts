import Express from "express";
import { authorize, tryCatch } from "../middlewares/middleware";
import {
	addBankAccount,
	confirmAddBankAccount,
	getCustomerBankAccounts,
} from "../controllers/bank.controller";

const bankRoutes = Express.Router();
/**
 * @swagger
 * /banks:
 *   post:
 *     summary: Add a new bank account
 *     description: Endpoint to add a new bank account to the system. Requires authorization.
 *     tags:
 *       - Banks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNo:
 *                 type: string
 *                 description: The bank account number.
 *                 example: "1234567890"
 *               bankName:
 *                 type: string
 *                 description: The name of the bank.
 *                 example: "Access Bank"
 *               accountName:
 *                 type: string
 *                 description: The name of the account holder.
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Bank account successfully added.
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
 *                   example: "Please confirm bank account action. Check your email for more details"
 *       400:
 *         description: Bad request. Invalid input data.
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
 *                   example: "Bad request. Invalid data"
 *                 code:
 *                   type: string
 *                   example: "EE120"
 *       401:
 *         description: Unauthorized. Missing or invalid token.
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
 *                   example: "Unauthorized"
 *                 code:
 *                   type: string
 *                   example: "EE120"
 *       500:
 *         description: Internal server error.
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
 *                   example: "An error occured please contact admin"
 *                 code:
 *                   type: string
 *                   example: "EE120"
 */
bankRoutes.post("/", authorize, tryCatch(addBankAccount));

/**
 * @swagger
 * /banks/confirm:
 *   post:
 *     summary: Confirm the addition of a bank account
 *     description: Endpoint to confirm the addition of a bank account. Requires authorization.
 *     tags:
 *       - Banks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 description: The confirmation token sent to the user's email.
 *                 example: "856780"
 *     responses:
 *       200:
 *         description: Bank account successfully confirmed.
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
 *                   example: "Bank account successfully confirmed."
 *       400:
 *         description: Bad request. Invalid or expired token.
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
 *                   example: "Invalid or expired token."
 *                 code:
 *                   type: string
 *                   example: "EE121"
 *       401:
 *         description: Unauthorized. Missing or invalid token.
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
 *                   example: "Unauthorized"
 *                 code:
 *                   type: string
 *                   example: "EE120"
 *       500:
 *         description: Internal server error.
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
 *                   example: "An error occurred, please contact admin."
 *                 code:
 *                   type: string
 *                   example: "EE122"
 */
bankRoutes.post("/confirm", authorize, tryCatch(confirmAddBankAccount));

/**
 * @swagger
 * /banks/{id}:
 *   delete:
 *     summary: Delete a bank account
 *     description: Endpoint to delete a bank account by its ID. Requires authorization.
 *     tags:
 *       - Banks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bank account to delete.
 *         example: "64b7f3e2c9a1a2b3c4d5e6f7"
 *     responses:
 *       200:
 *         description: Bank account successfully deleted.
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
 *                   example: "Bank account successfully deleted."
 *       400:
 *         description: Bad request. Invalid bank account ID.
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
 *                   example: "Invalid bank account ID."
 *                 code:
 *                   type: string
 *                   example: "EE123"
 *       401:
 *         description: Unauthorized. Missing or invalid token.
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
 *                   example: "Unauthorized"
 *                 code:
 *                   type: string
 *                   example: "EE120"
 *       404:
 *         description: Bank account not found.
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
 *                   example: "Bank account not found."
 *                 code:
 *                   type: string
 *                   example: "EE124"
 *       500:
 *         description: Internal server error.
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
 *                   example: "An error occurred, please contact admin."
 *                 code:
 *                   type: string
 *                   example: "EE122"
 */
bankRoutes.delete("/:id", authorize, tryCatch(confirmAddBankAccount));

/**
 * @swagger
 * /banks:
 *   get:
 *     summary: List all customer bank accounts
 *     description: Endpoint to list all customer bank accounts. Requires authorization.
 *     tags:
 *       - Banks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customer bank accounts retrieved successfully.
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
 *                   example: "Ok"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bankName:
 *                         type: string
 *                         example: "Access Bank"
 *                       accountNo:
 *                         type: string
 *                         example: "1234567890"
 *                       accountName:
 *                         type: string
 *                         example: "John Doe"
 *       400:
 *         description: Bad request. Invalid input data.
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
 *                   example: "Bad request. Invalid data."
 *                 code:
 *                   type: string
 *                   example: "EE120"
 *       401:
 *         description: Unauthorized. Missing or invalid token.
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
 *                   example: "Unauthorized."
 *                 code:
 *                   type: string
 *                   example: "EE120"
 *       500:
 *         description: Internal server error.
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
 *                   example: "An error occurred, please contact admin."
 *                 code:
 *                   type: string
 *                   example: "EE122"
 */
bankRoutes.get("/", authorize, tryCatch(getCustomerBankAccounts));
export default bankRoutes;
