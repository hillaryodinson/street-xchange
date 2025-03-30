import authRoute from "./auth.route";
import type { Express } from "express-serve-static-core";
import customerRoutes from "./customer.route";

const initRoutes = (baseRoute: string, app: Express) => {
	app.use(`${baseRoute}/customers`, customerRoutes);
	app.use(`${baseRoute}/auth`, authRoute);
};

export default initRoutes;
