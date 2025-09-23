// get total revenue this month
// get total transactions this month
// get total users this month
// get total kyc verified users this month
// get total banks linked this month
// get total wallets created this month
// get total withdrawals this month
// get total deposits this month
// get total disputes this month
// get total gift card orders this month
// get total crypto orders this month
// get total flight bookings this month
// get total referral bonuses this month
// get total support tickets this month

import db from "../../configs/db";
import { TypedRequestQuery } from "../../configs/requests";
import { Request, Response } from "express";

export const getReport = async (req: Request, res: Response) => {
	const request = req as TypedRequestQuery<{
		month?: string; // format: YYYY-MM
	}>;
	const month = request.query.month;

	if (!month) {
		return res.status(400).json({
			error: "Month query parameter is required in YYYY-MM format",
		});
	}

	const startDate = new Date(`${month}-01T00:00:00Z`);
	const endDate = new Date(startDate);
	endDate.setMonth(endDate.getMonth() + 1);

	try {
		const [
			totalRevenue,
			totalTransactions,
			totalUsers,
			totalKycVerifiedUsers,
			totalBanksLinked,
			// totalWalletsCreated,
			totalWithdrawals,
			totalDeposits,
			// totalDisputes,
			totalGiftCardOrders,
			totalCryptoOrders,
			totalFlightBookings,
			// totalReferralBonuses,
			// totalSupportTickets,
		] = await Promise.all([
			db.transaction
				.aggregate({
					_sum: { amount: true },
					where: {
						createdDate: {
							gte: startDate,
							lt: endDate,
						},
						status: "Completed",
					},
				})
				.then((result) => result._sum.amount || 0),
			db.transaction.count({
				where: {
					createdDate: {
						gte: startDate,
						lt: endDate,
					},
				},
			}),
			db.user.count({
				where: {
					createdAt: {
						gte: startDate,
						lt: endDate,
					},
				},
			}),
			db.user.count({
				where: {
					isVerified: 1,
					createdAt: {
						gte: startDate,
						lt: endDate,
					},
				},
			}),
			db.customerBank.count({
				where: {
					createdAt: {
						gte: startDate,
						lt: endDate,
					},
				},
			}),
			// db.walle.count({
			// 	where: {
			// 		createdAt: {
			// 			gte: startDate,
			// 			lt: endDate,
			// 		},
			// 	},
			// }),
			db.transaction.count({
				where: {
					transactionType: "WITHDRAWAL",
					createdDate: {
						gte: startDate,
						lt: endDate,
					},
				},
			}),
			db.transaction.count({
				where: {
					transactionType: "DEPOSIT",
					createdDate: {
						gte: startDate,
						lt: endDate,
					},
				},
			}),
			// db.dispute.count({
			// 	where: {
			// 		createdAt: {
			// 			gte: startDate,
			// 			lt: endDate,
			// 		},
			// 	},
			// }),
			db.giftCardTransaction.count({
				where: {
					createdAt: {
						gte: startDate,
						lt: endDate,
					},
				},
			}),
			db.cryptoTransaction.count({
				where: {
					Transaction: {
						some: {
							createdDate: {
								gte: startDate,
								lt: endDate,
							},
						},
					},
				},
			}),
			db.flightTransaction.count({
				where: {
					Transaction: {
						some: {
							createdDate: {
								gte: startDate,
								lt: endDate,
							},
						},
					},
				},
			}),
			// db.referralBonus.count({
			// 	where: {
			// 		createdAt: {
			// 			gte: startDate,
			// 			lt: endDate,
			// 		},
			// 	},
			// }),
			// db.supportTicket.count({
			// 	where: {
			// 		createdAt: {
			// 			gte: startDate,
			// 			lt: endDate,
			// 		},
			// 	},
			// }),
		]);

		res.json({
			totalRevenue,
			totalTransactions,
			totalUsers,
			totalKycVerifiedUsers,
			totalBanksLinked,
			// totalWalletsCreated,
			totalWithdrawals,
			totalDeposits,
			// totalDisputes,
			totalGiftCardOrders,
			totalCryptoOrders,
			totalFlightBookings,
			// totalReferralBonuses,
			// totalSupportTickets,
		});
	} catch (error) {
		console.error("Error generating report:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

//chart data: get total flights booked per day, per week and per month for chart
//chart data: get percentage of giftcard type gotten by giftcard type
