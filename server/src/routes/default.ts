import authRoute from "./auth.route";
import type { Express } from "express-serve-static-core";
import customerRoutes from "./customer.route";
import transRoute from "./transaction.route";
import bankRoutes from "./bank.route";
import FileRoute from "./file.route";
import kycRoute from "./kyc.route";

const initRoutes = (baseRoute: string, app: Express) => {
	app.use(`${baseRoute}/customers`, customerRoutes);
	app.use(`${baseRoute}/auth`, authRoute);
	app.use(`${baseRoute}/transactions`, transRoute);
	app.use(`${baseRoute}/banks`, bankRoutes);
	app.use(`${baseRoute}/file`, FileRoute);
	app.use(`${baseRoute}/kyc`, kycRoute);
};

export default initRoutes;
