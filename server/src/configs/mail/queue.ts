import { Queue, QueueEvents } from "bullmq";
import { redis } from "../redis";

export const MAIL_QUEUE_NAME = "mail";

export const mailQueue = new Queue(MAIL_QUEUE_NAME, {
	connection: redis,
	defaultJobOptions: {
		attempts: 5,
		backoff: { type: "exponential", delay: 15_000 }, // 15s, 30s, 60s...
		removeOnComplete: 2000, // keep last 5k jobs for inspection
		removeOnFail: false, // keep fails for DLQ inspection
	},
});

export const mailEvents = new QueueEvents(MAIL_QUEUE_NAME, {
	connection: redis,
});
mailEvents.on("failed", ({ jobId, failedReason }) => {
	console.error(`[mail][failed] job=${jobId} reason=${failedReason}`);
});
mailEvents.on("completed", ({ jobId }) => {
	console.log(`[mail][completed] job=${jobId}`);
});
