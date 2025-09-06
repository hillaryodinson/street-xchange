import IORedis from "ioredis";

const REDIS_URL =
	process.env.REDIS_URL ||
	"rediss://default:AaYFAAIncDE2ZTg5ZDY4YjE4MDk0YTU2YTkwZTk0YzJiOTFkOTliY3AxNDI1MDE@relieved-boa-42501.upstash.io:6379";

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
