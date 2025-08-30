import { useAuthAdminStore } from "@/lib/stores/auth-admin-store";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const protectedRoutes = {
	adminRoutes: [
		"/sxadmin/dashboard",
		"/sxadmin/transactions/pending",
		"/sxadmin/user/verification/pending",
		"/sxadmin/settings",
		"/sxadmin/transaction/history",
		"/sxadmin/my-profile",
	],
};

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, clearSession, user } = useAuthAdminStore(
		(state) => state
	);
	const location = useLocation();

	if (!isAuthenticated()) {
		clearSession();
		return <Navigate to="/admin-login" />;
	}

	if (
		!protectedRoutes.adminRoutes.includes(location.pathname) &&
		user &&
		user.role == "sxadmin"
	) {
		return <Navigate to="/sxadmin/dashboard" />;
	}

	return <>{children}</>;
};

export default AdminProtectedRoute;
