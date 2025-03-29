import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./app/(public)/Home";
import FrontendLayout from "./components/layout/frontend";
import LoginPage from "./app/(auth)/Login";
import DashboardPage from "./app/(account)/Dashboard";
import BackendLayout from "./components/layout/backend";
import { BookFlightForm } from "./app/(account)/FlightBooking";
import { SellGiftCardForm } from "./app/(account)/SellGiftCard";
import { ExchangeCryptoForm } from "./app/(account)/ExchangeCrypto";

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
			path: "/dashboard",
			element: <BackendLayout />,
			children: [
				{
					index: true,
					element: <DashboardPage />,
				},
				{
					path: "/dashboard/bookings",
					element: <BookFlightForm />,
				},
				{
					path: "/dashboard/sell/crypto",
					element: <ExchangeCryptoForm />,
				},
				{
					path: "/dashboard/sell/gift-card",
					element: <SellGiftCardForm />,
				},
			],
		},
	]);
	return <RouterProvider router={routes} />;
}

export default App;
