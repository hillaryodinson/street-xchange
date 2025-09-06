import { initApp } from "./app";
import { populateDB } from "./configs/db";
import dotenv from "dotenv";
import { createBullDashboard } from "./configs/mail/bull-dashboard";
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const app = initApp();

populateDB();
createBullDashboard(app);
app.listen(PORT, () => console.log("Server running on port " + PORT));
