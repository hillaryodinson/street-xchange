import cron from "node-cron";
import prisma from "../db";
import { Queue } from "bullmq";

const queue = new Queue("mail", {
	connection: {
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT) || 6379,
		password: process.env.REDIS_PASSWORD,
		tls: process.env.REDIS_TLS === "true" ? {} : undefined,
	},
});

cron.schedule("*/2 * * * *", async () => {
	// every 2 minutes
	const pending = await prisma.mail.findMany({
		where: { status: "pending" },
		take: 50,
	});
	for (const m of pending) {
		try {
			await queue.add(
				"sendMail",
				{
					to: m.to,
					from: m.from,
					subject: m.subject,
					template: m.template,
					context: m.context,
				},
				{ attempts: 5, backoff: { type: "exponential", delay: 60_000 } }
			);

			await prisma.mail.update({
				where: { id: m.id },
				data: { status: "queued" },
			});
		} catch (err) {
			// still failing to enqueue — leave for next run
			console.error("Re-enqueue failed:", err);
		}
	}
});
