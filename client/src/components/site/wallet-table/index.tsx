import { Check, CheckCircle, Loader2, Trash2, XCircle } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { WalletType } from "@/utils/types";
import { Button } from "@/components/ui/button";

interface walletsTableProps {
	wallets: WalletType[];
	isLoading: boolean;
	onActivate: (id: string) => void;
	onDeactivate: (id: string) => void;
	onDelete: (id: string) => void;
}

export function WalletTable({
	wallets,
	isLoading,
	onActivate,
	onDeactivate,
	onDelete,
}: walletsTableProps) {
	const getStatusBadge = (status: WalletType["isActive"]) => {
		switch (status) {
			case true:
				return (
					<div className="flex items-center gap-1">
						<Check className="h-3.5 w-3.5 text-green-500" />
						<span className="text-xs font-medium text-green-500">
							Active
						</span>
					</div>
				);

			default:
				return (
					<div className="flex items-center gap-1">
						<span className="h-1.5 w-1.5 rounded-full bg-red-500" />
						<span className="text-xs font-medium text-red-500">
							Not Active
						</span>
					</div>
				);
		}
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted/50">
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Network</TableHead>
						<TableHead>Address</TableHead>
						<TableHead className="text-right">Status</TableHead>
						<TableHead>Options</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell colSpan={5} className="h-24 text-center">
								<div className="flex justify-between items-center">
									<Loader2 className="w-4 h-4 animate-spin" />{" "}
									<span> Loading data </span>
								</div>
							</TableCell>
						</TableRow>
					) : wallets.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="h-24 text-center">
								No wallets found.
							</TableCell>
						</TableRow>
					) : (
						wallets.map((wallet, index) => (
							<TableRow
								key={wallet.id}
								className="border-b border-muted/30 hover:bg-muted/30">
								<TableCell className="font-mono text-xs">
									{index + 1}
								</TableCell>
								<TableCell>{wallet.crypto}</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<span className="text-sm">
											{wallet.network}
										</span>
									</div>
								</TableCell>
								<TableCell>{wallet.address}</TableCell>
								<TableCell className="text-right">
									{getStatusBadge(wallet.isActive)}
								</TableCell>
								<TableCell className="text-right flex justify-end gap-2">
									{wallet.isActive ? (
										<Button
											variant={"outline"}
											size={"icon"}
											onClick={() =>
												onDeactivate(wallet.id!)
											}>
											<XCircle className="h-4 w-4 text-red-500" />
											<span className="sr-only">
												Deactivate
											</span>
										</Button>
									) : (
										<Button
											variant={"outline"}
											size={"icon"}
											onClick={() =>
												onActivate(wallet.id!)
											}>
											<CheckCircle className="h-4 w-4 text-green-500" />
											<span className="sr-only">
												Activate
											</span>
										</Button>
									)}

									<Button
										variant="outline"
										size="icon"
										onClick={() => onDelete(wallet.id!)}>
										<Trash2 className="h-4 w-4 text-dark" />
										<span className="sr-only">Delete</span>
									</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
