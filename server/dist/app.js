"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middlewares/middleware");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const default_1 = __importDefault(require("./routes/default"));
const initApp = () => {
    const app = (0, express_1.default)();
    app.set("view engine", "ejs");
    // Serve static files (images, etc.) from the 'uploads' folder
    app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../", "uploads")));
    app.use("/temp", express_1.default.static(path_1.default.join(__dirname, "../", "temp")));
    app.set("views", path_1.default.join(__dirname, "/views"));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        xDownloadOptions: false,
    }));
    app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }));
    if (!fs_1.default.existsSync("uploads")) {
        fs_1.default.mkdirSync("uploads");
        fs_1.default.mkdirSync("uploads/original");
    }
    app.use(middleware_1.limiter);
    app.get("/", (req, res) => {
        res.render("index");
    });
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
    (0, default_1.default)("/api", app);
    app.use(middleware_1.errorHandler);
    return app;
};
exports.initApp = initApp;
