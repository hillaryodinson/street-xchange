"use client";

import { useState } from "react";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	ChevronsUpDown,
	Plane,
} from "lucide-react";
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
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const airports = [
	{ value: "jfk", label: "New York (JFK)" },
	{ value: "lax", label: "Los Angeles (LAX)" },
	{ value: "lhr", label: "London (LHR)" },
	{ value: "cdg", label: "Paris (CDG)" },
	{ value: "dxb", label: "Dubai (DXB)" },
	{ value: "hnd", label: "Tokyo (HND)" },
	{ value: "sin", label: "Singapore (SIN)" },
	{ value: "syd", label: "Sydney (SYD)" },
] as const;

const cryptocurrencies = [
	{ value: "btc", label: "Bitcoin (BTC)" },
	{ value: "eth", label: "Ethereum (ETH)" },
	{ value: "usdt", label: "Tether (USDT)" },
	{ value: "bnb", label: "Binance Coin (BNB)" },
	{ value: "sol", label: "Solana (SOL)" },
	{ value: "xrp", label: "Ripple (XRP)" },
] as const;

const formSchema = z
	.object({
		from: z.string({
			required_error: "Please select a departure airport.",
		}),
		to: z.string({
			required_error: "Please select a destination airport.",
		}),
		scheduledFlightDate: z.string({
			required_error: "Please select a flight date.",
		}),
		type: z.enum(["economy", "business", "firstClass"], {
			required_error: "Please select a flight class.",
		}),
		paymentMethod: z.string({
			required_error: "Please select a cryptocurrency for payment.",
		}),
		passengers: z.coerce.number().min(1).max(10),
	})
	.refine((data) => data.from !== data.to, {
		message: "Departure and destination airports cannot be the same.",
		path: ["to"],
	});

