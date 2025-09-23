import db from "../../configs/db";
import { TypedRequestQuery } from "../../configs/requests";
import { Request, Response } from "express";

export const getAllTransactions = async (req: Request, res: Response) => {
	const request = req as TypedRequestQuery<{
		page?: string;
		limit?: string;
	}>;

	const page = parseInt(request.query.page ?? "1");
	const limit = parseInt(request.query.limit ?? "10");

	try {
		const transactions = await db.transaction.findMany({
			skip: (page - 1) * limit,
			take: limit,
		});

		const total = await db.transaction.count();

		res.json({
			transactions,
			meta: {
				total,
				page,
				lastPage: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		console.error("Error fetching transactions:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
