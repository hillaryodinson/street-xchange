import { useAuthAdminStore } from "@/lib/stores/auth-admin-store";
import api from "@/utils/api";
import { ApiResponse, AuthAdminResponse } from "@/utils/types";
import { LoginSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const AdminLoginPage = () => {
	const params = useParams();
	const { setSession, isAuthenticated } = useAuthAdminStore((state) => state);
	const redirect = useNavigate();
	const [isLoading, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const formSubmit = (data: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			api.post("/auth/adminlogin", data)
				.then((response) => {
					if (response.status !== 200) {
						throw new Error("Invalid username or password");
					}

					const { data, success, message } =
						response.data as ApiResponse<AuthAdminResponse>;
					if (success) {
						if (data) {
							toast.success("Login was successful");

							// context.login(data);
							setSession(data.user, data.token);
							//check for callbackurl
							setTimeout(() => {
								const callback =
									params.redirect || "/sxadmin/dashboard";
								redirect(callback);
							}, 3000);
						}
					} else {
						throw new Error(message);
					}
				})
				.catch((errors) => {
					toast.error(errors.response.data.message);
				});
		});
	};

	if (isAuthenticated()) {
		return <Navigate to="/sxadmin/dashboard" />;
	}

	return (
		<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
			<div className="absolute inset-0 image-wrap z-1 hero-bg-2"></div>

			<div className="container relative z-3">
				<div className="flex justify-center">
					<div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
						<Link to="/">
							<img
								src="assets/images/logo.png"
								className="mx-auto"
								alt=""
							/>
						</Link>
						<h5 className="my-6 text-xl font-semibold">
							Administrator Login
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
									<label
										className="font-medium"
										htmlFor="LoginPassword">
										Password:
									</label>
									<input
										id="LoginPassword"
										type="password"
										{...register("password")}
										className="form-input border !border-gray-200 dark:!border-gray-800 mt-3"
										placeholder="Password"
										disabled={isLoading}
									/>
									{errors.password && (
										<p className="text-red-500 text-sm">
											{errors.password?.message}
										</p>
									)}
								</div>

								<div className="flex justify-between mb-4">
									<div className="flex items-center mb-0">
										<input
											className="form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-green-600 checked:appearance-auto dark:accent-green-600 focus:border-green-300 focus:ring-0 focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2"
											type="checkbox"
											value=""
											id="RememberMe"
											disabled={isLoading}
										/>
										<label
											className="form-checkbox-label text-slate-400"
											htmlFor="RememberMe">
											Remember me
										</label>
									</div>
									<p className="text-slate-400 mb-0">
										<Link
											to="/reset-password"
											className="text-slate-400">
											Forgot password ?
										</Link>
									</p>
								</div>

								<div className="mb-4">
									<button
										type="submit"
										className="btn bg-orange-600 hover:bg-orange-700 text-white rounded-md w-full"
										disabled={isLoading}>
										{isLoading && (
											<Loader2 className="animated-spin" />
										)}
										Sign in
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AdminLoginPage;
