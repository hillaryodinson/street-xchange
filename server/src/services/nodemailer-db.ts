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

	constructor(db: PrismaClient) {
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

	async dispatchMail(options: MailOptions) {
		this._transporter.use("compile", hbs(this._hbsOptions));

		if (!this._db) {
			throw new Error("Database not initialized");
		}

		try {
			const info = await this._transporter.sendMail(options);
			await this._db.mail.create({
				data: {
					to: options.to,
					from: options.from,
					subject: options.subject,
					template: options.template,
					context: options.context,
					status: "sent",
				},
			});
			return info;
		} catch (err: any) {
			console.error("Error sending mail:", err.message);
			await this._db.mail.create({
				data: {
					to: options.to,
					from: options.from,
					subject: options.subject,
					template: options.template,
					context: options.context,
					status: "failed",
					error: err.message,
				},
			});
			return null;
		}
	}

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
			jobId,
		});
	}

	async sendOrQueue(mail: {
		to: string;
		from: string;
		subject: string;
		template: string;
		context: Record<string, any>;
	}) {
		// try Redis first
		try {
			await mailQueue.add("sendMail", mail, {
				attempts: 5,
				backoff: { type: "exponential", delay: 60 * 1000 }, // 1m initial
				removeOnComplete: { age: 3600, count: 1000 },
				removeOnFail: { age: 60 * 60 * 24, count: 1000 },
			});
			// mark as queued (optional)
			await this._db?.mail.create({
				data: {
					to: mail.to,
					from: mail.from,
					subject: mail.subject,
					template: mail.template,
					context: mail.context,
					status: "queued",
				},
			});
			return { ok: true, queued: true };
		} catch (err: any) {
			// Redis down or add failed -> fallback to DB
			console.error(
				"Failed to add job to Redis, falling back to DB:",
				err.message || err
			);
			await this._db?.mail.create({
				data: {
					to: mail.to,
					from: mail.from,
					subject: mail.subject,
					template: mail.template,
					context: mail.context,
					status: "pending",
				},
			});
			return { ok: true, fallbackToDB: true };
		}
	}
}
