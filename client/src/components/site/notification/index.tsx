import { ReactNode } from "react";
import { ErrorScreen, PendingScreen, SuccessScreen } from "./notices";

const Notification = ({
	variant,
	title,
	children,
}: {
	variant: "success" | "error" | "pending";
	title?: string;
	children?: ReactNode;
}) => {
	return variant == "success" ? (
		<SuccessScreen title={title}>{children}</SuccessScreen>
	) : variant == "error" ? (
		<ErrorScreen title={title}>{children}</ErrorScreen>
	) : (
		<PendingScreen />
	);
};

export default Notification;
