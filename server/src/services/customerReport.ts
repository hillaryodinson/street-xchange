import db from "../configs/db";
import { subMonths, startOfMonth } from "date-fns";

export async function getKycApprovalRateThisMonth() {
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

	const totalPendingApproval = await db.kyc.count({
		where: {
			status: "pending",
		},
	});

	const approvalRate =
		totalReviewed === 0 ? 0 : (totalApproved / totalReviewed) * 100;

	const customerReport = await getCustomerGrowthReport();

	return {
		customerReport,
		totalApproved,
		totalPendingApproval,
		totalReviewed,
		approvalRate: approvalRate.toFixed(2) + "%",
	};
}

export const getCustomerGrowthReport = async () => {
	// Date range calculations
	const now = new Date();
	const startOfThisMonth = startOfMonth(now);
	const startOfLastMonth = subMonths(startOfThisMonth, 1);
	const startOfTwoMonthsAgo = subMonths(startOfThisMonth, 2);

	// Get counts
	const lastMonthCount = await db.user.count({
		where: {
			createdAt: {
				gte: startOfLastMonth,
				lt: startOfThisMonth,
			},
		},
	});

	const prevMonthCount = await db.user.count({
		where: {
			createdAt: {
				gte: startOfTwoMonthsAgo,
				lt: startOfLastMonth,
			},
		},
	});

	const CountAllCustomers = await db.user.count();

	// Calculate growth percentage
	let growthPercentage: number | null = null;
	let growthStatus: "growth" | "loss" | "no change" | "unknown" = "unknown";

	if (prevMonthCount > 0) {
		const diff = lastMonthCount - prevMonthCount;
		growthPercentage = (diff / prevMonthCount) * 100;

		if (diff > 0) {
			growthStatus = "growth";
		} else if (diff < 0) {
			growthStatus = "loss";
		} else {
			growthStatus = "no change";
		}
	} else {
		// No data from previous month to compare against
		growthPercentage = null;
		growthStatus = "unknown";
	}

	return {
		totalCustomers: CountAllCustomers,
		lastMonthTotalSignupCustomers: lastMonthCount,
		prevMonthTotalCustomers: prevMonthCount,
		growthPercentage: growthPercentage?.toFixed(2) ?? "0",
		growthStatus,
	};
};
