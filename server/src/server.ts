import { initApp } from "./app";
import { populateDB } from "./configs/db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const app = initApp();
populateDB();
app.listen(PORT, "0.0.0.0", () =>
	console.log("Server running on port " + PORT)
);
