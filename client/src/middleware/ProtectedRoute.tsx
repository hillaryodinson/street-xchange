import { useAuthStore } from "@/lib/stores/auth-store";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const protectedRoutes = {
	userRoutes: [
		"/dashboard",
		"/bookings",
		"/sell/crypto",
		"/sell/gift-card",
		"/transaction-history",
		"/my-profile",
		"/payments/transaction/",
	],
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, clearSession, user } = useAuthStore(
		(state) => state
	);
	const location = useLocation();

	if (!isAuthenticated()) {
		clearSession();
		console.log("Not authenticated");
		// Redirect to login page if not authenticated
		// and the current path is not the login page
		return <Navigate to="/login" />;
	}

	if (
		!protectedRoutes.userRoutes.includes(location.pathname) &&
		!protectedRoutes.userRoutes.some((route) =>
			location.pathname.startsWith(route)
		) &&
		user &&
		user.role == "customer"
	) {
		return <Navigate to="/dashboard" />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
