import Express from "express";
import { authorize, tryCatch } from "../middlewares/middleware";
import {
	addKYC,
	listKYCRequests,
	processKYCRequest,
} from "../controllers/kyc.controller";

const kycRoute = Express.Router();

/**
 * @swagger
 * /kyc:
 *   post:
 *     summary: Submit a new KYC request
 *     tags: [KYC Verification]
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
 *                 description: The type of kyc document.
 *               number:
 *                 type: string
 *                 description: The identity document number.
 *               frontimage:
 *                 type: string
 *                 description: The url to the captured frontimage uploaded by the user.
 *               backimage:
 *                 type: string
 *                 description: The url to the captured backimage uploaded by the user (optional).
 *     responses:
 *       200:
 *         description: Kyc submited successfully.
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
 *                   example: KYC submitted verification is ongoing
 *       400:
 *         description: Registration failed.
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
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *
 *       401:
 *         description: User not authenticated.
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
 *                   example: Unathenticated
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *       403:
 *         description: Unauthorized
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
 *                   example: Unathorized
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 */
kycRoute.post("/", authorize, tryCatch(addKYC));
/**
 * @swagger
 * /kyc/process:
 *   post:
 *     summary: Process a KYC request
 *     tags: [KYC Verification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the KYC request to process
 *       - in: query
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *           enum: [approve, decline]
 *         description: Status to update the KYC request to
 *     responses:
 *       200:
 *         description: Kyc submited successfully.
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
 *                   example: KYC submitted verification is ongoing
 *       400:
 *         description: Registration failed.
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
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *
 *       401:
 *         description: User not authenticated.
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
 *                   example: Unathenticated
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *       403:
 *         description: Unauthorized
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
 *                   example: Unathorized
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 */

kycRoute.post("/process", authorize, tryCatch(processKYCRequest));
/**
 * @swagger
 * /kyc:
 *   get:
 *     summary: List all KYC requests
 *     tags: [KYC Verification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of KYC requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID of the KYC request
 *                   customerId:
 *                     type: string
 *                     description: ID of the user who submitted the request
 *                   customer:
 *                     type: object
 *                     properties:
 *                      firstname:
 *                          type: string
 *                          description: The first name of the customer.
 *                      middlename:
 *                          type: string
 *                          description: The middle name of the customer (optional).
 *                      surname:
 *                          type: string
 *                          description: The surname of the customer.
 *                      email:
 *                          type: string
 *                          description: The email address of the customer. Must be unique.
 *                      dob:
 *                          type: string
 *                          format: date
 *                          description: The date of birth of the customer.
 *                      residentialAddress:
 *                          type: string
 *                          description: The residential address of the customer.
 *                      phoneNo:
 *                          type: string
 *                          description: The phone number of the customer.
 *                   type:
 *                     type: string
 *                     description: ID of the user who submitted the request
 *                   number:
 *                     type: string
 *                     description: ID of the user who submitted the request
 *                   frontimage:
 *                     type: string
 *                     description: ID of the user who submitted the request
 *                   backimage:
 *                     type: string
 *                     description: ID of the user who submitted the request
 *                   isApproved:
 *                     type: boolean
 *                     description: Current status of the KYC request
 *       401:
 *         description: Unauthorized
 */
kycRoute.get("/", authorize, tryCatch(listKYCRequests));

export default kycRoute;
