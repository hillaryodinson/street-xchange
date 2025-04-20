import Express from "express";
import { authorize, tryCatch } from "../middlewares/middleware";
import {
	addWallet,
	deleteWallet,
	fetchRandomWalletAddress,
	fetchSupportedCrypto,
	fetchSupportedCryptoNetworks,
	fetchWallets,
	manageWallet,
} from "../controllers/wallet.controller";

const walletRoute = Express.Router();

/**
 * @swagger
 * /wallets:
 *   post:
 *     summary: Add a new wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crypto:
 *                 type: string
 *                 description: Name of the wallet
 *                 example: BTC
 *               network:
 *                 type: string
 *                 description: Wallet network
 *                 example: ETH
 *               address:
 *                 type: string
 *                 description:  Comma seperated string of wallet addresses
 *                 example: 1DrGr8g8SjTP3ikmA41YdUiP6r1T95bMot,1HA3kYHbKNCVJkM1ogk1ZuPG3kZtgc7EUT
 *     responses:
 *       200:
 *         description: Wallet was created
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
 *                   example: Wallet created successfully
 *
 *       400:
 *         description: Bad request.
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
 *                   example: Bad request
 *       401:
 *         description: Unauthenticated
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
 *         description: Unauthorized Access
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
walletRoute.post("/", authorize, tryCatch(addWallet));

/**
 * @swagger
 * /wallets:
 *   get:
 *     summary: Fetch all wallets
 *     tags: [Wallet]
 *     responses:
 *       200:
 *         description: List of wallets retrieved successfully
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
 *                   example: Wallets fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              description: Unique identifier for the wallet
 *                          crypto:
 *                              type: string
 *                              description: Name of the cryptocurrency
 *                          network:
 *                              type: string
 *                              description: Blockchain network of the wallet
 *                          addresses:
 *                              description: Array of wallet addresses
 *                              type: string
 *                          createdAt:
 *                              type: string
 *                              format: date-time
 *                              description: Timestamp when the wallet was created
 *                          updatedAt:
 *                              type: string
 *                              format: date-time
 *                              description: Timestamp when the wallet was last updated
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
walletRoute.get("/", tryCatch(fetchWallets));

/**
 * @swagger
 * /wallets/random:
 *   get:
 *     summary: Fetch random wallet address
 *     tags: [Wallet]
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the wallet
 *         example: BTC
 *       - in: query
 *         name: network
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet network
 *         example: ETH
 *     responses:
 *       200:
 *         description: List of wallets retrieved successfully
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
 *                   example: Wallets fetched successfully
 *                 data:
 *                    type: object
 *                    properties:
 *                          id:
 *                              type: string
 *                              description: Unique identifier for the wallet
 *                          crypto:
 *                              type: string
 *                              description: Name of the cryptocurrency
 *                          network:
 *                              type: string
 *                              description: Blockchain network of the wallet
 *                          addresses:
 *                              description: Array of wallet addresses
 *                              type: string
 *                          createdAt:
 *                              type: string
 *                              format: date-time
 *                              description: Timestamp when the wallet was created
 *                          updatedAt:
 *                              type: string
 *                              format: date-time
 *                              description: Timestamp when the wallet was last updated
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
walletRoute.get("/random", tryCatch(fetchRandomWalletAddress));

/**
 * @swagger
 * /wallets/manage:
 *   post:
 *     summary: Manage an existing wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the wallet to manage
 *       - in: query
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *           enum: [activate, deactivate]
 *         description: Activate or deactivate wallet
 *     responses:
 *       200:
 *         description: Wallet updated successfully
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
 *                   example: Wallet updated successfully
 *
 *       400:
 *         description: Bad request.
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
 *                   example: Bad request
 *       401:
 *         description: Unauthenticated
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
 *         description: Unauthorized Access
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
walletRoute.post("/manage", authorize, tryCatch(manageWallet));
/**
 * @swagger
 * /wallets/{id}:
 *   delete:
 *     summary: Delete a wallet by ID
 *     tags: [Wallet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the wallet to delete
 *     responses:
 *       200:
 *         description: Wallet deleted successfully
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
 *                   example: Wallet deleted successfully
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
walletRoute.delete("/:id", authorize, tryCatch(deleteWallet));
/**
 * @swagger
 * /wallets/supported-crypto:
 *   get:
 *     summary: Fetch supported cryptocurrencies (Crypto with active wallets)
 *     tags: [Wallet]
 *     responses:
 *       200:
 *         description: List of cryptocurrencies retrieved successfully
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
 *                          id:
 *                              type: string
 *                              description: Unique identifier for the wallet
 *                          crypto:
 *                              type: string
 *                              description: Name of the cryptocurrency
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
walletRoute.get("/supported-crypto", tryCatch(fetchSupportedCrypto));
/**
 * @swagger
 * /wallets/supported-crypto/networks:
 *   get:
 *     summary: Fetch supported cryptocurrencies networks (Crypto with active wallets)
 *     tags: [Wallet]
 *     parameters:
 *       - in: query
 *         name: crypto
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the wallet
 *         example: BTC
 *     responses:
 *       200:
 *         description: List of networks retrieved successfully
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
 *                          id:
 *                              type: string
 *                              description: Unique identifier for the network
 *                          network:
 *                              type: string
 *                              description: Blockchain network of the wallet
 *
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
walletRoute.get(
	"/supported-crypto/networks",
	tryCatch(fetchSupportedCryptoNetworks)
);

export default walletRoute;
