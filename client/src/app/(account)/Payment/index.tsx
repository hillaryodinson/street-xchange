import TimerContainer from "@/components/site/timer-container";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { ApiResponse } from "@/utils/types";

const Payment = () => {
	const { transId } = useParams();
	//fetch the transaction using the transaction ID
	const { data: exchangeDetails, isPending } = useQuery({
		queryKey: ["fetch_transaction", transId],
		queryFn: async () => {
			const res = await api.get("/transaction/" + transId);
			return res.data;
		},
	});

	const doConfirmPayment = async () => {
		const response = await api.put(
			`/transactions/crypto/confirm-order?transId=${transId}`
		);
		const result = response.data as ApiResponse<undefined>;
		if (result.success) {
			toast.success("Payment confirmed successfully.");
		} else {
			toast.error("Failed to confirm payment.");
		}
	};

	return (
		<Card>
			<CardHeader className="text-center">
				<div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
					<Check className="h-8 w-8 text-primary" />
				</div>
				<CardTitle className="text-2xl">Exchange Initiated!</CardTitle>
				<CardDescription>
					Your cryptocurrency exchange has been initiated. Complete
					the transfer from your bitcoin app. You will receive your
					funds shortly.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="rounded-md bg-muted p-4 space-y-4">
					<div className="border-b pb-2">
						<h3 className="font-medium">Wallet Details</h3>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">
							Wallet Address
						</p>
						<p className="font-medium break-all">
							{exchangeDetails?.walletAddress}
						</p>
					</div>
					<div>
						<p className="text-sm text-muted-foreground">
							Cryptocurrency
						</p>
						<p className="font-medium">
							{" "}
							{exchangeDetails?.cryptoTypeSent.toUpperCase()}
						</p>
					</div>
					<div>
						<p className="text-sm text-muted-foreground">
							Wallet Network
						</p>
						<p className="font-medium break-all">{targetNetwork}</p>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">
							Amount to Transfer
						</p>
						<p className="font-medium">
							{exchangeDetails?.cryptoAmountSent}{" "}
							{exchangeDetails?.cryptoTypeSent.toUpperCase()}
						</p>
					</div>
				</div>

				<div className="border-t pt-4">
					<h3 className="font-medium mb-2">What's Next?</h3>
					<ul className="space-y-2">
						<li className="flex items-start gap-2">
							<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
							<span>
								Send the cryptocurrency to our wallet address
								provided in your email before the timer expires
							</span>
						</li>
						<li className="flex items-start gap-2">
							<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
							<span>
								Once confirmed, we'll transfer the funds to your
								bank account
							</span>
						</li>
						<li className="flex items-start gap-2">
							<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
							<span>
								Please dont transfer to wallet when timer
								expires. You can check your transaction status
								in the dashboard
							</span>
						</li>
					</ul>
				</div>
			</CardContent>
			<CardFooter>
				<TimerContainer
					expiryTimeInSeconds={30000}
					startTime={
						new Date(
							"20 Apr 2025 11:04:00 GMT+0100 (West Africa Standard Time)"
						)
					}>
					<Button asChild className="w-full">
						<Link to="/dashboard"> I have made transfer</Link>
					</Button>
				</TimerContainer>
			</CardFooter>
		</Card>
	);
};

export default Payment;
