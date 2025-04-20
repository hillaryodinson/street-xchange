import { Card, CardContent } from "@/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";

const ErrorFallback = () => {
	return (
		<>
			<Card className="shadow-none border">
				<CardContent className="flex flex-col items-center justify-center">
					<DotLottieReact
						src="/images/oops.lottie"
						autoplay
						className="w-40 h-40"
					/>
					<h1>Oops</h1>
					<p>We are embarrassed you saw that.</p>
					<Button onClick={() => window.location.reload()}>
						Try again
					</Button>
				</CardContent>
			</Card>
		</>
	);
};

export default ErrorFallback;
