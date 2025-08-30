import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { KYCType } from "@/utils/types";
import moment from "moment";

interface ColumnProps {
	onView?: (id: KYCType) => void;
	onApprove?: (id: KYCType) => void;
	onDecline?: (id: KYCType) => void;
}

export const getColumns = ({
	onView,
}: ColumnProps): ColumnDef<KYCType, unknown>[] => [
	{
		accessorKey: "id",
		header: "#",
		size: 10,
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: "name",
		cell: ({ row }) => {
			const currentMember = row.original as KYCType;
			return (
				<Link to="#" onClick={() => onView && onView(currentMember)}>
					<div className="font-medium">
						{`${currentMember.customer.firstname} ${currentMember.customer.lastname}`}{" "}
					</div>
					<div className="text-xs text-muted-foreground">
						{currentMember.customer.email}
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
			const currentMember = row.original.customer;
			return <div className="font-medium">{currentMember.phoneNo}</div>;
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone Number" />
		),
	},
	{
		accessorKey: "address",
		cell: ({ row }) => {
			const currentMember = row.original.customer.residentialAddress;
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
			const col = row.original.customer.dob;
			const dob = moment(new Date(col));
			const formattedDob = dob.format("MMMM D, YYYY");
			return col ? (
				<div className="font-medium text-center">
					{formattedDob} ({moment().diff(dob, "years")} years)
				</div>
			) : (
				<div className="font-medium text-center">N/A</div>
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
			const currentMember = row.original as KYCType;
			return onView ? (
				<Button
					size={"sm"}
					onClick={() => {
						if (onView) {
							onView(currentMember);
						}
					}}
					className="flex items-center justify-normal text-xs"
					disabled={currentMember.customer.dob == null}>
					<Eye className="h-4 w-4 mr-1" />
					<span>View</span>
				</Button>
			) : null;
		},
	},
];
