import { Request, Response, Router } from "express";
import { NodemailerDB } from "../services/nodemailer-db";

const healthCheckRoute = Router();

healthCheckRoute.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "Server is running",
		timestamp: new Date().toISOString(),
	});
});
healthCheckRoute.get("/mail-check", async (req: Request, res: Response) => {
	try {
		const mailer = new NodemailerDB(null);

		// Check if the mailer is properly configured
		const sent = await mailer.sendMail({
			to: "insanedude.developer@gmail.com",
			from: process.env.APP_NO_REPLY || "<noreply@streetxchange.com>",
			subject: "Health Check Mail",
			template: "health_check",
			context: {},
		});

		console.log("Email was sent: ", sent);

		res.status(200).json({
			success: true,
			message: "Mail was sent",
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while sending health check email",
			error: (error as Error).message,
			timestamp: new Date().toISOString(),
		});
	}
});

healthCheckRoute.get("/run-checks", (req, res) => {
	const mailer = new NodemailerDB(null);

	mailer.sendMail({
		to: "hclinton007@gmail.com",
		from: process.env.APP_NO_REPLY || "<no-reply@example.com>",
		subject: "Health Check Mail",
		template: "health_check",
		context: {},
	});
	res.status(200).json({
		success: true,
		message: "Server is running",
		timestamp: new Date().toISOString(),
	});
});

export default healthCheckRoute;
