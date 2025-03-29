"use client";

import type React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Gift, Upload } from "lucide-react";
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cardTypes, countries, giftCardTypes } from "@/lib/data";

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
	bankName: z.string().min(1, "Please enter your bank name"),
	accountNumber: z.string().min(1, "Please enter your account number"),
	accountName: z.string().min(1, "Please enter your account name"),
	uploadedImages: z.array(z.string()).optional(),
});

export function SellGiftCardForm() {
	const [step, setStep] = useState(1);
	const [saleDetails, setSaleDetails] = useState<z.infer<
		typeof formSchema
	> | null>(null);
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
			bankName: "",
			accountNumber: "",
			accountName: "",
			uploadedImages: [],
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setSaleDetails(values);
		setStep(2);
	}

	const getExchangeRate = (cardType: string) => {
		const selectedCard = giftCardTypes.find((c) => c.value === cardType);
		return selectedCard?.rate || 0;
	};

	const getReceiveAmount = () => {
		if (!saleDetails) return 0;

		const rate = getExchangeRate(saleDetails.cardType);
		return (saleDetails.amount * rate).toFixed(2);
	};

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
				<Card>
					<CardHeader>
						<CardTitle>Gift Card Details</CardTitle>
						<CardDescription>
							Enter your gift card information
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6">
								<div className="grid gap-6 md:grid-cols-2">
									<FormField
										control={form.control}
										name="cardType"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Gift Card Type
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													value={field.value || ""}
													defaultValue={field.value}>
													<FormControl className="!w-full">
														<SelectTrigger>
															<SelectValue placeholder="Select gift card type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{giftCardTypes.map(
															(card) => (
																<SelectItem
																	key={
																		card.value
																	}
																	value={
																		card.value
																	}>
																	{card.label}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="country"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Country</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													value={field.value || ""}
													defaultValue={field.value}>
													<FormControl className="!w-full">
														<SelectTrigger>
															<SelectValue placeholder="Select country" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{countries.map(
															(country) => (
																<SelectItem
																	key={
																		country.value
																	}
																	value={
																		country.value
																	}>
																	{
																		country.label
																	}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<FormField
										control={form.control}
										name="type"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Card Type</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													value={field.value || ""}
													defaultValue={field.value}>
													<FormControl className="!w-full">
														<SelectTrigger>
															<SelectValue placeholder="Select card type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{cardTypes.map(
															(type) => (
																<SelectItem
																	key={
																		type.value
																	}
																	value={
																		type.value
																	}>
																	{type.label}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="amount"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Card Amount ($)
												</FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="0.00"
														{...field}
														onChange={(e) => {
															const value =
																e.target
																	.value ===
																""
																	? undefined
																	: Number.parseFloat(
																			e
																				.target
																				.value
																	  );
															field.onChange(
																value
															);
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="space-y-4 border-t pt-4">
									<h3 className="text-lg font-medium">
										Card Information
									</h3>

									<FormField
										control={form.control}
										name="cardNumber"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Card Number / Code
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter card number or code"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="pin"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													PIN (if applicable)
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter card PIN"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="uploadedImages"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Upload Card Images
												</FormLabel>
												<FormControl>
													<div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
														<Upload className="h-8 w-8 text-muted-foreground mb-2" />
														<p className="text-sm text-muted-foreground mb-2">
															Drag and drop card
															images here, or
															click to select
															files
														</p>
														<Input
															type="file"
															className="hidden"
															id="card-images"
															accept="image/*"
															multiple
															onChange={(e) => {
																if (
																	e.target
																		.files &&
																	e.target
																		.files
																		.length >
																		0
																) {
																	const newImages =
																		Array.from(
																			e
																				.target
																				.files
																		).map(
																			(
																				file
																			) =>
																				URL.createObjectURL(
																					file
																				)
																		);
																	setUploadedImages(
																		[
																			...uploadedImages,
																			...newImages,
																		]
																	);
																	field.onChange(
																		[
																			...uploadedImages,
																			...newImages,
																		]
																	);
																}
															}}
														/>
														<Button
															type="button"
															variant="outline"
															onClick={() =>
																document
																	.getElementById(
																		"card-images"
																	)
																	?.click()
															}>
															Select Files
														</Button>
													</div>
												</FormControl>
												<FormMessage />

												{uploadedImages.length > 0 && (
													<div className="grid grid-cols-3 gap-2 mt-4">
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
																			index +
																			1
																		}`}
																		className="w-full h-full object-cover"
																	/>
																</div>
															)
														)}
													</div>
												)}
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="additionalInfo"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Additional Information
													(Optional)
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Enter any additional information about the card"
														className="min-h-[100px]"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="space-y-4 border-t pt-4">
									<h3 className="text-lg font-medium">
										Bank Account Details
									</h3>
									<p className="text-sm text-muted-foreground">
										Enter your bank account details where
										you want to receive the funds
									</p>

									<FormField
										control={form.control}
										name="bankName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Bank Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter your bank name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="grid gap-6 md:grid-cols-2">
										<FormField
											control={form.control}
											name="accountNumber"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Account Number
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter your account number"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="accountName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Account Name
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter your account name"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								<Button type="submit" className="w-full">
									Continue to Review
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
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
									<p className="font-medium">
										{(
											getExchangeRate(
												saleDetails.cardType
											) * 100
										).toFixed(0)}
										%
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										You'll Receive
									</p>
									<p className="font-medium text-lg text-primary">
										${getReceiveAmount()}
									</p>
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
											{saleDetails.bankName}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Account Number
										</p>
										<p className="font-medium">
											{saleDetails.accountNumber}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Account Name
										</p>
										<p className="font-medium">
											{saleDetails.accountName}
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