export function BookFlightForm() {
	const [step, setStep] = useState(1);
	const [flightDetails, setFlightDetails] = useState<z.infer<
		typeof formSchema
	> | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			passengers: 1,
			type: "economy",
			paymentMethod: "", // Add this line to initialize paymentMethod
			from: "", // Add this line to initialize from
			to: "", // Add this line to initialize to
			scheduledFlightDate: "", // Add this line to initialize scheduledFlightDate
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setFlightDetails(values);
		setStep(2);
	}

	const getFlightPrice = () => {
		if (!flightDetails) return 0;

		const basePrice = 250; // Base price for economy
		const typeMultiplier =
			flightDetails.type === "economy"
				? 1
				: flightDetails.type === "business"
				? 2.5
				: 4; // First class

		return basePrice * typeMultiplier * flightDetails.passengers;
	};

	const getCryptoAmount = () => {
		if (!flightDetails) return 0;

		const price = getFlightPrice();
		const cryptoRates = {
			btc: 43250, // 1 BTC = $43,250
			eth: 3150, // 1 ETH = $3,150
			usdt: 1, // 1 USDT = $1
			bnb: 530, // 1 BNB = $530
			sol: 102, // 1 SOL = $102
			xrp: 0.5, // 1 XRP = $0.50
		};

		const selectedCrypto =
			flightDetails.paymentMethod as keyof typeof cryptoRates;
		return (price / cryptoRates[selectedCrypto]).toFixed(6);
	};

	const handleConfirmBooking = () => {
		// Here you would handle the actual booking process
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
					<Plane className="h-6 w-6 text-primary" />
				</div>
				<div>
					<h1 className="text-3xl font-bold">
						Book Flight with Crypto
					</h1>
					<p className="text-muted-foreground">
						Book your next flight and pay with cryptocurrency
					</p>
				</div>
			</div>

			{/* Step 1: Flight Details Form */}
			{step === 1 && (
				<Card>
					<CardHeader>
						<CardTitle>Flight Details</CardTitle>
						<CardDescription>
							Enter your flight information
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
										name="from"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel>From</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																role="combobox"
																className={cn(
																	"justify-between",
																	!field.value &&
																		"text-muted-foreground"
																)}>
																{field.value
																	? airports.find(
																			(
																				airport
																			) =>
																				airport.value ===
																				field.value
																	  )?.label
																	: "Select departure airport"}
																<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="p-0">
														<Command>
															<CommandInput placeholder="Search airport..." />
															<CommandList>
																<CommandEmpty>
																	No airport
																	found.
																</CommandEmpty>
																<CommandGroup>
																	{airports.map(
																		(
																			airport
																		) => (
																			<CommandItem
																				value={
																					airport.label
																				}
																				key={
																					airport.value
																				}
																				onSelect={() => {
																					form.setValue(
																						"from",
																						airport.value
																					);
																				}}>
																				<Check
																					className={cn(
																						"mr-2 h-4 w-4",
																						airport.value ===
																							field.value
																							? "opacity-100"
																							: "opacity-0"
																					)}
																				/>
																				{
																					airport.label
																				}
																			</CommandItem>
																		)
																	)}
																</CommandGroup>
															</CommandList>
														</Command>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="to"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel>To</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																role="combobox"
																className={cn(
																	"justify-between",
																	!field.value &&
																		"text-muted-foreground"
																)}>
																{field.value
																	? airports.find(
																			(
																				airport
																			) =>
																				airport.value ===
																				field.value
																	  )?.label
																	: "Select destination airport"}
																<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="p-0">
														<Command>
															<CommandInput placeholder="Search airport..." />
															<CommandList>
																<CommandEmpty>
																	No airport
																	found.
																</CommandEmpty>
																<CommandGroup>
																	{airports.map(
																		(
																			airport
																		) => (
																			<CommandItem
																				value={
																					airport.label
																				}
																				key={
																					airport.value
																				}
																				onSelect={() => {
																					form.setValue(
																						"to",
																						airport.value
																					);
																				}}>
																				<Check
																					className={cn(
																						"mr-2 h-4 w-4",
																						airport.value ===
																							field.value
																							? "opacity-100"
																							: "opacity-0"
																					)}
																				/>
																				{
																					airport.label
																				}
																			</CommandItem>
																		)
																	)}
																</CommandGroup>
															</CommandList>
														</Command>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<FormField
										control={form.control}
										name="scheduledFlightDate"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Flight Date
												</FormLabel>
												<FormControl>
													<Input
														type="date"
														{...field}
														min={
															new Date()
																.toISOString()
																.split("T")[0]
														}
													/>
												</FormControl>
												<FormDescription>
													Date of flight
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="passengers"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Passengers
												</FormLabel>
												<FormControl>
													<Input
														type="number"
														min={1}
														max={10}
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Number of passengers (1-10)
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>Flight Class</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
													className="flex flex-col space-y-1">
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="economy" />
														</FormControl>
														<FormLabel className="font-normal">
															Economy
														</FormLabel>
													</FormItem>
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="business" />
														</FormControl>
														<FormLabel className="font-normal">
															Business
														</FormLabel>
													</FormItem>
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="firstClass" />
														</FormControl>
														<FormLabel className="font-normal">
															First Class
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
									name="paymentMethod"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Payment Method (Cryptocurrency)
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value || ""} // Add this line to ensure value is never undefined
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

								<Button type="submit" className="w-full">
									Continue to Review
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			)}
			{/* Step 2: Review and Confirm */}
			{step === 2 && flightDetails && (
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
										From
									</p>
									<p className="font-medium">
										{
											airports.find(
												(a) =>
													a.value ===
													flightDetails.from
											)?.label
										}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										To
									</p>
									<p className="font-medium">
										{
											airports.find(
												(a) =>
													a.value === flightDetails.to
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
								<div className="flex justify-between">
									<p className="text-sm">Price in USD</p>
									<p className="font-medium">
										${getFlightPrice().toLocaleString()}
									</p>
								</div>
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
										{getCryptoAmount()}{" "}
										{flightDetails.paymentMethod.toUpperCase()}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
						<Button
							onClick={handleConfirmBooking}
							className="w-full">
							Confirm and Pay
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
							Booking Confirmed!
						</CardTitle>
						<CardDescription>
							Your flight has been booked successfully. You will
							receive a confirmation email shortly.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="rounded-md bg-muted p-4">
							<div className="text-center">
								<p className="text-sm text-muted-foreground">
									Booking Reference
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
										Check your email for booking
										confirmation details
									</span>
								</li>
								<li className="flex items-start gap-2">
									<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
									<span>
										You can view your booking in the "My
										Trips" section
									</span>
								</li>
								<li className="flex items-start gap-2">
									<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
									<span>
										Online check-in will be available 24
										hours before departure
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
