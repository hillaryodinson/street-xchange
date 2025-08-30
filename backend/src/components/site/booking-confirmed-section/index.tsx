import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BookingConfirmedPage = ({
	message,
	bookingRef,
}: {
	message: string;
	bookingRef: string;
}) => {
	return (
		<Card>
			<CardHeader className="text-center">
				<div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
					<Check className="h-8 w-8 text-green-500" />
				</div>
				<CardTitle className="text-2xl">
					Booking Request Submitted
				</CardTitle>
				<CardDescription>{message}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="rounded-md bg-muted p-4">
					<div className="text-center">
						<p className="text-sm text-muted-foreground">
							Booking Reference
						</p>
						<p className="text-xl font-bold tracking-wider">
							{bookingRef}
						</p>
					</div>
				</div>

				<div className="border-t pt-4">
					<h3 className="font-medium mb-2">What's Next?</h3>
					<ul className="space-y-2">
						<li className="flex items-start gap-2">
							<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
							<span>
								Our Agent will get back to you. Check your
								emails for booking updates
							</span>
						</li>
						<li className="flex items-start gap-2">
							<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
							<span>
								You can view your booking in the
								&quot;Transaction History&quot; &gt;
								&quot;Flights Tab&quot;
							</span>
						</li>
					</ul>
				</div>
			</CardContent>
			<CardFooter>
				<Button asChild className="w-full">
					<Link to="/dashboard">Return to Dashboard</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default BookingConfirmedPage;
