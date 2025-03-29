import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./frontend.css";
import HomePage from "./app/(public)/Home";
import FrontendLayout from "./components/layout/frontend";
import LoginPage from "./app/(auth)/Login";

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
	]);
	return <RouterProvider router={routes} />;
}

export default App;
