"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./configs/db");
const app = (0, app_1.initApp)();
(0, db_1.populateDB)();
app.listen(3000, () => console.log("Server running on port 3000"));
