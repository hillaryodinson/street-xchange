import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	ArrowLeft,
	Eye,
	EyeOff,
	TrendingDown,
	TrendingUp,
	Users,
	VerifiedIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import DataTable from "@/components/datatable/datatable";
import { getColumns } from "./components/column";
import { KYCType, UserType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

const KYCApprovalPage = () => {
	const [cardsVisible, setCardVisible] = useState(true);
	const [customers, setCustomers] = useState<UserType[]>([]);
	const onView = () => {};
	const onApprove = () => {};
	const onDecline = () => {};

	const query = useQuery({
		queryKey: ["fetch_kyc"],
		queryFn: async () => {
			const kycs = await api.get("/kyc");
			const result = kycs.data as KYCType[];
		},
	});

	const columns = useMemo(
		() => getColumns({ onView, onApprove, onDecline }),
		[]
	);

	return (
		<div className="mx-auto max-w-6xl space-y-6">
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
					<VerifiedIcon className="h-6 w-6 text-primary" />
				</div>
				<div>
					<h1 className="text-3xl font-bold">KYC</h1>
					<p className="text-muted-foreground">
						View and manage your KYC approval request
					</p>
				</div>
			</div>

			{cardsVisible && (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{/* Total Customers */}
					<Card className="relative overflow-hidden">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Total Customers
							</CardTitle>
							<div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
								<Users className="h-4 w-4 text-blue-600" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="text-2xl font-bold">12,847</div>
								<div className="flex items-center space-x-2">
									<Badge
										variant="secondary"
										className="bg-green-100 text-green-700 hover:bg-green-100">
										<TrendingUp className="h-3 w-3 mr-1" />
										+12.5%
									</Badge>
									<span className="text-xs text-muted-foreground">
										vs last month
									</span>
								</div>
							</div>
						</CardContent>
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
					</Card>
					<Card className="relative overflow-hidden">
						<CardHeader>
							<CardTitle className="text-lg">
								Approval Rate
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="text-3xl font-bold text-green-600">
									96.2%
								</div>
								<div className="text-sm text-muted-foreground">
									Overall KYC approval rate this month
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-green-600 h-2 rounded-full"
										style={{ width: "96.2%" }}></div>
								</div>
							</div>
						</CardContent>
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600" />
					</Card>
					<Card className="relative overflow-hidden">
						<CardHeader>
							<CardTitle className="text-lg">
								Processing Time
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="text-3xl font-bold text-blue-600">
									2.1 days
								</div>
								<div className="text-sm text-muted-foreground">
									Average KYC processing time
								</div>
								<div className="flex items-center space-x-2">
									<Badge
										variant="secondary"
										className="bg-green-100 text-green-700 hover:bg-green-100">
										<TrendingDown className="h-3 w-3 mr-1" />
										-0.3 days
									</Badge>
									<span className="text-xs text-muted-foreground">
										improvement
									</span>
								</div>
							</div>
						</CardContent>
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600" />
					</Card>
				</div>
			)}

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
							className="w-full sm:w-auto"
							onClick={() => setCardVisible((state) => !state)}>
							{cardsVisible ? (
								<EyeOff className="mr-2 h-4 w-4" />
							) : (
								<Eye className="mr-2 h-4 w-4" />
							)}
							{cardsVisible ? "Hide Report" : "Show Report"}
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{customers && customers.length > 0 ? (
						<DataTable data={customers} columns={columns} />
					) : (
						<div className="border border-dashed border-gray-300 rounded-sm flex h-60 w-full items-center justify-center">
							<div className="text-xs font-semibold text-muted-foreground">
								No data available at the moment
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default KYCApprovalPage;
