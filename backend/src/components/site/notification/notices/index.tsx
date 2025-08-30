import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

export const PendingScreen = () => (
	<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
		<div className="absolute inset-0 image-wrap z-1 hero-bg-2"></div>
		<div className="container relative z-3">
			<div className="flex justify-center">
				<div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
					<div className="flex flex-col gap-6 items-center justify-center">
						<Loader2 className="h-10 w-10 animate-spin" />
						<p>Activating account. Please wait...</p>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export const ErrorScreen = ({
	title,
	children,
}: {
	title?: string;
	children: ReactNode;
}) => (
	<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
		<div className="absolute inset-0 image-wrap z-1 hero-bg-2"></div>
		<div className="container relative z-3">
			<div className="flex justify-center">
				<div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
					<div className="flex flex-col gap-6 items-center justify-center">
						<DotLottieReact
							src="/images/error.lottie"
							autoplay
							className="w-20 h-20"
						/>
						{title && (
							<h2 className="font-semibold text-lg">{title}</h2>
						)}
						{children}
					</div>
				</div>
			</div>
		</div>
	</section>
);

export const SuccessScreen = ({
	title,
	children,
}: {
	title?: string;
	children: ReactNode;
}) => {
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
							{title && (
								<h2 className="font-semibold text-lg">
									{title}
								</h2>
							)}
							{children}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
