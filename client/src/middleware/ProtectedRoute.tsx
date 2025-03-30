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
	],
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, clearSession, user } = useAuthStore(
		(state) => state
	);
	const location = useLocation();

	if (!isAuthenticated()) {
		clearSession();
		return <Navigate to="/login" />;
	}

	if (
		!protectedRoutes.userRoutes.includes(location.pathname) &&
		user &&
		user.role == "user"
	) {
		return <Navigate to="/dashboard" />;
	}

	if (
		protectedRoutes.userRoutes.includes(location.pathname) &&
		user &&
		user.role == "admin"
	) {
		return <Navigate to="/sxadmin/dashboard" />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
