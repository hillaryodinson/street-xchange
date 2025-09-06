import IORedis from "ioredis";

const { REDIS_URL } = process.env;

if (!REDIS_URL) {
	throw new Error("REDIS_URL is required");
}

// ioredis auto-enables TLS when using rediss://
console.log("🛜 Connecting to Redis at ", REDIS_URL);
export const redis = new IORedis(REDIS_URL, {
	maxRetriesPerRequest: null, // BullMQ recommendation
	enableReadyCheck: true,
});
redis.on("error", (err) => {
	console.error("Redis error: ", err);
});
redis.on("connect", () => {
	console.log("✅ Connected to Redis @ upstash.com");
});
