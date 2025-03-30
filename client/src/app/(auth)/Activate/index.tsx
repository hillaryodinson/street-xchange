import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "@/utils/api";
import { Loader2, LogIn } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NotificationPage from "../Notification";
import { ApiResponse } from "@/utils/types";

const ActivationPage = () => {
	const [status, setStatus] = useState<"pending" | "success" | "error">(
		"pending"
	);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const token = queryParams.get("token");

		if (!token) {
			setStatus("error");
			setErrorMessage("Invalid activation token");
			return;
		}

		const activateAccount = async () => {
			try {
				const response = await api.post("/auth/activate", { token });
				const result = response.data as ApiResponse<undefined>;

				if (result.success) {
					setStatus("success");
				} else {
					setStatus("error");
					setErrorMessage(result.message);
				}
			} catch (error) {
				console.log("ERROR", error);
				setStatus("error");
				setErrorMessage(
					typeof error == "object"
						? // eslint-disable-next-line @typescript-eslint/no-explicit-any
						  (error as any)?.response?.data?.message
						: "An unexpected error occurred. Please try again."
				);
			}
		};

		setTimeout(() => {
			activateAccount();
		}, 2000);
	}, [location.search]);

	if (status === "pending") {
		return <PendingScreen />;
	}

	if (status === "success") {
		return (
			<NotificationPage message="Account was activated successfully" />
		);
	}

	return <ErrorScreen message={errorMessage} />;
};

export default ActivationPage;

const PendingScreen = () => (
	<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
		<div className="absolute inset-0 image-wrap z-1 hero-bg-2"></div>
		<div className="container relative z-3">
			<div className="flex justify-center">
				<div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
					<div className="flex flex-col gap-6 items-center justify-center">
						<Loader2 className="h-10 w-10 animate-spin" />
						<p>Activating account. Please wait...</p>
					</div>
				</div>
			</div>
		</div>
	</section>
);

const ErrorScreen = ({ message }: { message: string }) => (
	<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
		<div className="absolute inset-0 image-wrap z-1 hero-bg-2"></div>
		<div className="container relative z-3">
			<div className="flex justify-center">
				<div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
					<div className="flex flex-col gap-6 items-center justify-center">
						<DotLottieReact
							src="/images/error.lottie"
							autoplay
							className="w-20 h-20"
						/>
						<p>{message}</p>
						<Link
							to="/login"
							className="flex justify-center align-center gap-2">
							<LogIn className="w-5 h-5" />
							<span>Back to Login</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	</section>
);
