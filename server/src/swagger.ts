import swaggerJsDoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Apartu API",
			version: "1.0.0",
			description: "Apartu API documentation",
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
						name: {
							type: "string",
							example: "Jane Samuel",
							description: "Full name of the user",
						},
						email: {
							type: "string",
							example: "jane.samuel@gmail.com",
							description: "The email address of the user",
						},
						password: {
							type: "string",
							example: "password",
							description: "The password of the user",
						},
						role: {
							type: "string",
							enum: ["landlord", "caretaker", "admin", "tenant"],
							example: "tenant",
							description: "The role of the user",
						},
					},
				},
			},
		},
	},
	apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsDoc(options);
