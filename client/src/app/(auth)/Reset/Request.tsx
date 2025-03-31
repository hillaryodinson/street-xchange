import { Logo } from "@/components/site/logo";
import Notification from "@/components/site/notification";
import api from "@/utils/api";
import { ResetPasswordSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { useState, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const PasswordResetRequestPage = () => {
	const [isLoading, startTransition] = useTransition();
	const [status, setStatus] = useState<string>("pending");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const formSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
		startTransition(async () => {
			try {
				setStatus("pending");
				const APP_URL =
					import.meta.env.VITE_APP_URL || "http://localhost:30001/";
				await api.post("/auth/reset-password", {
					...data,
					callback_url: `${APP_URL}/reset/confirm`,
				});
				setStatus("done");
			} catch (error) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				toast.error((error as any)?.response.data.message);
			}
		});
	};

	return (
		<>
			<Helmet>
				<title>{`Reset Password | ${
					import.meta.env.VITE_APP_NAME
				}`}</title>
			</Helmet>
			{status === "pending" ? (
				<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
					<div className="absolute inset-0 image-wrap z-1 hero-bg-2"></div>

					<div className="container relative z-3">
						<div className="flex justify-center">
							<div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
								<Logo className="mb-2" />
								<h5 className="my-6 text-xl font-semibold text-center">
									Reset Password
								</h5>
								<form
									className="text-start"
									onSubmit={handleSubmit(formSubmit)}>
									<div className="grid grid-cols-1">
										<div className="mb-4">
											<label
												className="font-medium"
												htmlFor="LoginEmail">
												Email Address:
											</label>
											<input
												id="LoginEmail"
												type="email"
												{...register("email")}
												className="form-input border !border-gray-200 dark:!border-gray-800 mt-3"
												placeholder="name@example.com"
											/>
											{errors.email && (
												<p className="text-red-500 text-sm">
													{errors.email?.message}
												</p>
											)}
										</div>

										<div className="mb-4">
											<button
												type="submit"
												className="btn bg-orange-600 hover:bg-orange-700 text-white rounded-md w-full"
												disabled={isLoading}>
												{isLoading && (
													<Loader2 className="animated-spin" />
												)}
												Reset
											</button>
										</div>

										<div className="text-center">
											<span className="text-slate-400 me-2">
												Remember your password ?
											</span>{" "}
											<Link
												to="/login"
												className="text-slate-900 dark:text-white font-bold">
												Login
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			) : status === "done" ? (
				<Notification variant="success">
					<>
						<p>We would send you an email if this email exists</p>
						<Link
							to="/"
							className="flex justify-center align-center gap-2">
							<LogIn className="w-5 h-5" />
							<span>Back to Home</span>
						</Link>
					</>
				</Notification>
			) : (
				<Notification variant="pending" />
			)}
		</>
	);
};

export default PasswordResetRequestPage;
