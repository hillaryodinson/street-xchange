import { Router } from "express";
import { tryCatch } from "../middlewares/middleware";
import { activateAccount, register } from "../controllers/customer.controller";

const customerRoutes = Router();

customerRoutes.post("/register", tryCatch(register));
customerRoutes.post("/activate", tryCatch(activateAccount));

//TODO: Get Customers
//TODO: Get Single Customer
//TODO: Blacklist Customer
//TODO: UnBlacklist Customer

export default customerRoutes;
