import authRoute from "./auth.route";
import type { Express } from "express-serve-static-core";
import customerRoutes from "./customer.route";
import transRoute from "./transaction.route";
import bankRoutes from "./bank.route";
import FileRoute from "./file.route";
import kycRoute from "./kyc.route";
import walletRoute from "./wallet.route";
import settingRoute from "./setting.route";

const initRoutes = (baseRoute: string, app: Express) => {
	app.use(`${baseRoute}/customers`, customerRoutes);
	app.use(`${baseRoute}/auth`, authRoute);
	app.use(`${baseRoute}/transactions`, transRoute);
	app.use(`${baseRoute}/banks`, bankRoutes);
	app.use(`${baseRoute}/file`, FileRoute);
	app.use(`${baseRoute}/kyc`, kycRoute);
	app.use(`${baseRoute}/wallets`, walletRoute);
	app.use(`${baseRoute}/settings`, settingRoute);
};

export default initRoutes;
