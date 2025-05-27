"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middlewares/middleware");
const customer_controller_1 = require("../controllers/customer.controller");
const customerRoutes = (0, express_1.Router)();
/**
 * @swagger
 * /customers/register:
 *   post:
 *     summary: Registers a new customer in the system.
 *     description: Registers a new customer with the provided details.
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: withKYC
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Optional query parameter to indicate if KYC (Know Your Customer) details should be included.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The first name of the customer.
 *               middlename:
 *                 type: string
 *                 description: The middle name of the customer (optional).
 *               surname:
 *                 type: string
 *                 description: The surname of the customer.
 *               email:
 *                 type: string
 *                 description: The email address of the customer. Must be unique.
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the customer.
 *               residentialAddress:
 *                 type: string
 *                 description: The residential address of the customer.
 *               phoneNo:
 *                 type: string
 *                 description: The phone number of the customer.
 *               password:
 *                 type: string
 *                 description: The password for the customer's account.
 *     responses:
 *       200:
 *         description: Registration successful.
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
 *                   example: Registration successful
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
 *                   example: Registration failed
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 */
customerRoutes.post("/register", (0, middleware_1.tryCatch)(customer_controller_1.register));
/**
 * @swagger
 * /customers/change-password:
 *   post:
 *     summary: Registers a new customer in the system.
 *     description: Registers a new customer with the provided details.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the customer's account.
 *               oldpassword:
 *                 type: string
 *                 description: The old password for the customer's account.
 *     responses:
 *       200:
 *         description: Registration successful.
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
 *                   example: Password changed successfully
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
 *                   example: Registration failed
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 */
customerRoutes.post("/change-password", middleware_1.authorize, (0, middleware_1.tryCatch)(customer_controller_1.changePassword));
//TODO: Get Customers
//TODO: Get Single Customer
//TODO: Blacklist Customer
//TODO: UnBlacklist Customer
exports.default = customerRoutes;
