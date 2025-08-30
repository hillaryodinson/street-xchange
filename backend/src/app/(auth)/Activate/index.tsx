import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "@/utils/api";
import { LogIn } from "lucide-react";
import { ApiResponse } from "@/utils/types";
import Notification from "@/components/site/notification";

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
		return <Notification variant="pending" />;
	}

	if (status === "success") {
		return (
			<Notification variant="success">
				<>
					<p>Account was activated successfully</p>
					<Link
						to="/login"
						className="flex justify-center align-center gap-2">
						<LogIn className="w-5 h-5" />
						<span>Back to Login</span>
					</Link>
				</>
			</Notification>
		);
	}

	return (
		<Notification variant="error">
			<>
				<p>{errorMessage}</p>
				<Link
					to="/login"
					className="flex justify-center align-center gap-2">
					<LogIn className="w-5 h-5" />
					<span>Back to Login</span>
				</Link>
			</>
		</Notification>
	);
};

export default ActivationPage;
