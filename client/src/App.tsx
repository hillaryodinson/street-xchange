import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./frontend.css";
import HomePage from "./app/(public)/Home";
import FrontendLayout from "./components/layout/frontend";

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
	]);
	return <RouterProvider router={routes} />;
}

export default App;
