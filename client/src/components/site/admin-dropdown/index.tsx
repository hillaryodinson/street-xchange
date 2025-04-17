import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthAdminStore } from "@/lib/stores/auth-admin-store";

const AdminDropdown = () => {
	const user = useAuthAdminStore((state) => state.user);
	const navigate = useNavigate();
	const logout = useAuthAdminStore((state) => state.clearSession);
	const getUserInitials = () => {
		if (!user) return "U";
		return `${user.name.charAt(0).toUpperCase()}${user.name
			.charAt(1)
			.toUpperCase()}`;
	};

	const initials = getUserInitials();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-9 w-9 rounded-full">
					<Avatar className="h-9 w-9">
						<AvatarImage src="/placeholder.svg" alt="User" />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{user && `${user.name}`}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							administrator
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => navigate("/my-profile")}>
					<User className="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logout()}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AdminDropdown;
