import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import AdminDropdown from "@/components/site/admin-dropdown";

export function AdminDashboardHeader() {
	return (
		<header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
			<div className="flex flex-1 items-center justify-between ml-10 md:ml-0">
				<Logo className="w-[150px]" />

				<div className="flex items-center gap-4">
					<Button variant="outline" size="icon" className="relative">
						<Bell className="h-5 w-5" />
						<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
							3
						</span>
						<span className="sr-only">Notifications</span>
					</Button>

					<AdminDropdown />
				</div>
			</div>
		</header>
	);
}
