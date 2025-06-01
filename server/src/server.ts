import { initApp } from "./app";
import { populateDB } from "./configs/db";
import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;
if (!PORT) {
	throw new Error("PORT environment variable is not set");
}

const app = initApp();
populateDB();
app.listen(PORT, () => console.log("Server running on port " + PORT));
