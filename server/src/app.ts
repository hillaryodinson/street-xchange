import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import cors from "cors";
import { errorHandler, limiter } from "./middlewares/middleware";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import initRoutes from "./routes/default";

export const initApp = () => {
	const app = express();
	app.set("view engine", "ejs");

	// Serve static files (images, etc.) from the 'uploads' folder
	app.use("/uploads", express.static(path.join(__dirname, "../", "uploads")));
	app.use("/temp", express.static(path.join(__dirname, "../", "temp")));
	app.set("views", path.join(__dirname, "/views"));
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(bodyParser.json());
	app.use(
		helmet({
			contentSecurityPolicy: false,
			xDownloadOptions: false,
		})
	);
	app.use(
		cors({
			origin: "*",
			methods: ["GET", "POST", "PUT", "DELETE"],
			allowedHeaders: ["Content-Type", "Authorization"],
		})
	);

	if (!fs.existsSync("uploads")) {
		fs.mkdirSync("uploads");
		fs.mkdirSync("uploads/original");
	}

	app.use(limiter);

	app.get("/", (req: Request, res: Response) => {
		res.render("index");
	});

	app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
	initRoutes("/api", app);

	app.use(errorHandler);
	return app;
};
