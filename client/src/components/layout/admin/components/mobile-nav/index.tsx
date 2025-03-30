import { Home, History, ListRestart, Verified, Settings } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileNavProps {
	activeTab: string;
}

export function AdminMobileNav({ activeTab }: MobileNavProps) {
	return (
		<div className="flex flex-col items-center h-full bg-background pt-16">
			<div className="flex flex-col items-center gap-6 py-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<NavLink
								className={cn(
									"h-12 w-12 rounded-full",
									buttonVariants({
										variant:
											"/sxadmin/dashboard" == activeTab
												? "default"
												: "ghost",
										size: "icon",
									})
								)}
								to="/sxadmin/dashboard">
								<Home className="h-5 w-5" />
								<span className="sr-only">Dashboard</span>
							</NavLink>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Dashboard</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<NavLink
								className={cn(
									"h-12 w-12 rounded-full",
									buttonVariants({
										variant:
											"/sxadmin/transactions/pending" ==
											activeTab
												? "default"
												: "ghost",
										size: "icon",
									})
								)}
								to="/sxadmin/transactions/pending">
								<ListRestart className="h-5 w-5" />
								<span className="sr-only">
									Pending Transactions
								</span>
							</NavLink>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Pending Transactions</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<NavLink
								className={cn(
									"h-12 w-12 rounded-full",
									buttonVariants({
										variant:
											"/sxadmin/user/verification/pending" ==
											activeTab
												? "default"
												: "ghost",
										size: "icon",
									})
								)}
								to="/sxadmin/user/verification/pending">
								<Verified className="h-5 w-5" />
								<span className="sr-only">
									Pending Verification
								</span>
							</NavLink>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Pending Verification</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<NavLink
								className={cn(
									"h-12 w-12 rounded-full",
									buttonVariants({
										variant:
											"/sxadmin/settings" == activeTab
												? "default"
												: "ghost",
										size: "icon",
									})
								)}
								to="/sxadmin/settings">
								<Settings className="h-5 w-5" />
								<span className="sr-only">Settings</span>
							</NavLink>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Settings</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<NavLink
								className={cn(
									"h-12 w-12 rounded-full",
									buttonVariants({
										variant:
											"/transaction-history" == activeTab
												? "default"
												: "ghost",
										size: "icon",
									})
								)}
								to="/transaction-history">
								<History className="h-5 w-5" />
								<span className="sr-only">
									Transaction History
								</span>
							</NavLink>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Transaction History</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
