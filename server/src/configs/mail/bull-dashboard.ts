import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { mailQueue } from "./queue";
import { Express } from "express";
import "./worker";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
	queues: [new BullMQAdapter(mailQueue)],
	serverAdapter,
});

export const createBullDashboard = (app: Express) => {
	console.log("✅ Bull Dashboard service running!");
	app.use("/admin/queues", serverAdapter.getRouter());
	//if (process.env.NODE_ENV === "production") {
	const originalWarn = console.warn;
	console.warn = (...args: any[]) => {
		if (
			typeof args[0] === "string" &&
			args[0].includes("Eviction policy is optimistic-volatile")
		) {
			return;
		}
		originalWarn(...args);
	};
	//S}
};
