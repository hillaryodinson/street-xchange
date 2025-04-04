import { TransactionsTable } from "@/components/site/transaction-table";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { ArrowLeft, Clock, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BankPage = () => {
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
							<PlusCircle className="mr-2 h-4 w-4" />
							Add Bank
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<TransactionsTable transactions={[]} />
				</CardContent>
			</Card>
		</div>
	);
};

export default BankPage;
