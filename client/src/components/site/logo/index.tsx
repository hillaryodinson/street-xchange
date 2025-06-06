import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Logo({
	className,
	href,
}: {
	className?: string;
	href?: string;
}) {
	return (
		<Link to={href ? href : "/"}>
			<img
				src="/images/logo-2.png"
				className={cn("mx-auto w-[200px]", className)}
				alt=""
			/>
		</Link>
	);
}
