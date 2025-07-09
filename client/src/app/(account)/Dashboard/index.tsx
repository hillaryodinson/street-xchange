import { ServiceCard } from "@/components/site/service-card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import { Gift, Plane, Verified, Wallet } from "lucide-react";

import "@/backend.css";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useQueries } from "@tanstack/react-query";
import { ApiResponse, Transaction } from "@/utils/types";
import moment from "moment";
import api from "@/utils/api";

const DashboardPage = () => {
	const user = useAuthStore((state) => state.user);
	const isVerified = useAuthStore((state) => state.isVerified);

	const [{ data: transactions }, { data: accountOverview }] = useQueries({
		queries: [
			{
				queryKey: ["fetch_transactions"],
				queryFn: async () => {
					const response = await api.get("/transactions/me");
					const result = response.data as ApiResponse<Transaction[]>;

					console.log(result);
					return result.data;
				},
			},
			{
				queryKey: ["fetch_account_overview"],
				queryFn: async () => {
					const response = await api.get("/account/overview");
					const result = response.data as ApiResponse<any>;
					return result.data;
				},
			},
		],
	});

	const getTypeIcon = (type: Transaction["transactionType"]) => {
		switch (type.toLowerCase()) {
			case "flight":
				return <Plane className="h-4 w-4 text-primary" />;
			case "crypto":
				return <Wallet className="h-4 w-4 text-primary" />;
			case "gift_card":
				return <Gift className="h-4 w-4 text-primary" />;
		}
	};

	return (
		<div className="flex flex-col gap-8">
			{isVerified == "not-verified" ? (
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Welcome, {user && user.firstname}
					</h1>
					<p className="text-muted-foreground">
						Please verify your account to access all features. Click
						the button to start.{" "}
						<Link
							to="/my-profile"
							className={cn(
								buttonVariants({
									variant: "default",
									size: "sm",
								})
							)}>
							<Verified />
							Get Started
						</Link>
					</p>
				</div>
			) : (
				<>
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Welcome back, {user && user.firstname}
						</h1>
						<p className="text-muted-foreground">
							Here's what you can do on your dashboard today.
						</p>
					</div>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<ServiceCard
							icon={<Plane className="h-6 w-6" />}
							title="Book Flights"
							description="Search and book flights to any destination worldwide."
							linkText="Book Now"
							linkHref="/customer-dashboard/flights"
						/>

						<ServiceCard
							icon={<Wallet className="h-6 w-6" />}
							title="Sell Cryptocurrency"
							description="Convert your crypto assets to cash at competitive rates."
							linkText="Sell Crypto"
							linkHref="/customer-dashboard/crypto"
						/>

						<ServiceCard
							icon={<Gift className="h-6 w-6" />}
							title="Sell Gift Cards"
							description="Exchange your gift cards for cash instantly."
							linkText="Sell Cards"
							linkHref="/customer-dashboard/giftcards"
						/>
					</div>
				</>
			)}

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="flex flex-col items-between">
					<CardHeader>
						<CardTitle>Recent Transactions</CardTitle>
						<CardDescription>
							Your recent activity on Xchange
						</CardDescription>
					</CardHeader>
					{transactions && transactions.length > 0 ? (
						<>
							<CardContent className="flex-1">
								<div className="space-y-4">
									{transactions &&
										transactions.map(
											(tranx: Transaction) => (
												<div className="flex items-center justify-between border-b pb-4">
													<div className="flex items-center gap-4">
														<div className="rounded-full bg-primary/10 p-2 hidden lg:block">
															{getTypeIcon(
																tranx.transactionType
															)}
														</div>
														<div className="flex flex-col ">
															<p className="font-medium text-sm">
																{
																	tranx.description
																}
															</p>
															<p className="text-xs text-muted-foreground">
																{moment(
																	tranx.createdDate
																).from(
																	moment()
																)}
															</p>
														</div>
													</div>
													<p className="text-sm">
														{tranx.status}
													</p>
												</div>
											)
										)}
								</div>
							</CardContent>
							<CardFooter>
								<Link
									to="/customer-dashboard/transactions"
									className={cn(
										buttonVariants({
											variant: "outline",
											size: "sm",
										})
									)}>
									View All Transactions
								</Link>
							</CardFooter>
						</>
					) : (
						<CardContent>
							<p className=" text-sm">
								No recent transactions found.
							</p>
						</CardContent>
					)}
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Account Overview</CardTitle>
						<CardDescription>
							Your account status and balance
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<p className="text-sm font-medium leading-none">
								Available Balance
							</p>
							<p className="text-3xl font-bold">
								{accountOverview?.wallet?.balance ?? 0}
							</p>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<p className="text-sm font-medium leading-none text-muted-foreground">
									Referals
								</p>
								<p className="text-xl font-bold">Coming soon</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium leading-none text-muted-foreground">
									Pending Withdrawals
								</p>
								<p className="text-xl font-bold">
									{accountOverview?.transaction
										?.pendingWithdrawalCounts ?? 0}
								</p>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full">Withdraw Funds</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default DashboardPage;
