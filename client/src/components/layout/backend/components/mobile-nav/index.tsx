import { Gift, Plane, Wallet, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface MobileNavProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
	return (
		<div className="flex flex-col items-center h-full bg-background pt-16">
			<div className="flex flex-col items-center gap-6 py-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={
									activeTab === "dashboard"
										? "default"
										: "ghost"
								}
								size="icon"
								className="h-12 w-12 rounded-full"
								onClick={() => setActiveTab("dashboard")}>
								<Home className="h-5 w-5" />
								<span className="sr-only">Dashboard</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Dashboard</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={
									activeTab === "flights"
										? "default"
										: "ghost"
								}
								size="icon"
								className="h-12 w-12 rounded-full"
								onClick={() => setActiveTab("flights")}>
								<Plane className="h-5 w-5" />
								<span className="sr-only">Book Flights</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Book Flights</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={
									activeTab === "crypto" ? "default" : "ghost"
								}
								size="icon"
								className="h-12 w-12 rounded-full"
								onClick={() => setActiveTab("crypto")}>
								<Wallet className="h-5 w-5" />
								<span className="sr-only">
									Sell Cryptocurrency
								</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Sell Cryptocurrency</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={
									activeTab === "giftcards"
										? "default"
										: "ghost"
								}
								size="icon"
								className="h-12 w-12 rounded-full"
								onClick={() => setActiveTab("giftcards")}>
								<Gift className="h-5 w-5" />
								<span className="sr-only">Sell Gift Cards</span>
							</Button>
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
