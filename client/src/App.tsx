import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./app/(public)/Home";
import FrontendLayout from "./components/layout/frontend";
import LoginPage from "./app/(auth)/Login";
import DashboardPage from "./app/(account)/Dashboard";
import BackendLayout from "./components/layout/backend";
import { BookFlightForm } from "./app/(account)/FlightBooking";
import { SellGiftCardForm } from "./app/(account)/SellGiftCard";
import { ExchangeCryptoForm } from "./app/(account)/ExchangeCrypto";
import { TransactionsHistory } from "./app/(account)/Transaction";
import { SignupPage } from "./app/(auth)/Registration";
import AdminLoginPage from "./app/(auth)/AdminLogin";
import AdminLayout from "./components/layout/admin";
import AdminDashboardPage from "./app/(admin)/Dashboard";
import { AdminPendingTransactionsPage } from "./app/(admin)/Transactions/Pending";
import { AdminTransactionHistoryPage } from "./app/(admin)/Transactions/History";
import ProtectedRoute from "./middleware/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import ActivationPage from "./app/(auth)/Activate";
import PasswordResetRequestPage from "./app/(auth)/Reset/Request";
import PasswordResetConfirmationPage from "./app/(auth)/Reset/Confirm";

function App() {
	const routes = createBrowserRouter([
		{
			path: "/",
			element: <FrontendLayout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
			],
		},
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			path: "/activate",
			element: <ActivationPage />,
		},
		{
			path: "/admin-login",
			element: <AdminLoginPage />,
		},
		{
			path: "/signup",
			element: <SignupPage />,
		},
		{
			path: "/reset-password",
			element: <PasswordResetRequestPage />,
		},
		{
			path: "/reset/confirm",
			element: <PasswordResetConfirmationPage />,
		},
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<BackendLayout />
				</ProtectedRoute>
			),
			children: [
				{
					path: "/dashboard",
					element: <DashboardPage />,
				},
				{
					path: "/bookings",
					element: <BookFlightForm />,
				},
				{
					path: "/sell/crypto",
					element: <ExchangeCryptoForm />,
				},
				{
					path: "/sell/gift-card",
					element: <SellGiftCardForm />,
				},
				{
					path: "/transaction-history",
					element: <TransactionsHistory />,
				},
			],
		},
		{
			path: "/sxadmin/",
			element: (
				<ProtectedRoute>
					<AdminLayout />
				</ProtectedRoute>
			),
			children: [
				{
					index: true,
					element: <AdminDashboardPage />,
				},
				{
					path: "/sxadmin/dashboard",
					element: <AdminDashboardPage />,
				},
				{
					path: "/sxadmin/transactions/pending",
					element: <AdminPendingTransactionsPage />,
				},
				{
					path: "/sxadmin/user/verification/pending",
				},
				{
					path: "/sxadmin/settings",
				},
				{
					path: "/sxadmin/transaction/history",
					element: <AdminTransactionHistoryPage />,
				},
			],
		},
	]);
	return (
		<>
			<RouterProvider router={routes} />
			<ToastContainer />
		</>
	);
}

export default App;
