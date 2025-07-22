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
 *     summary: List KYC requests and return dashboard data
 *     tags: [KYC Verification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, pending, approved, failed]
 *         description: Filter KYC requests by status
 *     responses:
 *       200:
 *         description: List of KYC requests with dashboard summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     dashdata:
 *                       type: object
 *                       properties:
 *                         totalApproved:
 *                           type: integer
 *                           description: Number of approved KYC requests this month
 *                         totalReviewed:
 *                           type: integer
 *                           description: Number of reviewed KYC requests this month
 *                         approvalRate:
 *                           type: string
 *                           description: Percentage of approvals (e.g., "85.00%")
 *                     kycs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: ID of the KYC request
 *                           customerId:
 *                             type: string
 *                             description: ID of the customer
 *                           customer:
 *                             type: object
 *                             properties:
 *                               isVerified:
 *                                 type: integer
 *                                 description: Verification status of the customer
 *                           type:
 *                             type: string
 *                             description: Type of identification (e.g., "NIN", "Passport")
 *                           number:
 *                             type: string
 *                             description: Identification number
 *                           frontimage:
 *                             type: string
 *                             description: Front image of the ID
 *                           backimage:
 *                             type: string
 *                             description: Back image of the ID (if provided)
 *                           status:
 *                             type: string
 *                             enum: [pending, approved, declined]
 *                             description: Status of the KYC request
 *                           declineReason:
 *                             type: string
 *                             nullable: true
 *                             description: Reason for declining (if status is declined)
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: Timestamp when KYC was submitted
 *       401:
 *         description: Unauthorized
 */
kycRoute.get("/", authorize, tryCatch(listKYCRequests));

export default kycRoute;
