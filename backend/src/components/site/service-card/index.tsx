import type React from "react";
import { ArrowRight } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ServiceCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	linkText: string;
	linkHref: string;
}

export function ServiceCard({
	icon,
	title,
	description,
	linkText,
	linkHref,
}: ServiceCardProps) {
	return (
		<Card className="group overflow-hidden transition-all hover:shadow-md">
			<CardHeader className="pb-3">
				<div className="rounded-full bg-primary/10 p-3 w-fit">
					<div className="text-primary">{icon}</div>
				</div>
			</CardHeader>
			<CardContent className="pb-3">
				<CardTitle className="text-xl">{title}</CardTitle>
				<CardDescription className="mt-2">
					{description}
				</CardDescription>
			</CardContent>
			<CardFooter>
				<Link
					to={linkHref}
					className="inline-flex items-center text-primary font-medium hover:underline">
					{linkText}
					<ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</CardFooter>
		</Card>
	);
}
