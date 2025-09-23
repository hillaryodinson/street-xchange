import { Router } from "express";
import { getAllTransactions } from "../../controllers/admin/transaction.controller";

const AdminTransactionRoute = Router();

/**
 * @swagger
 *  /admin/transactions:
 *    get:
 *      summary: Get all transactions
 *      tags: [Admin]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            default: 1
 *          description: Page number for pagination
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            default: 10
 *          description: Number of transactions per page
 *      responses:
 *        200:
 *          description: A list of transactions with pagination metadata
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  transactions:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                        amount:
 *                          type: number
 *                        type:
 *                          type: string
 *                        status:
 *                          type: string
 *                        reference:
 *                          type: string
 *                        createdAt:
 *                          type: string
 *                          format: date-time
 *                  meta:
 *                    type: object
 *                    properties:
 *                      total:
 *                        type: integer
 *                        description: Total number of transactions
 *                      page:
 *                        type: integer
 *                        description: Current page number
 *                      lastPage:
 *                        type: integer
 *                        description: Last page number based on total and limit
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: Error message
 */
AdminTransactionRoute.get("/", getAllTransactions);

// AdminTransactionRoute.get("/:id", getTransactionById);
// AdminTransactionRoute.post("/", createTransaction);
// AdminTransactionRoute.put("/:id", updateTransaction);
// AdminTransactionRoute.delete("/:id", deleteTransaction);

export default AdminTransactionRoute;
