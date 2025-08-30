import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	ArrowLeft,
	ChevronDown,
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
import { ApiResponse, KYCReportType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/utils/api";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const KYCApprovalPage = () => {
	const [cardsVisible, setCardVisible] = useState(true);
	const [type, setType] = useState<string>("all");
	const onView = () => {};

	const { data: customers } = useQuery({
		queryKey: ["fetch_kyc", type],
		queryFn: async () => {
			const url = `/kyc?type=${type}`;
			const kycs = await adminApi.get(url);
			const result = kycs.data as ApiResponse<KYCReportType>;
			return result;
		},
	});

	const columns = useMemo(() => getColumns({ onView }), []);

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
								<div className="text-2xl font-bold">
									{customers?.data?.dashdata.customerReport
										.totalCustomers ?? 0}
								</div>
								<div className="flex items-center space-x-2">
									{customers?.data?.dashdata?.customerReport
										?.growthPercentage &&
										customers?.data?.dashdata
											?.customerReport?.growthPercentage >
											0 && (
											<>
												<Badge
													variant="secondary"
													className={cn({
														"bg-green-100 text-green-700 hover:bg-green-100":
															customers?.data
																?.dashdata
																.customerReport
																.growthStatus ==
															"growth",
														"bg-red-100 text-red-700 hover:bg-red-100":
															customers?.data
																?.dashdata
																.customerReport
																.growthStatus ==
															"loss",
													})}>
													{customers?.data?.dashdata
														.customerReport
														.growthStatus ==
													"growth" ? (
														<TrendingUp className="h-3 w-3 mr-1" />
													) : customers?.data
															?.dashdata
															.customerReport
															.growthStatus ==
													  "loss" ? (
														<TrendingDown className="h-3 w-3 mr-1" />
													) : null}
													{
														customers?.data
															?.dashdata
															.customerReport
															.growthPercentage
													}
													%
												</Badge>
												<span className="text-xs text-muted-foreground">
													vs last month
												</span>
											</>
										)}
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
									{customers?.data?.dashdata.approvalRate}
								</div>
								<div className="text-sm text-muted-foreground">
									Overall KYC approval rate this month
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-green-600 h-2 rounded-full"
										style={{
											width: `${customers?.data?.dashdata.approvalRate}%`,
										}}></div>
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
									{customers?.data?.dashdata.totalApproved}
								</div>
								<div className="text-sm text-muted-foreground">
									Total Approved
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

			<Card className="w-full">
				<CardHeader className="pb-3">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<CardTitle>Customers</CardTitle>
						</div>
						<div className="flex gap-1">
							<Button
								variant="outline"
								size="sm"
								className="w-full sm:w-auto"
								onClick={() =>
									setCardVisible((state) => !state)
								}>
								{cardsVisible ? (
									<EyeOff className="mr-2 h-4 w-4" />
								) : (
									<Eye className="mr-2 h-4 w-4" />
								)}
								{cardsVisible ? "Hide Report" : "Show Report"}
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										size={"sm"}
										className="capitalize flex items-center mr-1">
										{type}
										<ChevronDown />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>
										Panel Position
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuRadioGroup
										value={type}
										onValueChange={setType}>
										<DropdownMenuRadioItem value="all">
											All
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="pending">
											Pending
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="failed">
											Declined
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="approved">
											Approved
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</CardHeader>
				<CardContent className="overflow-x-auto w-full">
					{customers?.data?.kycs &&
					customers.data.kycs?.length > 0 ? (
						<DataTable
							data={customers.data.kycs}
							columns={columns}
						/>
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
