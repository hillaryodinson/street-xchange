import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CirclePlus, EllipsisVertical, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserType } from "@/utils/types";
import moment from "moment";

interface ColumnProps {
	onView?: (id: UserType) => void;
	onApprove?: (id: UserType) => void;
	onDecline?: (id: UserType) => void;
}

export const getColumns = ({
	onView,
	onApprove,
	onDecline,
}: ColumnProps): ColumnDef<UserType>[] => [
	{
		accessorKey: "id",
		header: "#",
		size: 10,
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: "name",
		cell: ({ row }) => {
			const currentMember = row.original as UserType;
			return (
				<Link to="#" onClick={() => onView && onView(currentMember)}>
					<div className="font-medium">
						{`${currentMember.firstname} ${currentMember.lastname}`}{" "}
					</div>
					<div className="text-xs text-muted-foreground">
						{currentMember.email}
					</div>
				</Link>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Customer Name" />
		),
	},
	{
		accessorKey: "phoneNo",
		cell: ({ row }) => {
			const currentMember = row.original;
			return <div className="font-medium">{currentMember.phoneNo}</div>;
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone Number" />
		),
	},
	{
		accessorKey: "address",
		cell: ({ row }) => {
			const currentMember = row.original.residentialAddress;
			return (
				<div className="w-full flex align-items-center">
					{currentMember}
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Address" />
		),
	},
	{
		accessorKey: "dob",
		cell: ({ row }) => {
			const col = row.original.dob;
			const dob = moment(col);
			const formattedDob = dob.format("MMMM D, YYYY");
			return (
				<div className="font-medium text-center">
					{formattedDob} ({moment().diff(dob, "years")})
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date of Birth/Age" />
		),
	},

	{
		id: "action",
		header: "",
		size: 50,
		cell: ({ row }) => {
			const currentMember = row.original as UserType;
			return onView || onApprove || onDecline ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full">
							<EllipsisVertical className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{onView && (
							<DropdownMenuItem
								onClick={() => {
									if (onView) {
										onView(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<Eye className="h-4 w-4 mr-2" />
								<span>View</span>
							</DropdownMenuItem>
						)}
						{onApprove && (
							<DropdownMenuItem
								onClick={() => {
									if (onApprove) {
										onApprove(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<CirclePlus className="h-4 w-4 mr-2" />
								<span>Approve</span>
							</DropdownMenuItem>
						)}
						{onDecline && (
							<DropdownMenuItem
								onClick={() => {
									if (onDecline) {
										onDecline(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<X className="h-4 w-4 mr-2" />
								<span>Declinet</span>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			) : null;
		},
	},
];
