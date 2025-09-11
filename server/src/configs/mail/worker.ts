import { Worker, Queue, JobsOptions } from "bullmq";

import { MAIL_QUEUE_NAME } from "./queue";
import { MailJob } from "../types";
import { redis } from "../redis";
import { NodemailerDB } from "../../services/nodemailer-db";
import db from "../db";

// Optional: a dead-letter queue for permanently failed jobs
const DLQ_NAME = "mail-dlq";
const dlq = new Queue(DLQ_NAME, { connection: redis });

console.log("✅ Mail worker service running!");
const concurrency = Number(process.env.MAIL_WORKER_CONCURRENCY || 5);

const worker = new Worker<MailJob>(
	MAIL_QUEUE_NAME,
	async (job) => {
		const { to, from, subject, template, context } = job.data;
		const mailer = new NodemailerDB(db);

		await mailer.sendMail({
			from,
			to,
			subject,
			template,
			context,
		});

		// optionally mark DB row sent (if you created one when queued)
		await db.mail.create({
			data: {
				to,
				from,
				subject,
				template,
				context,
				status: "sent",
			},
		});

		// return something to store in BullMQ result
		return { deliveredTo: to };
	},
	{
		connection: redis,
		concurrency,
		// lockDuration can be adjusted if your mails take longer
		lockDuration: 60_000,
	}
);

// When a job exhausts retries, move to DLQ for later inspection/manual retry
worker.on("failed", async (job, err) => {
	if (!job) return;
	const opts = job.opts as JobsOptions;
	const attemptsMade = job.attemptsMade || 0;
	const maxAttempts = (opts.attempts as number) || 1;

	if (attemptsMade >= maxAttempts) {
		await dlq.add("dead", {
			original: job.data,
			reason: err?.message || "unknown",
		});
	}
	console.error(
		`[worker][failed] id=${job.id} attempts=${attemptsMade}/${maxAttempts} reason=${err?.message}`
	);

	await db.mail.create({
		data: {
			to: job.data.to,
			from: job.data.from,
			subject: job.data.subject,
			template: job.data.template,
			context: job.data.context,
			status: "failed",
			error: err?.message || "unknown",
		},
	});
});

worker.on("completed", (job) => {
	console.log(`[worker][completed] id=${job.id} ->`, job.returnvalue);
});

// Graceful shutdown
process.on("SIGINT", async () => {
	console.log("Shutting down mail worker...");
	await worker.close();
	await dlq.close();
	process.exit(0);
});
