import { Gift, Plane, Wallet, Home } from "lucide-react";
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

export function MobileNav({ activeTab }: MobileNavProps) {
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
											"/dashboard" == activeTab
												? "default"
												: "ghost",
										size: "icon",
									})
								)}
								to="/dashboard">
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
											"/dashboard/bookings" == activeTab
												? "default"
												: "ghost",
										size: "icon",
									})
								)}
								to="/dashboard/bookings">
								<Plane className="h-5 w-5" />
								<span className="sr-only">Book Flights</span>
							</NavLink>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Book Flights</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<NavLink
								className={cn(
									"h-12 w-12 rounded-full",
									buttonVariants({
										variant:
											"/dashboard/sell/crypto" ==
											activeTab
												? "default"
												: "ghost",
										size: "icon",
									})
								)}
								to="/dashboard/sell/crypto">
								<Wallet className="h-5 w-5" />
								<span className="sr-only">
									Sell Cryptocurrency
								</span>
							</NavLink>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Sell Cryptocurrency</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<NavLink
								className={cn(
									"h-12 w-12 rounded-full",
									buttonVariants({
										variant:
											"/dashboard/sell/gift-card" ==
											activeTab
												? "default"
												: "ghost",
										size: "icon",
									})
								)}
								to="/dashboard/sell/gift-card">
								<Gift className="h-5 w-5" />
								<span className="sr-only">Sell Gift Cards</span>
							</NavLink>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Sell Gift Cards</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
