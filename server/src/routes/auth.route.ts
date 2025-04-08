import { Request, Response, Router } from "express";
import {
	activateAccount,
	adminLogin,
	confirmPasswordReset,
	login,
	resetPassword,
} from "../controllers/auth.controller";
import {
	CustomResponse,
	TypedRequest,
	TypedRequestBody,
	TypedResponse,
} from "../configs/requests";
import {
	ConfirmPasswordResetType,
	LoginType,
	ResetPasswordType,
	UserType,
} from "../configs/types";
import { tryCatch } from "../middlewares/middleware";

const AuthRoute = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login
 *     description: Logs in a user and returns a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: my_secret_password
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: whether the login was successful
 *                 message:
 *                   type: string
 *                   description: a success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: The JWT token
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The user's id
 *                         firstname:
 *                           type: string
 *                           description: The user's first name
 *                         middlename:
 *                           type: string
 *                           description: The user's middle name
 *                         surname:
 *                           type: string
 *                           description: The user's surname
 *                         email:
 *                           type: string
 *                           description: The user's email
 *                         createAt:
 *                           type: string
 *                           description: The user's creation date
 *                         role:
 *                           type: string
 *                           description: The user's role
 *                           example: customer
 *                     hasKyc:
 *                       type: boolean
 *                       description: Whether the user has completed KYC
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: whether the login was successful
 *                 message:
 *                   type: string
 *                   description: an error message
 *                 errors:
 *                   type: string
 *                   description: list of errors
 */
AuthRoute.post(
	"/login",
	tryCatch((req, res) => login(req as TypedRequest<{}, LoginType>, res))
);

/**
 * @swagger
 * /auth/adminlogin:
 *   post:
 *     summary: login
 *     description: Logs in an admin and returns a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: admin@admin.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: whether the login was successful
 *                 message:
 *                   type: string
 *                   description: a success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: The JWT token
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The user's id
 *                         namee:
 *                           type: string
 *                           description: The user's first name
 *                         email:
 *                           type: string
 *                           description: The user's email
 *                         role:
 *                           type: string
 *                           description: The user's role
 *                           example: customer
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: whether the login was successful
 *                 message:
 *                   type: string
 *                   description: an error message
 *                 errors:
 *                   type: string
 *                   description: list of errors
 */
AuthRoute.post(
	"/adminlogin",
	tryCatch((req, res) => adminLogin(req as TypedRequest<{}, LoginType>, res))
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Request a password reset
 *     description: Requests a password reset and sends a link to the specified email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - callback_url
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address to send the reset link to
 *               callback_url:
 *                 type: string
 *                 description: The url to redirect the user to after the reset link is clicked
 *     responses:
 *       200:
 *         description: A message indicating that the email has been sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the email was sent successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the login was successful
 *                 message:
 *                   type: string
 *                   description: an error message
 *                 errors:
 *                   type: string
 *                   description: list of errors
 */
AuthRoute.post(
	"/reset-password",
	tryCatch((req, res) =>
		resetPassword(req as TypedRequest<{}, ResetPasswordType>, res)
	)
);

/**
 * @swagger
 * /auth/reset-password/confirm:
 *   post:
 *     summary: Confirm the password reset
 *     description: Confirms the password reset by updating the user's password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The token sent in the email
 *               password:
 *                 type: string
 *                 description: The new password to set
 *     responses:
 *       200:
 *         description: A message indicating that the password has been reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the password was reset successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the login was successful
 *                 message:
 *                   type: string
 *                   description: an error message
 *                 errors:
 *                   type: string
 *                   description: list of errors
 */
AuthRoute.post(
	"/reset-password/confirm",
	tryCatch((req, res) =>
		confirmPasswordReset(
			req as TypedRequest<{}, ConfirmPasswordResetType>,
			res
		)
	)
);

AuthRoute.post("/activate", tryCatch(activateAccount));

export default AuthRoute;
