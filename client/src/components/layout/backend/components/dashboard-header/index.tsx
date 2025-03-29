import { Bell, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function DashboardHeader() {
	return (
		<header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
			<div className="flex flex-1 items-center justify-end md:justify-between">
				<Link to="/customer-dashboard" className="hidden md:block">
					<span className="text-xl font-bold text-primary">
						Xchange
					</span>
				</Link>

				<div className="flex items-center gap-4">
					<Button variant="outline" size="icon" className="relative">
						<Bell className="h-5 w-5" />
						<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
							3
						</span>
						<span className="sr-only">Notifications</span>
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="relative h-9 w-9 rounded-full">
								<Avatar className="h-9 w-9">
									<AvatarImage
										src="/placeholder.svg"
										alt="User"
									/>
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-56"
							align="end"
							forceMount>
							<DropdownMenuLabel>
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">
										John Doe
									</p>
									<p className="text-xs leading-none text-muted-foreground">
										john.doe@example.com
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
