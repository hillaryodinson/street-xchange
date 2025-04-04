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
import MyProfilePage from "./app/(account)/Profile";
import NotFoundPage from "./app/(public)/Home/errors/notFound";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function ErrorFallback({ error }: { error: Error }) {
	const { resetBoundary } = useErrorBoundary();

	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre style={{ color: "red" }}>{error.message}</pre>
			<button onClick={resetBoundary}>Try again</button>
		</div>
	);
}

function App() {
	const queryClient = new QueryClient();
	const routes = createBrowserRouter([
		{
			path: "/",
			element: <FrontendLayout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				{
					path: "*",
					element: <NotFoundPage />,
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
				<ErrorBoundary
					fallbackRender={({ error }) => (
						<ErrorFallback error={error} />
					)}>
					<ProtectedRoute>
						<BackendLayout />
					</ProtectedRoute>
				</ErrorBoundary>
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
				{
					path: "/my-profile",
					element: <MyProfilePage />,
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
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={routes} />
				<ToastContainer />
			</QueryClientProvider>
		</>
	);
}

export default App;
