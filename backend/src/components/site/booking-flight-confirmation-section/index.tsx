import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { airports, cryptocurrencies } from "@/lib/data";
import React from "react";

interface FlightConfirmationSectionProps {
	flightDetails: {
		from: string;
		to: string;
		scheduledFlightDate: Date;
		type: string;
		passengers: number;
		paymentMethod: string;
	};
	flightCost?: number;
	cryptoAmount?: number;
	onSubmit?: () => void;
	goback?: () => void;
}

const FlightConfirmationSection: React.FC<FlightConfirmationSectionProps> = ({
	flightDetails,
	flightCost,
	cryptoAmount,
	onSubmit,
	goback,
}) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Review Your Booking</CardTitle>
				<CardDescription>
					Please review your flight details before confirming
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="rounded-md bg-muted p-4 space-y-4">
					<div className="flex justify-between items-center border-b pb-2">
						<h3 className="font-medium">Flight Details</h3>
						{goback && (
							<Button
								variant="outline"
								size="sm"
								onClick={() => goback()}>
								Edit
							</Button>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-muted-foreground">
								From
							</p>
							<p className="font-medium">
								{
									airports.find(
										(a) => a.value === flightDetails.from
									)?.label
								}
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">To</p>
							<p className="font-medium">
								{
									airports.find(
										(a) => a.value === flightDetails.to
									)?.label
								}
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Date
							</p>
							<p className="font-medium">
								{new Date(
									flightDetails.scheduledFlightDate
								).toLocaleDateString("en-US", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Class
							</p>
							<p className="font-medium capitalize">
								{flightDetails.type === "firstClass"
									? "First Class"
									: flightDetails.type}
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Passengers
							</p>
							<p className="font-medium">
								{flightDetails.passengers}
							</p>
						</div>
					</div>
				</div>

				<div className="rounded-md bg-muted p-4 space-y-4">
					<div className="border-b pb-2">
						<h3 className="font-medium">Payment Details</h3>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between">
							<p className="text-sm">Payment Method</p>
							<p className="font-medium">
								{
									cryptocurrencies.find(
										(c) =>
											c.value ===
											flightDetails.paymentMethod
									)?.label
								}
							</p>
						</div>
						{flightCost && (
							<div className="flex justify-between">
								<p className="text-sm">Price in USD</p>
								<p className="font-medium">
									${flightCost.toLocaleString()}
								</p>
							</div>
						)}
						{cryptoAmount && (
							<div className="flex justify-between">
								<p className="text-sm">
									Amount in{" "}
									{
										cryptocurrencies
											.find(
												(c) =>
													c.value ===
													flightDetails.paymentMethod
											)
											?.label.split(" ")[0]
									}
								</p>
								<p className="font-medium">
									{cryptoAmount}{" "}
									{flightDetails.paymentMethod.toUpperCase()}
								</p>
							</div>
						)}
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
				<Button onClick={onSubmit} className="w-full">
					Confirm and Pay
				</Button>

				{goback && (
					<Button
						variant="outline"
						onClick={() => goback()}
						className="w-full">
						Go Back
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default FlightConfirmationSection;
