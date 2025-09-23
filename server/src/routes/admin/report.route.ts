import { Router } from "express";
import { getReport } from "../../controllers/admin/report.controller";

const AdminReportRoute = Router();

/**
 * @swagger
 *  /admin/report:
 *    get:
 *      summary: Get monthly report
 *      tags: [Admin]
 *      parameters:
 *        - in: query
 *          name: month
 *          schema:
 *            type: string
 *            example: "2023-08"
 *          description: Month for the report in YYYY-MM format (required)
 *      responses:
 *        200:
 *          description: Monthly report data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  totalRevenue:
 *                    type: number
 *                    description: Total revenue for the month
 *                  totalTransactions:
 *                    type: integer
 *                    description: Total number of transactions
 *                  totalUsers:
 *                    type: integer
 *                    description: Total number of users
 *                  totalKycVerifiedUsers:
 *                    type: integer
 *                    description: Total number of KYC verified users
 *                  totalBanksLinked:
 *                    type: integer
 *                    description: Total number of banks linked
 *                  totalWithdrawals:
 *                    type: integer
 *                    description: Total number of withdrawals
 *                  totalDeposits:
 *                    type: integer
 *                    description: Total number of deposits
 *                  totalGiftCardOrders:
 *                    type: integer
 *                    description: Total number of gift card order
 *
 */
AdminReportRoute.get("/", getReport);

export default AdminReportRoute;
