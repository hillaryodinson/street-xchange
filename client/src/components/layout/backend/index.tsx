import { DashboardHeader } from "@/components/layout/backend/components/dashboard-header";
import { MobileNav } from "@/components/layout/backend/components/mobile-nav";

import { Button, buttonVariants } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CreditCard, Gift, History, Menu, Plane, Wallet } from "lucide-react";
import "@/backend.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BackendLayout = () => {
	const location = useLocation();

	const getButtonVariant = (to: string) => {
		return location.pathname === to ? "default" : "ghost";
	};

	return (
		<div className="flex min-h-screen flex-col">
			<DashboardHeader />

			<div className="flex flex-1">
				<div
					className="absolute inset-0 z-0 bg-background"
					style={{
						backgroundImage: "url(/images/dashboard-bg.svg)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				{/* Mobile Navigation */}
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="md:hidden fixed left-4 top-4 z-50 bg-background shadow-md">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="p-0 w-16">
						<MobileNav activeTab={location.pathname} />
					</SheetContent>
				</Sheet>

				{/* Desktop Navigation */}
				<div className="hidden md:flex fixed top-16 bottom-0 w-64 flex-col z-20 bg-background/70 backdrop-blur-md border-r border-border/40 p-6">
					<nav className="flex flex-col gap-2 mt-30">
						<NavLink
							className={cn(
								"!justify-start",
								buttonVariants({
									variant: getButtonVariant("/dashboard"),
								})
							)}
							to="/dashboard">
							<CreditCard className="mr-2 h-4 w-4" />
							Dashboard
						</NavLink>
						<NavLink
							className={cn(
								"!justify-start",
								buttonVariants({
									variant: getButtonVariant(
										"/dashboard/bookings"
									),
								})
							)}
							to="/dashboard/bookings">
							<Plane className="mr-2 h-4 w-4" />
							Book Flights
						</NavLink>
						<NavLink
							className={cn(
								"!justify-start",
								buttonVariants({
									variant: getButtonVariant(
										"/dashboard/sell/crypto"
									),
								})
							)}
							to="/dashboard/sell/crypto">
							<Wallet className="mr-2 h-4 w-4" />
							Sell Cryptocurrency
						</NavLink>
						<NavLink
							className={cn(
								"!justify-start",
								buttonVariants({
									variant: getButtonVariant(
										"/dashboard/sell/gift-card"
									),
								})
							)}
							to="/dashboard/sell/gift-card">
							<Gift className="mr-2 h-4 w-4" />
							Sell Gift Cards
						</NavLink>
						<NavLink
							className={cn(
								"!justify-start",
								buttonVariants({
									variant: getButtonVariant(
										"/dashboard/transaction-history"
									),
								})
							)}
							to="/dashboard/transaction-history">
							<History className="mr-2 h-4 w-4" />
							Transaction History
						</NavLink>
					</nav>
				</div>

				{/* Main Content */}
				<main className="flex-1 p-6 pt-16 md:pl-[calc(20px+16rem)] md:pr-10 md:py-10 relative z-10">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default BackendLayout;
