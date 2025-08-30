"use client";

import { useState } from "react";
import {
	ArrowLeft,
	CalendarIcon,
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
import { airports, cryptocurrencies } from "@/lib/data";
import { FlightBookinSchema } from "@/utils/zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import FlightConfirmationSection from "@/components/site/booking-flight-confirmation-section";
import api from "@/utils/api";
import { ApiResponse } from "@/utils/types";
import { toast } from "react-toastify";
import BookingConfirmedPage from "@/components/site/booking-confirmed-section";

export function BookFlightForm() {
	const [step, setStep] = useState(1);
	const [flightDetails, setFlightDetails] = useState<z.infer<
		typeof FlightBookinSchema
	> | null>(null);
	const [bookingRef, setBookingRef] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const form = useForm<z.infer<typeof FlightBookinSchema>>({
		resolver: zodResolver(FlightBookinSchema),
		defaultValues: {
			passengers: 1,
			type: "economy",
			paymentMethod: "", // Add this line to initialize paymentMethod
			from: "", // Add this line to initialize from
			to: "", // Add this line to initialize to
			scheduledFlightDate: undefined, // Add this line to initialize scheduledFlightDate
		},
	});

	function onSubmit(values: z.infer<typeof FlightBookinSchema>) {
		setFlightDetails(values);
		setStep(2);
	}

	async function onConfirm() {
		try {
			//send the data to the backend
			const response = await api.post(
				"/transactions/flight/book",
				flightDetails
			);
			const result = response.data as ApiResponse<{ bookingRef: string }>;
			if (result.success && result.data?.bookingRef) {
				setStep(3);
				setBookingRef(result.data?.bookingRef);
				setSuccessMessage(result.message);
			} else {
				throw new Error(result.message);
			}
		} catch (error) {
			const errorMessage =
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(error as any)?.message ||
				"An error occured. Please contact admin";

			toast.error(errorMessage);
		}
	}

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

												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={
																	"outline"
																}
																className={cn(
																	"w-[240px] pl-3 text-left font-normal",
																	!field.value &&
																		"text-muted-foreground"
																)}>
																{field.value ? (
																	format(
																		field.value,
																		"PPP"
																	)
																) : (
																	<span>
																		Pick a
																		date
																	</span>
																)}
																<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent
														className="w-auto p-0"
														align="start">
														<Calendar
															mode="single"
															selected={
																field.value
															}
															onSelect={
																field.onChange
															}
															disabled={{
																before: new Date(),
															}}
															initialFocus
														/>
													</PopoverContent>
												</Popover>

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
				<FlightConfirmationSection
					flightDetails={flightDetails}
					goback={() => setStep(1)}
					onSubmit={() => onConfirm()}
				/>
			)}
			{/* Step 3: Show success Message */}
			{step === 3 && (
				<BookingConfirmedPage
					message={successMessage}
					bookingRef={bookingRef}
				/>
			)}
		</div>
	);
}
