import { initApp } from "./app";
import { populateDB } from "./configs/db";

const app = initApp();
populateDB();
app.listen(3000, () => console.log("Server running on port 3000"));
