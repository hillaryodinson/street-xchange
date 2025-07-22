import { Request } from "express";
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
import { moveImageToLive } from "../utils/helper";
import { ApprovalStatus } from "@prisma/client";

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

	//check if kyc is already existing for the customer.
	const userKyc = await db.kyc.findFirst({
		where: {
			customerId: customer,
		},
	});

	if (userKyc) {
		await db.kyc.update({
			where: { id: userKyc.id },
			data: {
				...zodResponse.data,
				status: ApprovalStatus.pending,
				customer: {
					update: {
						isVerified: 0,
					},
				},
			},
		});
	} else {
		//create KYC request in db
		await db.kyc.create({
			data: {
				...zodResponse.data,
				customer: {
					connect: {
						id: customer,
					},
				},
			},
		});
	}

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
		reason?: string;
	}>;
	const { id, action, reason } = request.query;
	const user = request.user;
	let frontUrl = null;
	let backUrl = undefined;

	if (action !== "approve" && action !== "decline")
		throw new AppError(
			ERROR_CODES.VALIDATION_INVALID_TYPE,
			"Invalid action type"
		);

	const resolution = {
		isVerified: action == "approve" ? 1 : 2,
		isApproved:
			action == "approve"
				? ApprovalStatus.approved
				: ApprovalStatus.declined,
		reason: action == "approve" ? reason : null,
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

	frontUrl = kyc?.frontimage;
	backUrl = kyc?.backimage;

	if (action == "approve") {
		const BASEURL = process.env.SERVER_URL || "http://localhost:3000";
		const newFrontPath = moveImageToLive(kyc.frontimage, kyc.customerId);
		frontUrl = `${BASEURL}/${newFrontPath}`;
		if (backUrl) {
			const newBackPath = moveImageToLive(backUrl, kyc.customerId);
			backUrl = `${BASEURL}/${newBackPath}`;
		}
	}

	//mark kyc as approved
	await db.kyc.update({
		data: {
			status: resolution.isApproved,
			declineReason: resolution.reason,
			frontimage: frontUrl,
			backimage: backUrl,
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
				status: ApprovalStatus.pending,
				customer: {
					isVerified: 0,
				},
			},
		});
	} else if (type == "approved") {
		kycs = await db.kyc.findMany({
			where: {
				status: ApprovalStatus.approved,
			},
		});
	} else if (type == "failed") {
		kycs = await db.kyc.findMany({
			where: {
				status: ApprovalStatus.declined,
			},
		});
	} else {
		kycs = await db.kyc.findMany();
	}

	res.status(200).json({
		success: true,
		message: "Ok",
		data: {
			dashdata: await getKycApprovalRateThisMonth(),
			kycs,
		},
	});
};

async function getKycApprovalRateThisMonth() {
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

	// Count only KYC decisions made (approved or declined)
	const totalReviewed = await db.kyc.count({
		where: {
			status: {
				in: ["approved", "declined"],
			},
			createdAt: {
				gte: startOfMonth,
				lt: endOfMonth,
			},
		},
	});

	const totalApproved = await db.kyc.count({
		where: {
			status: "approved",
			createdAt: {
				gte: startOfMonth,
				lt: endOfMonth,
			},
		},
	});

	const approvalRate =
		totalReviewed === 0 ? 0 : (totalApproved / totalReviewed) * 100;

	return {
		totalApproved,
		totalReviewed,
		approvalRate: approvalRate.toFixed(2) + "%",
	};
}
