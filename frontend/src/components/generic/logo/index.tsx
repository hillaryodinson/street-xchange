import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Logo({
	className,
	href,
}: {
	className?: string;
	href?: string;
}) {
	return (
		<Link href={href ? href : "/"} className="w-200 h-auto">
			<Image
				src="/logo.png"
				className={cn("object-fit w-full", className)}
				alt=""
				width={1000}
				height={1000}
			/>
		</Link>
	);
}
