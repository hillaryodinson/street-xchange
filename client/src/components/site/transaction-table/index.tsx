import { Check, Clock, Gift, Plane, Wallet } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Transaction } from "@/utils/types";

interface TransactionsTableProps {
	transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
	const getTypeIcon = (type: Transaction["type"]) => {
		switch (type) {
			case "flight":
				return <Plane className="h-4 w-4 text-blue-500" />;
			case "crypto":
				return <Wallet className="h-4 w-4 text-purple-500" />;
			case "giftcard":
				return <Gift className="h-4 w-4 text-amber-500" />;
		}
	};

	const getStatusBadge = (status: Transaction["status"]) => {
		switch (status) {
			case "completed":
				return (
					<div className="flex items-center gap-1">
						<Check className="h-3.5 w-3.5 text-green-500" />
						<span className="text-xs font-medium text-green-500">
							Completed
						</span>
					</div>
				);
			case "pending":
				return (
					<div className="flex items-center gap-1">
						<Clock className="h-3.5 w-3.5 text-amber-500" />
						<span className="text-xs font-medium text-amber-500">
							Pending
						</span>
					</div>
				);
			case "failed":
				return (
					<div className="flex items-center gap-1">
						<span className="h-1.5 w-1.5 rounded-full bg-red-500" />
						<span className="text-xs font-medium text-red-500">
							Failed
						</span>
					</div>
				);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	const formatAmount = (amount: number) => {
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		});

		return formatter.format(amount);
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted/50">
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="text-right">Amount</TableHead>
						<TableHead className="text-right">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactions.length === 0 ? (
						<TableRow>
							<TableCell colSpan={6} className="h-24 text-center">
								No transactions found.
							</TableCell>
						</TableRow>
					) : (
						transactions.map((transaction) => (
							<TableRow
								key={transaction.id}
								className="border-b border-muted/30 hover:bg-muted/30">
								<TableCell className="font-mono text-xs">
									{transaction.id}
								</TableCell>
								<TableCell>
									{formatDate(transaction.date)}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										{getTypeIcon(transaction.type)}
										<span className="capitalize">
											{transaction.type}
										</span>
									</div>
								</TableCell>
								<TableCell>{transaction.description}</TableCell>
								<TableCell
									className={cn(
										"text-right font-medium",
										transaction.amount > 0
											? "text-green-600"
											: "text-red-600"
									)}>
									{formatAmount(transaction.amount)}
								</TableCell>
								<TableCell className="text-right">
									{getStatusBadge(transaction.status)}
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
