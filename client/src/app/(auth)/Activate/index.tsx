import api from "@/utils/api";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NotificationPage from "../Notification";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ActivationPage = () => {
	const [status, setStatus] = useState<number>(0);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const params = useParams();
	const token = params.token;

	if (!token) {
		setStatus(2);
		setErrorMessage("Invalid activation token");
	}

	if (token) {
		api.post("/auth/activate", { token });
	}

	return status == 0 ? (
		<PendingScreen />
	) : status == 1 ? (
		<NotificationPage message="Account was activated sucessfully" />
	) : (
		<ErrorScreen message={errorMessage} />
	);
};

export default ActivationPage;

const PendingScreen = () => {
	return (
		<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
			<div className="absolute inset-0 image-wrap z-1 hero-bg-2"></div>

			<div className="container relative z-3">
				<div className="flex justify-center">
					<div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
						<div className="flex flex-col gap-6 items-center justify-center">
							<Loader2 className="h-10 w-10 animate-spin" />
							<p>Activating account. Please wait..</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const ErrorScreen = ({ message }: { message: string }) => {
	return (
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
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
