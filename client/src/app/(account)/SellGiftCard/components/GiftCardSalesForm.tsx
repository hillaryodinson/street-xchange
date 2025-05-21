/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { giftCardTypes, countries, cardTypes } from "@/lib/data";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@radix-ui/react-select";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Form } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import api from "@/utils/api";
import { ApiResponse, BankType } from "@/utils/types";

const GiftCardSalesForm = ({
	form,
	onSubmit,
	onAccountSelect,
	onImageUpload,
}: {
	form: UseFormReturn<any>;
	onSubmit: (data: any) => void;
	onAccountSelect: (account: BankType) => void;
	onImageUpload: (images: string[]) => void;
}) => {
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);

	const [{ data: accounts }] = useQueries({
		queries: [
			{
				queryKey: ["fetch_my_banks"],
				queryFn: async () => {
					const response = await api.get("/banks");
					const result = response.data as ApiResponse<BankType[]>;
					if (result.success) return result.data;
				},
				staleTime: 1000 * 60 * 60 * 30, // 30 hours
			},
		],
	});
	return (
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
										<FormLabel>Gift Card Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value || ""}
											defaultValue={field.value}>
											<FormControl className="!w-full">
												<SelectTrigger>
													<SelectValue placeholder="Select gift card type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{giftCardTypes.map((card) => (
													<SelectItem
														key={card.value}
														value={card.value}>
														{card.label}
													</SelectItem>
												))}
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
											onValueChange={field.onChange}
											value={field.value || ""}
											defaultValue={field.value}>
											<FormControl className="!w-full">
												<SelectTrigger>
													<SelectValue placeholder="Select country" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{countries.map((country) => (
													<SelectItem
														key={country.value}
														value={country.value}>
														{country.label}
													</SelectItem>
												))}
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
											onValueChange={field.onChange}
											value={field.value || ""}
											defaultValue={field.value}>
											<FormControl className="!w-full">
												<SelectTrigger>
													<SelectValue placeholder="Select card type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{cardTypes.map((type) => (
													<SelectItem
														key={type.value}
														value={type.value}>
														{type.label}
													</SelectItem>
												))}
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
										<FormLabel>Card Amount ($)</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="0.00"
												{...field}
												onChange={(e) => {
													const value =
														e.target.value === ""
															? undefined
															: Number.parseFloat(
																	e.target
																		.value
															  );
													field.onChange(value);
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
													Drag and drop card images
													here, or click to select
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
															e.target.files &&
															e.target.files
																.length > 0
														) {
															const newImages =
																Array.from(
																	e.target
																		.files
																).map((file) =>
																	URL.createObjectURL(
																		file
																	)
																);
															setUploadedImages([
																...uploadedImages,
																...newImages,
															]);
															field.onChange([
																...uploadedImages,
																...newImages,
															]);

															onImageUpload(
																uploadedImages
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
													(
														image: string,
														index: number
													) => (
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
											Additional Information (Optional)
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
								Enter your bank account details where you want
								to receive the funds
							</p>

							<FormItem>
								<FormLabel>Bank Name</FormLabel>
								<Select
									onValueChange={(value) => {
										const account = accounts?.find(
											(x) => x.accountNo == value
										);
										console.log(account);
										if (account) {
											form.setValue(
												"accountNumber",
												account?.accountNo
											);
											form.setValue(
												"bankName",
												account?.bankName
											);
											form.setValue(
												"accountName",
												account?.accountName
											);

											onAccountSelect(account);
										}
									}}>
									<FormControl className="!w-full">
										<SelectTrigger>
											<SelectValue placeholder="Select Account" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{accounts &&
											accounts?.map((account) => (
												<SelectItem
													key={account.accountNo}
													value={account.accountNo}>
													{`${account.bankName} (${account.accountNo})`}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>

							<div className="grid gap-6 md:grid-cols-2">
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
							</div>

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
													readOnly
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
											<FormLabel>Account Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your account name"
													{...field}
													readOnly
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
	);
};

export default GiftCardSalesForm;
