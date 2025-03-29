import { ServiceCard } from "@/components/site/service-card";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import { Gift, Plane, Wallet } from "lucide-react";

import "@/backend.css";

const DashboardPage = () => {
	return (
		<div className="flex flex-col gap-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Welcome back, John
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

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Recent Transactions</CardTitle>
						<CardDescription>
							Your recent activity on Xchange
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between border-b pb-4">
								<div className="flex items-center gap-4">
									<div className="rounded-full bg-primary/10 p-2">
										<Wallet className="h-4 w-4 text-primary" />
									</div>
									<div>
										<p className="font-medium">
											Bitcoin Sale
										</p>
										<p className="text-sm text-muted-foreground">
											Mar 14, 2023
										</p>
									</div>
								</div>
								<p className="font-medium">+$1,200.00</p>
							</div>
							<div className="flex items-center justify-between border-b pb-4">
								<div className="flex items-center gap-4">
									<div className="rounded-full bg-primary/10 p-2">
										<Gift className="h-4 w-4 text-primary" />
									</div>
									<div>
										<p className="font-medium">
											Amazon Gift Card
										</p>
										<p className="text-sm text-muted-foreground">
											Mar 10, 2023
										</p>
									</div>
								</div>
								<p className="font-medium">+$50.00</p>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="rounded-full bg-primary/10 p-2">
										<Plane className="h-4 w-4 text-primary" />
									</div>
									<div>
										<p className="font-medium">
											Flight Booking
										</p>
										<p className="text-sm text-muted-foreground">
											Mar 5, 2023
										</p>
									</div>
								</div>
								<p className="font-medium">-$350.00</p>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button variant="outline" className="w-full">
							View All Transactions
						</Button>
					</CardFooter>
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
							<p className="text-3xl font-bold">$2,450.50</p>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<p className="text-sm font-medium leading-none text-muted-foreground">
									Total Earnings
								</p>
								<p className="text-xl font-bold">$12,450.50</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium leading-none text-muted-foreground">
									Pending
								</p>
								<p className="text-xl font-bold">$450.00</p>
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
