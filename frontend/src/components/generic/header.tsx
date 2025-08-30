import { cn } from "@/lib/utils";
import React from "react";

const Header = ({
	children,
	className,
	containerClass,
}: {
	children: React.ReactNode;
	className?: string;
	containerClass?: string;
}) => {
	return (
		<div className={containerClass}>
			<h1
				className={cn(
					"text-5xl font-bold mb-6 text-center sm:text-left",
					className
				)}>
				{children}
			</h1>
			<div className="flex items-center gap-2 mb-4 mx-auto w-full justify-center sm:justify-start">
				<div className="sm:hidden w-[5px] h-[5px] bg-orange-400 rounded-full"></div>
				<div className="sm:hidden w-[5px] h-[5px] bg-orange-400 rounded-full"></div>
				<div className="w-[50px] h-[5px] bg-orange-400 rounded-full"></div>
				<div className="w-[5px] h-[5px] bg-orange-400 rounded-full"></div>
				<div className="w-[5px] h-[5px] bg-orange-400 rounded-full"></div>
			</div>
		</div>
	);
};

export default Header;
