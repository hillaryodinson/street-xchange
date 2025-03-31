import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Logo({ className }: { className?: string }) {
	return (
		<Link to="/">
			<img
				src="/images/logo-2.png"
				className={cn("mx-auto w-[200px]", className)}
				alt=""
			/>
		</Link>
	);
}
