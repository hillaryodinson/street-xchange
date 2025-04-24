import { useEffect, useState } from "react";
import { ArrowLeft, Wallet } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import api from "@/utils/api";
import { ApiResponse, BankType, cryptoType, networkType } from "@/utils/types";
import { toCurrency } from "@/utils/helper";
import { cryptoTransactionFormSchema } from "@/utils/zod";
import { useTransition } from "react";
import { toast } from "react-toastify";

export function ExchangeCryptoForm() {
	const [step, setStep] = useState(1);
	const [targetCurrency, setTargetCurrency] = useState("usd"); //currency client is receiving
	const navigate = useNavigate();

	const [targetCryptoCurrency, setTargetCryptoCurrency] = useState<
		string | null
	>(null); //currency to transfer (BTC , ETH)
	const [targetAmt, setTargetAmt] = useState(0); //amount client  is receiveing
	const [targetNetwork, setTargetNetwork] = useState<string | undefined>(
		undefined
	); //network selected by the client to transfer funds through
	const [cryptoCurrentPrice, setCryptoCurrentPrice] = useState<number | null>(
		null
	); // current crypto price from crypto api. depends on the target Crypto Currency
	const [cryptoToTransfer, setCryptoToTransfer] = useState<number | null>(
		null
	); // calculated crypto currency the client would transfer

	const [supportedNetworks, setSupportedNetworks] = useState<networkType[]>(
		[]
	); // supported networks for a particular crypto currency

	// const [exchangeRateUSD, setExchangeRateUSD] = useState<number | null>(null);
	// const [exchangeRateNGN, setExchangeRateNGN] = useState<number | null>(null);
	const [exchangeDetails, setExchangeDetails] = useState<z.infer<
		typeof cryptoTransactionFormSchema
	> | null>(null);
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof cryptoTransactionFormSchema>>({
		resolver: zodResolver(cryptoTransactionFormSchema),
		defaultValues: {
			cryptoTypeSent: "",
			cryptoAmountSent: 0,
			fiatAmountReceived: undefined,
			fiatCurrency: "usd",
			fiatRate: 0,
			currentUSDRate: 0,
			walletAddress: "",
			walletNetwork: "",
			bankName: "",
			accountNo: "",
			accountName: "",
		},
	});

	const [
		{ data: cryptocurrencies },
		{ data: sx_ngn_rate },
		{ data: accounts },
	] = useQueries({
		queries: [
			{
				queryKey: ["fetch_cryptocurrencies"],
				queryFn: async () => {
					const response = await api.get("/wallets/supported-crypto");
					const result = response.data as ApiResponse<cryptoType[]>;
					if (result.success) return result.data;
				},
				staleTime: 1000 * 60 * 60 * 4, // 5 hours
			},
			{
				queryKey: ["fetch_rate"],
				queryFn: async () => {
					const response = await api.get(
						"/settings?setting=ngn_rate"
					);
					const result = response.data as ApiResponse<string>;
					if (result.success)
						return result.data ? parseFloat(result.data) : 0;
				},
				staleTime: 1000 * 60 * 60, // 1 hour
			},
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

	function onSubmit(values: z.infer<typeof cryptoTransactionFormSchema>) {
		setExchangeDetails(values);
		setStep(2);
	}

	const handleConfirmExchange = () => {
		// Here you would handle the actual exchange process
		startTransition(() => {
			api.post("/transactions/crypto/sell-order", exchangeDetails)
				.then((response) => {
					if (response.data.success) {
						console.log("Exchange successful:", response.data);
						toast.success(
							"Exchange successful! Check your email for details."
						);
						// Reset the form or redirect the user
						form.reset();
						navigate(
							"/payments/transaction/" + response.data.transId
						);
					} else {
						console.error("Exchange failed:", response.data);
						toast.error("Exchange failed! Please try again later.");
					}
				})
				.catch((error) => {
					console.error("Error during exchange:", error);
					toast.error("An error occurred! Please try again later.");
				});
		});
		// For now, we'll just show a success message
		setStep(3);
	};

	useEffect(() => {
		handlePriceChange(targetAmt);
	}, [form, targetCurrency, targetAmt, targetCryptoCurrency]);

	useEffect(() => {
		const getExchangeRate = async (symbol: string | null) => {
			if (symbol != null) {
				api.get(
					`https://api.blockchain.com/v3/exchange/tickers/${symbol.toUpperCase()}-USD`
				).then((response) => {
					setCryptoCurrentPrice(response.data.last_trade_price);
				});
			}
		};

		const getSupportedNetworks = async (symbol: string | null) => {
			if (symbol != null) {
				api.get(
					`/wallets/supported-crypto/networks?crypto=${symbol.toUpperCase()}`
				).then((response) => {
					console.log(response);
					setSupportedNetworks(response.data.data);
				});
			}
		};

		getExchangeRate(targetCryptoCurrency);
		getSupportedNetworks(targetCryptoCurrency);
	}, [targetCryptoCurrency]);

	useEffect(() => {
		const getPaymentWalletAddress = async (
			symbol: string | null,
			network: string | undefined
		) => {
			if (network != undefined && symbol != null) {
				api.get(
					`/wallets/random?symbol=${symbol.toUpperCase()}&network=${network}`
				).then((response) => {
					form.setValue("walletAddress", response.data.data.address);
				});
			}
		};

		getPaymentWalletAddress(targetCryptoCurrency, targetNetwork);
	}, [targetNetwork, targetCryptoCurrency]);

	const handlePriceChange = (userAmount: number) => {
		console.log("handle price change triggered");
		let amtOfCryptoToTransfer;
		if (targetCurrency.toLowerCase() === "ngn") {
			amtOfCryptoToTransfer =
				userAmount && cryptoCurrentPrice && sx_ngn_rate
					? userAmount / sx_ngn_rate / cryptoCurrentPrice
					: null;
		} else {
			amtOfCryptoToTransfer =
				userAmount && cryptoCurrentPrice
					? userAmount / cryptoCurrentPrice
					: null;
		}
		const roundedRate =
			amtOfCryptoToTransfer &&
			amtOfCryptoToTransfer.toString().includes(".")
				? Math.ceil(amtOfCryptoToTransfer * 1e9) / 1e9
				: amtOfCryptoToTransfer;

		setCryptoToTransfer(roundedRate);
		form.setValue("currentUSDRate", cryptoCurrentPrice || 0);
		form.setValue("cryptoAmountSent", roundedRate || 0);
		form.setValue("fiatRate", sx_ngn_rate || 0);
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
						{form.formState.errors && (
							<div className="mb-4">
								{Object.entries(form.formState.errors).map(
									([key, error]) => (
										<p key={key}>
											{error.message} ({key})
										</p>
									)
								)}
							</div>
						)}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6">
								<FormField
									control={form.control}
									name="cryptoAmountSent"
									render={({ field }) => (
										<Input
											type="hidden"
											{...field}
											value={cryptoToTransfer || ""}
										/>
									)}
								/>
								<FormField
									control={form.control}
									name="currentUSDRate"
									render={({ field }) => (
										<Input
											type="hidden"
											{...field}
											value={cryptoCurrentPrice || ""}
										/>
									)}
								/>
								<FormField
									control={form.control}
									name="fiatCurrency"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>
												Target Currency
											</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={(value) => {
														field.onChange(value);
														setTargetCurrency(
															value
														);
													}}
													defaultValue={field.value}
													className="flex flex-col space-y-1">
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="usd" />
														</FormControl>
														<FormLabel className="font-normal">
															USD (US Dollar){" "}
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
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="cryptoTypeSent"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Cryptocurrency
												</FormLabel>
												<Select
													onValueChange={(value) => {
														field.onChange(value);
														setTargetCryptoCurrency(
															value!
														);
													}}
													value={field.value || ""}
													defaultValue={field.value}>
													<FormControl className="!w-full">
														<SelectTrigger>
															<SelectValue placeholder="Select cryptocurrency" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{cryptocurrencies &&
															cryptocurrencies?.map(
																(listitem) => (
																	<SelectItem
																		key={
																			listitem.id
																		}
																		value={
																			listitem.symbol
																		}>
																		{`${listitem.name} (${listitem.symbol})`}
																	</SelectItem>
																)
															)}
													</SelectContent>
												</Select>
												<FormDescription>
													Select cryptocurrency you
													want to exchange
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="fiatAmountReceived"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Amount in{" "}
													{targetCurrency.toUpperCase()}
												</FormLabel>
												<FormControl>
													<Input
														type="number"
														step="10"
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

															setTargetAmt(
																value!
															);
															field.onChange(
																value
															);
														}}
														onKeyUp={(e) => {
															const value =
																e.currentTarget
																	.value ===
																""
																	? undefined
																	: Number.parseFloat(
																			e
																				.currentTarget
																				.value
																	  );
															setTargetAmt(
																value!
															);

															field.onChange(
																e.currentTarget
																	.value
															);
														}}
													/>
												</FormControl>
												<FormDescription>
													Enter the amount you want to
													receive
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{cryptoToTransfer && (
									<div className="rounded-md bg-muted p-4">
										<h3 className="text-lg font-medium mb-2">
											Transfer
										</h3>
										<p className="text-sm text-muted-foreground">
											{cryptoToTransfer}{" "}
											{targetCryptoCurrency}
										</p>
									</div>
								)}
								<FormField
									control={form.control}
									name="walletNetwork"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Preferred Network
											</FormLabel>
											<Select
												onValueChange={(value) => {
													setTargetNetwork(value);
													field.onChange(value);
												}}>
												<FormControl className="!w-full">
													<SelectTrigger>
														<SelectValue placeholder="Select Network" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{supportedNetworks.length >
														0 &&
														supportedNetworks?.map(
															(listitem) => (
																<SelectItem
																	key={
																		listitem.id
																	}
																	value={
																		listitem.network
																	}>
																	{
																		listitem.network
																	}
																</SelectItem>
															)
														)}
												</SelectContent>
											</Select>
											<FormDescription>
												Select prefered network
											</FormDescription>
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
													disabled={true}
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
														"accountNo",
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
															key={
																account.accountNo
															}
															value={
																account.accountNo
															}>
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
													<FormLabel>
														Bank Name
													</FormLabel>
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
											name="accountNo"
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
													<FormLabel>
														Account Name
													</FormLabel>
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
										{" "}
										{exchangeDetails.cryptoTypeSent.toUpperCase()}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Amount
									</p>
									<p className="font-medium">
										{exchangeDetails.cryptoAmountSent}{" "}
										{exchangeDetails.cryptoTypeSent.toUpperCase()}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Target Currency
									</p>
									<p className="font-medium">
										{targetCurrency === "usd"
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
										{exchangeDetails.cryptoTypeSent.toUpperCase()}{" "}
										={" "}
										{targetCurrency === "usd"
											? `${toCurrency(
													cryptoCurrentPrice || 0,
													"USD"
											  )}`
											: `${toCurrency(
													(cryptoCurrentPrice || 0) *
														(sx_ngn_rate || 0),
													"NGN"
											  )}`}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										You'll Receive
									</p>
									<p className="font-medium text-lg text-primary">
										{targetCurrency === "usd"
											? `${toCurrency(targetAmt, "USD")}`
											: `${toCurrency(targetAmt, "NGN")}`}
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
											{exchangeDetails.accountNo}
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
							<div>
								<p className="text-sm text-muted-foreground">
									Wallet Network
								</p>
								<p className="font-medium break-all">
									{targetNetwork}
								</p>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
						<Button
							onClick={handleConfirmExchange}
							className="w-full"
							disabled={isPending}>
							{isPending ? "Processing..." : "Confirm Exchange"}
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
		</div>
	);
}
