import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

interface MailOptions {
	context: Record<string, any>;
	to: string;
	subject: string;
	template: string;
	from: string;
}

export class NodemailerDB {
	private _db;
	private _transporter;
	private _hbsOptions;

	constructor(db: PrismaClient | null) {
		if (db) {
			this._db = db;
		}
		this._transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST || "sandbox.smtp.mailtrap.io",
			port: Number(process.env.MAIL_PORT) || 2525,
			secure: process.env.MAIL_SECURE === "true", // use SSL
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		} as nodemailer.TransportOptions);

		this._hbsOptions = {
			viewEngine: {
				defaultLayout: "template",
				layoutsDir: __dirname + "/../views/mails",
			},
			viewPath: __dirname + "/../views/mails",
		};
	}

	// async dispatchMail(
	// 	to: string,
	// 	subject: string,
	// 	template: string,
	// 	context: string,
	// 	from: string
	// ) {
	// 	//prepare the mail to be sent
	// 	await this._db.mail.create({
	// 		data: {
	// 			to,
	// 			subject,
	// 			content: JSON.stringify({
	// 				template,
	// 				context,
	// 			}),
	// 			from,
	// 		},
	// 	});
	// }

	async sendMail(options: MailOptions) {
		try {
			this._transporter.use("compile", hbs(this._hbsOptions));
			//send the mail
			await this._transporter.sendMail(options, (err, info) => {
				if (err) {
					console.log("Error occurred while sending mail: ", err);
				} else {
					console.log("Message sent: %s", info.messageId);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}
}
