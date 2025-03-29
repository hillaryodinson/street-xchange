import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Wallet } from "lucide-react";
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const cryptocurrencies = [
	{
		value: "btc",
		label: "Bitcoin (BTC)",
		rate: { usd: 43250, ngn: 43250 * 1550 },
	},
	{
		value: "eth",
		label: "Ethereum (ETH)",
		rate: { usd: 3150, ngn: 3150 * 1550 },
	},
	{ value: "usdt", label: "Tether (USDT)", rate: { usd: 1, ngn: 1550 } },
	{
		value: "bnb",
		label: "Binance Coin (BNB)",
		rate: { usd: 530, ngn: 530 * 1550 },
	},
	{
		value: "sol",
		label: "Solana (SOL)",
		rate: { usd: 102, ngn: 102 * 1550 },
	},
	{
		value: "xrp",
		label: "Ripple (XRP)",
		rate: { usd: 0.5, ngn: 0.5 * 1550 },
	},
] as const;

const formSchema = z.object({
	cryptoType: z.string({
		required_error: "Please select a cryptocurrency.",
	}),
	amount: z.coerce
		.number()
		.positive("Amount must be positive")
		.min(0.0001, "Minimum amount is 0.0001"),
	targetCurrency: z.enum(["usd", "ngn"], {
		required_error: "Please select a target currency.",
	}),
	walletAddress: z.string().min(1, "Please enter your wallet address"),
	bankName: z.string().min(1, "Please enter your bank name"),
	accountNumber: z.string().min(1, "Please enter your account number"),
	accountName: z.string().min(1, "Please enter your account name"),
});

export function ExchangeCryptoForm() {
	const [step, setStep] = useState(1);
	const [exchangeDetails, setExchangeDetails] = useState<z.infer<
		typeof formSchema
	> | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cryptoType: "",
			amount: undefined,
			targetCurrency: "usd",
			walletAddress: "",
			bankName: "",
			accountNumber: "",
			accountName: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setExchangeDetails(values);
		setStep(2);
	}

	const getExchangeRate = (crypto: string, currency: "usd" | "ngn") => {
		const selectedCrypto = cryptocurrencies.find((c) => c.value === crypto);
		if (!selectedCrypto) return 0;
		return selectedCrypto.rate[currency];
	};

	const getExchangeAmount = () => {
		if (!exchangeDetails) return 0;

		const rate = getExchangeRate(
			exchangeDetails.cryptoType,
			exchangeDetails.targetCurrency
		);
		return (exchangeDetails.amount * rate).toFixed(2);
	};

	const handleConfirmExchange = () => {
		// Here you would handle the actual exchange process
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
					<Wallet className="h-6 w-6 text-primary" />
				</div>
				<div>
					<h1 className="text-3xl font-bold">
						Exchange Cryptocurrency
					</h1>
					<p className="text-muted-foreground">
						Convert your cryptocurrency to Naira or USD
					</p>
				</div>
			</div>

			{/* Step 1: Exchange Details Form */}
			{step === 1 && (
				<Card>
					<CardHeader>
						<CardTitle>Exchange Details</CardTitle>
						<CardDescription>
							Enter your cryptocurrency exchange information
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6">
								<FormField
									control={form.control}
									name="cryptoType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Cryptocurrency
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value || ""}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select cryptocurrency" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{cryptocurrencies.map(
														(crypto) => (
															<SelectItem
																key={
																	crypto.value
																}
																value={
																	crypto.value
																}>
																{crypto.label}
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
											<FormLabel>Amount</FormLabel>
											<FormControl>
												<Input
													type="number"
													step="0.0001"
													placeholder="0.00"
													{...field}
													onChange={(e) => {
														const value =
															e.target.value ===
															""
																? undefined
																: Number.parseFloat(
																		e.target
																			.value
																  );
														field.onChange(value);
													}}
												/>
											</FormControl>
											<FormDescription>
												Enter the amount of
												cryptocurrency you want to
												exchange
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="targetCurrency"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>
												Target Currency
											</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
													className="flex flex-col space-y-1">
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="usd" />
														</FormControl>
														<FormLabel className="font-normal">
															USD (US Dollar)
														</FormLabel>
													</FormItem>
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="ngn" />
														</FormControl>
														<FormLabel className="font-normal">
															NGN (Nigerian Naira)
														</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="walletAddress"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Wallet Address
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your wallet address"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												The wallet address from which
												you'll send the cryptocurrency
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

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
			{step === 2 && exchangeDetails && (
				<Card>
					<CardHeader>
						<CardTitle>Review Your Exchange</CardTitle>
						<CardDescription>
							Please review your exchange details before
							confirming
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="rounded-md bg-muted p-4 space-y-4">
							<div className="flex justify-between items-center border-b pb-2">
								<h3 className="font-medium">
									Exchange Details
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
										Cryptocurrency
									</p>
									<p className="font-medium">
										{
											cryptocurrencies.find(
												(c) =>
													c.value ===
													exchangeDetails.cryptoType
											)?.label
										}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Amount
									</p>
									<p className="font-medium">
										{exchangeDetails.amount}{" "}
										{exchangeDetails.cryptoType.toUpperCase()}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Target Currency
									</p>
									<p className="font-medium">
										{exchangeDetails.targetCurrency ===
										"usd"
											? "USD (US Dollar)"
											: "NGN (Nigerian Naira)"}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Exchange Rate
									</p>
									<p className="font-medium">
										1{" "}
										{exchangeDetails.cryptoType.toUpperCase()}{" "}
										={" "}
										{exchangeDetails.targetCurrency ===
										"usd"
											? `$${getExchangeRate(
													exchangeDetails.cryptoType,
													"usd"
											  ).toLocaleString()}`
											: `₦${getExchangeRate(
													exchangeDetails.cryptoType,
													"ngn"
											  ).toLocaleString()}`}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										You'll Receive
									</p>
									<p className="font-medium text-lg text-primary">
										{exchangeDetails.targetCurrency ===
										"usd"
											? `$${getExchangeAmount()}`
											: `₦${getExchangeAmount()}`}
									</p>
								</div>
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
											{exchangeDetails.bankName}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Account Number
										</p>
										<p className="font-medium">
											{exchangeDetails.accountNumber}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Account Name
										</p>
										<p className="font-medium">
											{exchangeDetails.accountName}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-md bg-muted p-4 space-y-4">
							<div className="border-b pb-2">
								<h3 className="font-medium">Wallet Details</h3>
							</div>

							<div>
								<p className="text-sm text-muted-foreground">
									Wallet Address
								</p>
								<p className="font-medium break-all">
									{exchangeDetails.walletAddress}
								</p>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
						<Button
							onClick={handleConfirmExchange}
							className="w-full">
							Confirm Exchange
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
							Exchange Initiated!
						</CardTitle>
						<CardDescription>
							Your cryptocurrency exchange has been initiated. You
							will receive your funds shortly.
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
										Send the cryptocurrency to our wallet
										address provided in your email
									</span>
								</li>
								<li className="flex items-start gap-2">
									<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
									<span>
										Once confirmed, we'll transfer the funds
										to your bank account
									</span>
								</li>
								<li className="flex items-start gap-2">
									<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
									<span>
										You can track the status of your
										exchange in the "Transactions" section
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
