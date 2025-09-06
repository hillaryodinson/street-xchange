import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { MailJob, MailJobSchema } from "../configs/types";
import { mailQueue } from "../configs/mail/queue";

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
		console.log(
			"sending mail: ",
			process.env.MAIL_USER,
			process.env.MAIL_PASS,
			process.env.MAIL_HOST
		);
		this._transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST || "sandbox.smtp.mailtrap.io",
			port: Number(process.env.MAIL_PORT) || 587,
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
			return await this._transporter.sendMail(options, (err, info) => {
				if (err) {
					console.log("Error occurred while sending mail: ", err);
				} else {
					console.log("Message sent: %s", info.messageId);
				}
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async enqueueMail(job: MailJob) {
		const parsed = MailJobSchema.parse(job);

		// Optional: idempotency via dedupeKey
		const jobId = parsed.dedupeKey;

		return mailQueue.add("send", parsed, {
			jobId, // if provided, duplicate adds are ignored
			// You can also schedule delayed mails:
			// delay: 0
		});
	}
}
