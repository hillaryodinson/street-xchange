import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddWalletModal from "./components/AddWalletModal";
import { useState } from "react";
import { WalletTable } from "@/components/site/wallet-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import { ApiResponse, WalletType } from "@/utils/types";

const WalletSetting = () => {
	const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false);
	const query = useQueryClient();

	const { data: wallets, isLoading } = useQuery({
		queryKey: ["fetch_wallets"],
		queryFn: async () => {
			const response = await api.get("/wallets");
			const result = response.data as ApiResponse<WalletType[]>;
			if (result.success) return result.data;
		},
	});

	const onAddWallet = () => {
		setIsAddWalletModalOpen(false);
		query.invalidateQueries({ queryKey: ["fetch_wallets"] });
	};

	const onDeleteWallet = () => {
		setIsAddWalletModalOpen(false);
		query.invalidateQueries({ queryKey: ["fetch_wallets"] });
	};
	const onActivateWallet = () => {
		setIsAddWalletModalOpen(false);
		query.invalidateQueries({ queryKey: ["fetch_wallets"] });
	};
	const onDeactivateWallet = () => {
		setIsAddWalletModalOpen(false);
		query.invalidateQueries({ queryKey: ["fetch_wallets"] });
	};

	return (
		<>
			<Card>
				<CardHeader className="pb-3">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<CardTitle>Wallets</CardTitle>
							<CardDescription>
								All allowed crypto wallets
							</CardDescription>
						</div>
						<Button
							variant="outline"
							size="sm"
							className="w-full sm:w-auto"
							onClick={() => setIsAddWalletModalOpen(true)}>
							<PlusCircle className="mr-2 h-4 w-4" />
							Add Wallet
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<WalletTable
						wallets={wallets || []}
						isLoading={isLoading}
						onActivate={onActivateWallet}
						onDeactivate={onDeactivateWallet}
						onDelete={onDeleteWallet}
					/>
				</CardContent>
			</Card>
			<AddWalletModal
				open={isAddWalletModalOpen}
				onOpenChange={onAddWallet}
			/>
		</>
	);
};

export default WalletSetting;
