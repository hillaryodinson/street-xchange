import { Request, Response } from "express";
import { TypedRequest, TypedRequestBody } from "../configs/requests";
import { AppError, ERROR_CODES } from "../utils/errors";
import db from "../configs/db";
import { SettingColunns } from "../configs/constants";

export const updateSetting = async (req: Request, res: Response) => {
	const request = req as TypedRequest<{ setting: string }>;

	// Ensure the user is an administrator
	if (!request.user || request.user.role !== "sxadmin") {
		throw new AppError(
			ERROR_CODES.USER_NOT_AUTHORIZED,
			"You are not authorized to update settings.",
			403
		);
	}

	// Handle specific settings based on the query parameter
	const { setting } = request.query;
	if (!setting) {
		throw new AppError(
			ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE,
			"Setting parameter is required.",
			400
		);
	}

	switch (setting) {
		case "rate":
			const amount = (req as TypedRequestBody<{ amount: number }>).body
				.amount;
			await updateRate(amount);
			break;
		default:
			throw new AppError(
				ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE,
				`Unsupported setting: ${setting}`,
				400
			);
	}

	res.status(200).json({
		success: true,
		message: "Setting was updated successfully",
	});
};

export const fetchSetting = async (req: Request, res: Response) => {
	const { setting } = req.query;

	if (!setting) {
		throw new AppError(
			ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE,
			"Setting parameter is required.",
			400
		);
	}

	const result = await db.setting.findUnique({
		where: { key: setting as string },
	});

	if (!result) {
		throw new AppError(
			ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE,
			`Setting not found: ${setting}`,
			404
		);
	}

	res.status(200).json({
		success: true,
		message: "Setting fetched successfully",
		data: result.value,
	});
};

//Private methods
const updateRate = async (amount: number) => {
	if (amount) {
		throw new AppError(
			ERROR_CODES.VALIDATION_UNSUPPORTED_VALUE,
			"Amount is required to update the rate.",
			400
		);
	}

	return await db.setting.update({
		where: { key: SettingColunns.NGN_RATE },
		data: { value: amount.toString() },
	});
};
