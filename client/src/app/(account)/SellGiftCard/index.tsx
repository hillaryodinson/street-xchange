import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Gift } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cardTypes, countries, giftCardTypes } from "@/lib/data";
import { BankType } from "@/utils/types";
import GiftCardSalesForm from "./components/GiftCardSalesForm";

const formSchema = z.object({
	cardType: z.string({
		required_error: "Please select a gift card type.",
	}),
	country: z.string({
		required_error: "Please select a country.",
	}),
	type: z.string({
		required_error: "Please select a card type.",
	}),
	amount: z.coerce
		.number()
		.positive("Amount must be positive")
		.min(5, "Minimum amount is $5"),
	cardNumber: z.string().min(1, "Please enter the card number"),
	pin: z.string().optional(),
	additionalInfo: z.string().optional(),
	accountId: z.string().min(1, "Please select your bank"),
	uploadedImages: z.array(z.string()).optional(),
});

export function SellGiftCardForm() {
	const [step, setStep] = useState(1);
	const [saleDetails, setSaleDetails] = useState<z.infer<
		typeof formSchema
	> | null>(null);
	const [selectedAccount, setSelectedAccount] = useState<BankType | null>(
		null
	);
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cardType: "",
			country: "",
			type: "",
			amount: undefined,
			cardNumber: "",
			pin: "",
			additionalInfo: "",
			accountId: "",
			uploadedImages: [],
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setSaleDetails(values);
		setStep(2);
	}

	// const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files && e.target.files.length > 0) {
	// 		const newImages = Array.from(e.target.files).map((file) =>
	// 			URL.createObjectURL(file)
	// 		);
	// 		setUploadedImages([...uploadedImages, ...newImages]);
	// 	}
	// };

	const handleConfirmSale = () => {
		// Here you would handle the actual sale process
		// For now, we'll just show a success message
		setStep(3);
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
					form={form}
					onSubmit={onSubmit}
					onAccountSelect={setSelectedAccount}
					onImageUpload={setUploadedImages}
				/>
			)}

			{/* Step 2: Review and Confirm */}
			{step === 2 && saleDetails && (
				<Card>
					<CardHeader>
						<CardTitle>Review Your Gift Card Sale</CardTitle>
						<CardDescription>
							Please review your gift card details before
							confirming
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="rounded-md bg-muted p-4 space-y-4">
							<div className="flex justify-between items-center border-b pb-2">
								<h3 className="font-medium">
									Gift Card Details
								</h3>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setStep(1)}>
									Edit
								</Button>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-muted-foreground">
										Gift Card
									</p>
									<p className="font-medium">
										{
											giftCardTypes.find(
												(c) =>
													c.value ===
													saleDetails.cardType
											)?.label
										}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Country
									</p>
									<p className="font-medium">
										{
											countries.find(
												(c) =>
													c.value ===
													saleDetails.country
											)?.label
										}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Card Type
									</p>
									<p className="font-medium">
										{
											cardTypes.find(
												(t) =>
													t.value === saleDetails.type
											)?.label
										}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Amount
									</p>
									<p className="font-medium">
										${saleDetails.amount}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Exchange Rate
									</p>
									<p className="font-medium"></p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										You'll Receive
									</p>
									<p className="font-medium text-lg text-primary"></p>
								</div>
							</div>
						</div>

						<div className="rounded-md bg-muted p-4 space-y-4">
							<div className="border-b pb-2">
								<h3 className="font-medium">
									Card Information
								</h3>
							</div>

							<div className="space-y-2">
								<div>
									<p className="text-sm text-muted-foreground">
										Card Number / Code
									</p>
									<p className="font-medium">
										{saleDetails.cardNumber}
									</p>
								</div>

								{saleDetails.pin && (
									<div>
										<p className="text-sm text-muted-foreground">
											PIN
										</p>
										<p className="font-medium">
											{saleDetails.pin}
										</p>
									</div>
								)}

								{saleDetails.additionalInfo && (
									<div>
										<p className="text-sm text-muted-foreground">
											Additional Information
										</p>
										<p className="font-medium">
											{saleDetails.additionalInfo}
										</p>
									</div>
								)}

								{uploadedImages.length > 0 && (
									<div>
										<p className="text-sm text-muted-foreground mb-2">
											Card Images
										</p>
										<div className="grid grid-cols-4 gap-2">
											{uploadedImages.map(
												(image, index) => (
													<div
														key={index}
														className="relative aspect-square rounded-md overflow-hidden border">
														<img
															src={
																image ||
																"/placeholder.svg"
															}
															alt={`Card image ${
																index + 1
															}`}
															className="w-full h-full object-cover"
														/>
													</div>
												)
											)}
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="rounded-md bg-muted p-4 space-y-4">
							<div className="border-b pb-2">
								<h3 className="font-medium">
									Bank Account Details
								</h3>
							</div>

							<div className="space-y-2">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-sm text-muted-foreground">
											Bank Name
										</p>
										<p className="font-medium">
											{selectedAccount?.bankName || "N/A"}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Account Number
										</p>
										<p className="font-medium">
											{selectedAccount?.accountNo ||
												"N/A"}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Account Name
										</p>
										<p className="font-medium">
											{selectedAccount?.accountName ||
												"N/A"}
										</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
						<Button onClick={handleConfirmSale} className="w-full">
							Confirm Sale
						</Button>
						<Button
							variant="outline"
							onClick={() => setStep(1)}
							className="w-full">
							Go Back
						</Button>
					</CardFooter>
				</Card>
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
