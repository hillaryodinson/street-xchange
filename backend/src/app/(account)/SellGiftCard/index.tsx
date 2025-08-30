import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ApiResponse, BankType, giftCardFormType } from "@/utils/types";
import GiftCardSalesForm from "./components/GiftCardSalesForm";
import ConfirmGiftCardSale from "./components/ConfirmGiftCardSale";
import api from "@/utils/api";
import { toast } from "react-toastify";

export function SellGiftCardForm() {
	const [step, setStep] = useState(1);
	const [saleDetails, setSaleDetails] = useState<giftCardFormType | null>(
		null
	);
	const [selectedAccount, setSelectedAccount] = useState<BankType | null>(
		null
	);
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);

	function onSubmit(values: giftCardFormType) {
		setSaleDetails(values);
		setStep(2);
	}

	const handleConfirmSale = async () => {
		// Here you would handle the actual sale process
		const values = saleDetails as giftCardFormType;

		if (!values) return;

		if (!selectedAccount) {
			alert("Please select a bank account to receive payment.");
			return;
		}
		const response = await api.post(
			"/transactions/giftcard/sell-order",
			values
		);
		try {
			const result = response.data as ApiResponse<unknown>;
			if (result.success) {
				setStep(3);
			} else {
				console.log(result.errors);
				throw new Error(result.message);
			}
		} catch (error) {
			const errorMessage =
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(error as any)?.message ||
				"An error occured. Please contact admin";
			toast.error(errorMessage);
		}
	};

	const handleImageUpload = (newImages: string[]) => {
		setUploadedImages((prevImages) => {
			const updatedImages = [...prevImages];
			newImages.forEach((img) => {
				const idx = updatedImages.findIndex((i) => i === img);
				if (idx === -1) {
					updatedImages.push(img);
				} else {
					updatedImages[idx] = img;
				}
			});
			return updatedImages;
		});
	};

	return (
		<div className="mx-auto max-w-3xl">
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
					<Gift className="h-6 w-6 text-primary" />
				</div>
				<div>
					<h1 className="text-3xl font-bold">Sell Gift Card</h1>
					<p className="text-muted-foreground">
						Convert your gift cards to cash instantly
					</p>
				</div>
			</div>
			{/* Step 1: Gift Card Details Form */}
			{step === 1 && (
				<GiftCardSalesForm
					onSubmit={onSubmit}
					onAccountSelect={setSelectedAccount}
					onImageUpload={handleImageUpload}
					defaultValues={saleDetails}
					uploadedImages={uploadedImages}
					defaultAccount={selectedAccount}
				/>
			)}
			{/* Step 2: Review and Confirm */}
			{step === 2 && saleDetails && (
				<ConfirmGiftCardSale
					onConfirmSale={handleConfirmSale}
					saleDetails={saleDetails}
					selectedAccount={selectedAccount}
					uploadedImages={uploadedImages}
					onPreviousStep={() => setStep(1)}
				/>
			)}
			{/* Step 3: Confirmation */}
			{step === 3 && (
				<Card>
					<CardHeader className="text-center">
						<div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
							<Check className="h-8 w-8 text-primary" />
						</div>
						<CardTitle className="text-2xl">
							Gift Card Sale Initiated!
						</CardTitle>
						<CardDescription>
							Your gift card sale has been initiated. We'll verify
							the card details and process your payment.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="rounded-md bg-muted p-4">
							<div className="text-center">
								<p className="text-sm text-muted-foreground">
									Transaction Reference
								</p>
								<p className="text-xl font-bold tracking-wider">
									XCH
									{Math.floor(Math.random() * 1000000)
										.toString()
										.padStart(6, "0")}
								</p>
							</div>
						</div>

						<div className="border-t pt-4">
							<h3 className="font-medium mb-2">What's Next?</h3>
							<ul className="space-y-2">
								<li className="flex items-start gap-2">
									<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
									<span>
										Our team will verify your gift card
										details
									</span>
								</li>
								<li className="flex items-start gap-2">
									<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
									<span>
										Once verified, we'll transfer the funds
										to your bank account
									</span>
								</li>
								<li className="flex items-start gap-2">
									<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
									<span>
										You can track the status of your sale in
										the "Transactions" section
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
			)}
		</div>
	);
}
