import { Button } from "@/components/ui/button";
import { useErrorBoundary } from "react-error-boundary";
import { DashboardHeader } from "../backend/components/dashboard-header";

export default function BackendErrorFallback({ error }: { error: Error }) {
	const { resetBoundary } = useErrorBoundary();

	return (
		<div className="flex min-h-screen flex-col">
			<DashboardHeader />

			<div className="flex flex-1">
				<div
					className="absolute inset-0 z-0 bg-background"
					style={{
						backgroundImage: "url(/images/dashboard-bg.svg)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>

				{/* Main Content */}
				<main className="flex-1 p-6 pt-16 md:pr-10 md:py-10 relative z-10">
					{error && (
						<div
							role="alert"
							className="card shadow-none border bg-white px-4 py-2 w-1/2 mx-auto mt-10 text-center space-y-4">
							<h2 className="text-xl text-center mb-2">
								Something went wrong
							</h2>
							<small>
								<pre
									style={{
										color: "red",
										wordWrap: "break-word",
									}}>
									{error.message}
								</pre>
								<pre>{error.stack}</pre>
							</small>
							<Button
								onClick={resetBoundary}
								variant={"default"}
								className="mt-6">
								Try again
							</Button>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
