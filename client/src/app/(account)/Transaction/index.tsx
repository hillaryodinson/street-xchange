import { useState } from "react";
import {
	ArrowLeft,
	ArrowUpDown,
	Clock,
	Download,
	Gift,
	Plane,
	Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { TransactionsTable } from "@/components/site/transaction-table";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { ApiResponse, Transaction } from "@/utils/types";

export function TransactionsHistory() {
	const [activeTab, setActiveTab] = useState("all");

	const { data: allTransactions } = useQuery({
		queryKey: ["fetch_transactions"],
		queryFn: async () => {
			const response = await api.get("/transactions/me");
			const result = response.data as ApiResponse<Transaction[]>;
			if (result.success) {
				return result.data;
			}
			return [];
		},
	});

	// Filter transactions based on active tab
	const getFilteredTransactions = () => {
		switch (activeTab) {
			case "flights":
				return allTransactions?.filter(
					(tx) => tx.transType.toLowerCase() === "flight"
				);
			case "crypto":
				return allTransactions?.filter(
					(tx) => tx.transType.toLowerCase() === "crypto sell"
				);
			case "giftcards":
				return allTransactions?.filter(
					(tx) => tx.transType.toLowerCase() === "giftcard"
				);
			default:
				return allTransactions;
		}
	};

	const filteredTransactions = getFilteredTransactions();

	return (
		<div className="mx-auto max-w-6xl">
			<div className="mb-6">
				<Link
					to="/dashboard"
					className="inline-flex items-center text-primary hover:underline">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Dashboard
				</Link>
			</div>

			<div className="flex items-center gap-4 mb-8">
				<div className="rounded-full bg-primary/10 p-3">
					<Clock className="h-6 w-6 text-primary" />
				</div>
				<div>
					<h1 className="text-3xl font-bold">Transaction History</h1>
					<p className="text-muted-foreground">
						View and manage your transaction history
					</p>
				</div>
			</div>

			<Card>
				<CardHeader className="pb-3">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<CardTitle>Transactions</CardTitle>
							<CardDescription>
								Your recent transactions across all services
							</CardDescription>
						</div>
						<Button
							variant="outline"
							size="sm"
							className="w-full sm:w-auto">
							<Download className="mr-2 h-4 w-4" />
							Export
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs
						defaultValue="all"
						value={activeTab}
						onValueChange={setActiveTab}>
						<TabsList className="mb-6">
							<TabsTrigger
								value="all"
								className="flex items-center gap-2">
								<ArrowUpDown className="h-4 w-4" />
								<span>All Transactions</span>
							</TabsTrigger>
							<TabsTrigger
								value="flights"
								className="flex items-center gap-2">
								<Plane className="h-4 w-4" />
								<span>Flights</span>
							</TabsTrigger>
							<TabsTrigger
								value="crypto"
								className="flex items-center gap-2">
								<Wallet className="h-4 w-4" />
								<span>Crypto</span>
							</TabsTrigger>
							<TabsTrigger
								value="giftcards"
								className="flex items-center gap-2">
								<Gift className="h-4 w-4" />
								<span>Gift Cards</span>
							</TabsTrigger>
						</TabsList>

						<TabsContent value="all">
							<TransactionsTable
								transactions={filteredTransactions || []}
							/>
						</TabsContent>
						<TabsContent value="flights">
							<TransactionsTable
								transactions={filteredTransactions || []}
							/>
						</TabsContent>
						<TabsContent value="crypto">
							<TransactionsTable
								transactions={filteredTransactions || []}
							/>
						</TabsContent>
						<TabsContent value="giftcards">
							<TransactionsTable
								transactions={filteredTransactions || []}
							/>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
