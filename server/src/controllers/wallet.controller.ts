import { Request, Response } from "express";
import { z } from "zod";
import { TypedRequestBody, TypedRequestQuery } from "../configs/requests";
import { AppError, ERROR_CODES } from "../utils/errors";
import db from "../configs/db";
import { WalletType } from "../configs/types";
import { WalletSchema } from "../configs/zod";

export const addWallet = async (req: Request, res: Response) => {
	const request = req as TypedRequestBody<WalletType>;
	const user = request.user;
	//check if admin
	if (!user || user.role !== "sxadmin")
		throw new AppError(
			ERROR_CODES.USER_NOT_AUTHORIZED,
			"Unauthorized",
			403
		);

	//validate address
	const zodResponse = WalletSchema.safeParse(req.body);
	if (zodResponse.error) throw zodResponse;

	//add wallet to db
	const wallet = await db.walletAddress.create({
		data: {
			...zodResponse.data,
		},
	});

	//return response
	res.json({
		success: true,
		message: "Wallet was created successfully",
	});
};

export const fetchWallets = async (req: Request, res: Response) => {
	//get all wallets
	const result = await db.walletAddress.findMany({
		where: {
			isActive: true,
		},
	});

	res.status(200).json({
		success: true,
		message: "Ok",
		data: result,
	});
};

export const fetchRandomWalletAddress = async (req: Request, res: Response) => {
	const request = req as TypedRequestQuery<{
		crypto: string;
		network: string;
	}>;

	if (!request.query.crypto || !request.query.network)
		throw new AppError(
			ERROR_CODES.VALIDATION_MISSING_FIELD,
			"Please specify a crypto and network",
			400
		);

	//get all wallets
	const result = await db.walletAddress.findMany({
		where: {
			crypto: request.query.crypto,
			network: request.query.network,
			isActive: true,
		},
	});

	res.status(200).json({
		success: true,
		message: "Ok",
		data: result,
	});
};

export const manageWallet = async (req: Request, res: Response) => {
	//validate if its admins work
	const request = req as TypedRequestQuery<{
		id: string;
		action: "activate" | "deactivate";
	}>;
	const user = request.user;
	const id = request.query.id;
	const action = request.query.action;

	if (!id)
		throw new AppError(
			ERROR_CODES.VALIDATION_MISSING_FIELD,
			"ID is missing",
			400
		);

	if (!action || (action !== "activate" && action !== "deactivate"))
		throw new AppError(
			ERROR_CODES.VALIDATION_INVALID_TYPE,
			"Please specify an action",
			400
		);

	if (!user || user.role !== "sxadmin")
		throw new AppError(
			ERROR_CODES.VALIDATION_UNAUTHORIZED,
			"Unauthorized",
			403
		);

	//get all wallets
	const result = await db.walletAddress.update({
		data: {
			isActive: action == "activate",
		},
		where: {
			id,
		},
	});

	res.status(200).json({
		success: true,
		message: `Wallet was ${action}d successfully`,
	});
};
