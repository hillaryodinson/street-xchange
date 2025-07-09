import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	// FormDescription,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom";
import { registerFormSchema } from "@/utils/zod";
import api from "@/utils/api";
import { ApiResponse } from "@/utils/types";
import { toast } from "react-toastify";
import { Country } from "react-phone-number-input";
import { Logo } from "@/components/site/logo";
import { Helmet } from "react-helmet";
// import { ChevronDownIcon, Home } from "lucide-react";
import Notification from "@/components/site/notification";
import { Home } from "lucide-react";
// import LocationSelector from "@/components/site/location-picker";

// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";

export function SignupPage() {
	const [isLoading, startTransition] = useTransition();
	const [regSuccess, setRegSuccess] = useState<boolean>(false);
	// const [countryName, setCountryName] = useState<string>("");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setCountryIso] = useState<Country>("CA");
	// const [stateName, setStateName] = useState<string>("");
	// const [open, setOpen] = useState(false);
	// const [date, setDate] = useState<Date | undefined>(undefined);

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
		startTransition(async () => {
			try {
				// values.address = `${values.address}, ${stateName}, ${countryName}`;
				const res = await api.post("/customers/register", values);
				const result = (await res.data) as ApiResponse<undefined>;
				if (result.success) {
					setRegSuccess(true);
				}
			} catch (error) {
				console.log(error);
				toast.error("An error occured please contact admin");
			}
		});
	};

	if (regSuccess) {
		return (
			<Notification variant="success">
				<>
					<p>
						Registration was successful please check your email for
						activation steps
					</p>
					<Link
						to="/"
						className="flex justify-center align-center gap-2">
						<Home className="w-5 h-5" />
						<span>Back to Home</span>
					</Link>
				</>
			</Notification>
		);
	}

	return (
		<>
			<Helmet>
				<title>{`Signup | ${import.meta.env.VITE_APP_NAME}`}</title>
			</Helmet>
			<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
				<div className="absolute inset-0 image-wrap z-1 hero-bg-2"></div>

				<div className="container relative z-3 mx-auto w-full">
					<div className="flex justify-center w-full max-w-[800px] mx-auto p-6 bg-white dark:bg-slate-900 shadow-md shadow-l-none dark:shadow-gray-700 rounded-md">
						<div className="w-1/2 pr-4">
							<img
								src={"/images/signup_bg.jpg"}
								className=" object-cover w-full h-full rounded-md "
							/>
						</div>
						<div className="w-1/2 m-auto px-4">
							<Logo />
							<h5 className="my-6 text-xl font-semibold text-center">
								Create your account
							</h5>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
										<FormField
											control={form.control}
											name="firstname"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														First Name
													</FormLabel>
													<FormControl>
														<Input
															placeholder="John"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="lastname"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Last Name
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Doe"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															type="email"
															placeholder="john.doe@example.com"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="phoneNumber"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Phone Number
													</FormLabel>
													<FormControl>
														<Input
															placeholder="+1234567890"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									{/* <FormField
										control={form.control}
										name="dateOfBirth"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>
													Date of Birth
												</FormLabel>
												<FormControl>
													<Popover
														open={open}
														onOpenChange={setOpen}>
														<PopoverTrigger asChild>
															<Button
																variant="outline"
																id="date"
																className="w-48 justify-between font-normal">
																{date
																	? date.toLocaleDateString()
																	: "Select date"}
																<ChevronDownIcon />
															</Button>
														</PopoverTrigger>
														<PopoverContent
															className="w-auto overflow-hidden p-0"
															align="start">
															<Calendar
																mode="single"
																selected={date}
																captionLayout="dropdown"
																onSelect={(
																	date
																) => {
																	setDate(
																		date
																	);
																	setOpen(
																		false
																	);
																	form.setValue(
																		field.name,
																		date?.toISOString() ||
																			""
																	);
																}}
															/>
														</PopoverContent>
													</Popover>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/> */}

									{/* <FormItem>
										<FormLabel>Select Country</FormLabel>
										<FormControl>
											<LocationSelector
												onCountryChange={(country) => {
													setCountryName(
														country?.name || ""
													);
													setCountryIso(
														country?.iso2 as Country
													);
												}}
												onStateChange={(state) => {
													setStateName(
														state?.name || ""
													);
												}}
											/>
										</FormControl>
										<FormDescription>
											If your country has states, it will
											be appear after selecting country
										</FormDescription>
										<FormMessage />
									</FormItem> */}

									{/* <FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Residential Address
												</FormLabel>
												<FormControl>
													<Input
														placeholder="123 Main St"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/> */}

									<div className="grid gap-4 grid-cols-1 sm:grid-cols-1">
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Password
													</FormLabel>
													<FormControl>
														<Input
															type="password"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="confirmPassword"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Confirm Password
													</FormLabel>
													<FormControl>
														<Input
															type="password"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<Button
										type="submit"
										className="w-full"
										disabled={isLoading}>
										{isLoading
											? "Registering..."
											: "Register"}
									</Button>
								</form>
							</Form>

							<div className="text-center text-sm">
								<span className="text-muted-foreground">
									Already have an account?
								</span>{" "}
								<Link
									type="button"
									className="text-primary underline font-medium"
									to="/login">
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
