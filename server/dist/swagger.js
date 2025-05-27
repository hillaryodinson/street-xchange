"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "StreetXchange API",
            version: "1.0.0",
            description: "StreetXchange API documentation",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Development server",
            },
        ],
        tags: [
            {
                name: "Authentication",
                description: "Authentication related endpoints",
            },
            {
                name: "File",
                description: "File and upload related endpoints",
            },
            {
                name: "User",
                description: "User related endpoints",
            },
            {
                name: "KYC Verification",
                description: "Endpoints related to KYC verification processes",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        firstname: {
                            type: "string",
                            example: "Jane",
                            description: "First name of the user",
                        },
                        middlename: {
                            type: "string",
                            example: "Samuel",
                            description: "Middle name of the user",
                        },
                        surname: {
                            type: "string",
                            example: "Smith",
                            description: "Surname of the user",
                        },
                        email: {
                            type: "string",
                            example: "jane.samuel@gmail.com",
                            description: "The email address of the user",
                        },
                        role: {
                            type: "string",
                            enum: ["customer"],
                            example: "customer",
                            description: "The role of the user",
                        },
                        residentialAddress: {
                            type: "string",
                            example: "123 Main St, Springfield",
                            description: "The residential address of the user",
                        },
                        phoneNo: {
                            type: "string",
                            example: "+1234567890",
                            description: "The phone number of the user",
                        },
                        dateOfBirth: {
                            type: "string",
                            format: "date",
                            example: "1990-01-01",
                            description: "The date of birth of the user in YYYY-MM-DD format",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
