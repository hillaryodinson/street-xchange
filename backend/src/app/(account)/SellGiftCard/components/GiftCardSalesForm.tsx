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
	Form,
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
} from "@/components/ui/select"; // Use your UI library's Select
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { ApiResponse, BankType, giftCardFormType } from "@/utils/types";
import { z } from "zod";
import { giftCardTransactionFormSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import DropzoneInput from "@/components/site/dropzone";

const GiftCardSalesForm = ({
	onSubmit,
	onAccountSelect,
	onImageUpload,
	defaultValues,
	uploadedImages = [],
	defaultAccount = null,
}: {
	onSubmit: (data: z.infer<typeof giftCardTransactionFormSchema>) => void;
	onAccountSelect: (account: BankType) => void;
	onImageUpload: (images: string[]) => void;
	defaultValues?: giftCardFormType | null;
	uploadedImages?: string[];
	defaultAccount?: BankType | null;
}) => {
	const [selectedAccount, setSelectedAccount] = useState<BankType | null>(
		defaultAccount || null
	);

	const onError = (errors: Record<string, { message?: string }>) => {
		const firstErrorMessage = Object.values(errors)[0]?.message;
		console.log("First error:", errors);
		// You can also show a toast or alert here
		toast.error(
			firstErrorMessage || "An error occurred. Please check your input."
		);
	};

	const { data: accounts } = useQuery({
		queryKey: ["fetch_my_banks"],
		queryFn: async () => {
			const response = await api.get("/banks");
			const result = response.data as ApiResponse<
				(BankType & { id: string })[]
			>;
			if (result.success) return result.data;
			return [];
		},
		staleTime: 1000 * 60 * 60 * 30, // 30 hours
	});

	const form = useForm<giftCardFormType>({
		resolver: zodResolver(giftCardTransactionFormSchema),
		defaultValues: {
			cardType: "",
			country: "",
			type: "",
			amount: undefined,
			cardNumber: "",
			pin: "",
			additionalInfo: "",
			uploadedImages: uploadedImages || [],
			accountId: "",
			...defaultValues,
		},
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
						onSubmit={form.handleSubmit(onSubmit, onError)}
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
											<DropzoneInput
												onChange={(value) => {
													form.setValue(
														field.name,
														value.map(
															(file) =>
																file.image as string
														)
													);

													onImageUpload(
														value.map(
															(file) =>
																file.image as string
														)
													);
												}}
												defaultFiles={field.value?.map(
													(image) => ({
														image,
														thumb: image,
													})
												)}
											/>
										</FormControl>
										<FormMessage />
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
									defaultValue={
										form.getValues("accountId") ||
										selectedAccount?.id ||
										""
									}
									onValueChange={(value) => {
										const account = accounts?.find(
											(x) => x.accountNo === value
										);
										if (account) {
											setSelectedAccount(account);
											console.log(account);
											// Set the accountId in the form
											form.setValue(
												"accountId",
												account.id
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
											accounts.map((account) => (
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
								<FormItem>
									<FormLabel>Bank Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your bank name"
											value={
												selectedAccount?.bankName || ""
											}
											readOnly
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								<FormItem>
									<FormLabel>Account Number</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your account number"
											value={
												selectedAccount?.accountNo || ""
											}
											readOnly
										/>
									</FormControl>
									<FormMessage />
								</FormItem>

								<FormItem>
									<FormLabel>Account Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your account name"
											readOnly
											value={
												selectedAccount?.accountName ||
												""
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
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
