import { Request, Response } from "express";
import { kycSchema } from "../configs/zod";
import {
	CustomResponse,
	TypedRequestBody,
	TypedRequestQuery,
	TypedResponse,
} from "../configs/requests";
import { KYCType } from "../configs/types";
import { AppError, ERROR_CODES } from "../utils/errors";
import db from "../configs/db";

export const addKYC = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	//get the customer
	const request = req as TypedRequestBody<KYCType>;
	const customer = request.user?.id;

	if (!customer)
		throw new AppError(
			ERROR_CODES.USER_NOT_AUTHORIZED,
			"Unauthorized",
			401
		);

	//validate the KYC info
	const zodResponse = kycSchema.safeParse(req.body);
	if (zodResponse.error) throw zodResponse;

	//create KYC request in db
	const kycData = await db.kyc.create({
		data: {
			...zodResponse.data,
			customer: {
				connect: {
					id: customer,
				},
			},
		},
	});

	//return success message
	res.status(201).json({
		success: true,
		message: "KYC submitted verification is ongoing",
	});
};

export const processKYCRequest = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	//get the request id from query
	const request = req as TypedRequestQuery<{
		id: string;
		action: "approve" | "decline";
	}>;
	const { id, action } = request.query;
	const user = request.user;

	if (action !== "approve" && action !== "decline")
		throw new AppError(
			ERROR_CODES.VALIDATION_INVALID_TYPE,
			"Invalid action type"
		);

	const resolution = {
		isVerified: action == "approve" ? 1 : 2,
		isApproved: action == "approve",
	};

	//check if the user is an admin
	if (!user || user.role !== "sxadmin")
		throw new AppError(
			ERROR_CODES.USER_NOT_AUTHORIZED,
			"Unauthorized",
			403
		);

	//check if kyc request exists
	const kyc = await db.kyc.findFirst({
		where: { id },
	});
	if (!kyc)
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"KYC record does not exist",
			400
		);

	//mark kyc as approved
	await db.kyc.update({
		data: {
			isApproved: resolution.isApproved,
		},
		where: {
			id,
		},
	});

	await db.user.update({
		where: {
			id: kyc.customerId,
		},
		data: {
			isVerified: resolution.isVerified,
		},
	});

	res.status(200).json({
		success: true,
		message: "User KYC has been " + action + "d",
	});
};

export const listKYCRequests = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	//find out what type of list is being requested all | pending | failed | approved
	const request = req as TypedRequestQuery<{
		type: "all" | "pending" | "failed" | "approved";
	}>;
	const user = request.user;
	let type = request.query.type;
	let kycs = [];

	//check if the user is administrator
	if (!user || user.role !== "sxadmin") {
		throw new AppError(ERROR_CODES.USER_NOT_AUTHORIZED, "Unathorized", 403);
	}
	if (type == "pending") {
		//return the list
		kycs = await db.kyc.findMany({
			include: {
				customer: {
					select: {
						isVerified: true,
					},
				},
			},
			where: {
				isApproved: false,
				customer: {
					isVerified: 0,
				},
			},
		});
	} else if (type == "approved") {
		kycs = await db.kyc.findMany({
			where: {
				isApproved: true,
			},
		});
	} else if (type == "failed") {
		kycs = await db.kyc.findMany({
			include: {
				customer: {
					select: {
						isVerified: true,
					},
				},
			},
			where: {
				customer: {
					isVerified: 2,
				},
			},
		});
	} else {
		kycs = await db.kyc.findMany();
	}

	res.status(200).json({
		success: true,
		message: "Ok",
		data: kycs,
	});
};
