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
import { Logo } from "@/components/site/logo";
import { Helmet } from "react-helmet";
import Notification from "@/components/site/notification";
import { Home } from "lucide-react";

export function SignupPage() {
	const [isLoading, startTransition] = useTransition();
	const [regSuccess, setRegSuccess] = useState<boolean>(false);

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
		mode: "onTouched",
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
			} catch (error: Error | any) {
				console.log(error?.response?.data);
				toast.error(
					error.response && error?.response?.data
						? error.response.data.message
						: "An error occured please contact admin"
				);
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
			<section className="py-6 md:py-36 flex items-center zoom-image md:overflow-hidden md:absolute">
				<div className="absolute inset-0 image-wrap z-1 hero-bg-2 top-0 bottom-0 left-0"></div>

				<div className="container relative z-3 mx-auto w-full">
					<div className="flex flex-col md:flex-row justify-center w-full mx-auto bg-white dark:bg-slate-900 shadow-md shadow-l-none dark:shadow-gray-700 rounded-md overflow-hidden">
						<div className="w-full md:w-1/2 pr-4 hidden md:block">
							<img
								src={"/images/signup_bg.jpg"}
								className=" object-cover w-full h-full "
							/>
						</div>
						<div className="flex-1 px-6 py-8">
							<Logo />
							<h5 className="my-6 text-xl font-semibold text-center">
								Create your account
							</h5>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-1">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="firstname"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-md font-semibold">
														First Name
													</FormLabel>
													<FormControl>
														<Input
															className="rounded-sm shadow-none"
															placeholder="John"
															{...field}
														/>
													</FormControl>
													<div className="h-[22px] text-xs">
														<FormMessage className="text-right" />
													</div>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="lastname"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-md font-semibold">
														Last Name
													</FormLabel>
													<FormControl>
														<Input
															className="rounded-sm shadow-none"
															placeholder="Doe"
															{...field}
														/>
													</FormControl>
													<div className="h-[22px] text-xs">
														<FormMessage className="text-right" />
													</div>
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-md font-semibold">
													Email
												</FormLabel>
												<FormControl>
													<Input
														className="rounded-sm shadow-none"
														type="email"
														placeholder="john.doe@example.com"
														{...field}
													/>
												</FormControl>
												<div className="h-[12px] text-xs">
													<FormMessage className="text-right" />
												</div>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="phoneNumber"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-md font-semibold">
													Phone Number
												</FormLabel>
												<FormControl>
													<Input
														className="rounded-sm shadow-none"
														placeholder="+1234567890"
														{...field}
													/>
												</FormControl>
												<div className="h-[12px] text-xs">
													<FormMessage className="text-right" />
												</div>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-md font-semibold">
													Password
												</FormLabel>
												<FormControl>
													<Input
														className="rounded-sm shadow-none"
														type="password"
														{...field}
													/>
												</FormControl>
												<div className="h-[12px] text-xs">
													<FormMessage className="text-right" />
												</div>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-md font-semibold">
													Confirm Password
												</FormLabel>
												<FormControl>
													<Input
														className="rounded-sm shadow-none"
														type="password"
														{...field}
													/>
												</FormControl>
												<div className="h-[12px] text-xs">
													<FormMessage className="text-right" />
												</div>
											</FormItem>
										)}
									/>

									<Button
										type="submit"
										className="w-full h-12"
										disabled={
											isLoading || !form.formState.isValid
										}>
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
