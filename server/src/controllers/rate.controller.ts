import { Request, Response } from "express";
import db from "../configs/db";
import { SettingColunns } from "../configs/constants";

export const fetchRate = async (req: Request, res: Response) => {
	const rates = await db.setting.findUnique({
		where: {
			key: SettingColunns.NGN_RATE,
		},
	});

	res.status(200).json({
		success: true,
		message: "Rate fetched successfully",
		data: rates?.value,
	});
};
