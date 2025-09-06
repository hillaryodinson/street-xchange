import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CirclePlus, EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Transaction } from "@/utils/types";
import { toCurrency } from "@/utils/helper";

interface ColumnProps {
	onView?: (id: Transaction) => void;
	onAddUnit?: (id: Transaction) => void;
	onEdit?: (id: Transaction) => void;
	onDelete?: (id: Transaction) => void;
}

export const getColumns = ({
	onView,
	onAddUnit,
	onEdit,
	onDelete,
}: ColumnProps): ColumnDef<Transaction>[] => [
	{
		accessorKey: "id",
		header: "#",
		size: 10,
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: "name",
		cell: ({ row }) => {
			const currentMember = row.original as Transaction;
			return (
				<Link to="#" onClick={() => onView && onView(currentMember)}>
					<div className="font-medium"></div>
					<div className="text-xs text-muted-foreground">
						{currentMember?.customer?.firstname}{" "}
						{currentMember?.customer?.lastname}
					</div>
				</Link>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Property" />
		),
	},
	{
		accessorKey: "type",
		cell: ({ row }) => {
			const currentMember = row.original;
			return (
				<div className="font-medium">
					{currentMember.transactionType}
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
	},
	{
		accessorKey: "amount",
		cell: ({ row }) => {
			const currentMember = row.original.amount;
			return (
				<div className="w-full flex align-items-center">
					{toCurrency(currentMember || 0)}
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Amount" />
		),
	},

	{
		id: "action",
		header: "",
		size: 50,
		cell: ({ row }) => {
			const currentMember = row.original as Transaction;
			return onView || onAddUnit || onEdit || onDelete ? (
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
						{onAddUnit && (
							<DropdownMenuItem
								onClick={() => {
									if (onAddUnit) {
										onAddUnit(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<CirclePlus className="h-4 w-4 mr-2" />
								<span>Add Unit</span>
							</DropdownMenuItem>
						)}
						{onEdit && (
							<DropdownMenuItem
								onClick={() => {
									if (onEdit) {
										onEdit(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<Pencil className="h-4 w-4 mr-2" />
								<span>Edit</span>
							</DropdownMenuItem>
						)}
						{onDelete && (
							<DropdownMenuItem
								onClick={() => {
									if (onDelete) {
										onDelete(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<Trash className="h-4 w-4 mr-2" />
								<span>Delete</span>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			) : null;
		},
	},
];
