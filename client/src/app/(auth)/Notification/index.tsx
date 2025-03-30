import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationPage = ({ message }: { message: string }) => {
	return (
		<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
			<div className="absolute inset-0 image-wrap z-1 hero-bg-2"></div>

			<div className="container relative z-3">
				<div className="flex justify-center">
					<div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
						<div className="flex flex-col gap-6 items-center justify-center">
							<DotLottieReact
								src="/images/success.lottie"
								autoplay
								className="w-20 h-20"
							/>
							<p>{message}</p>
							<Link
								to="/login"
								className="flex justify-center align-center gap-2">
								<LogIn className="w-5 h-5" />
								<span>Back to Login</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotificationPage;
