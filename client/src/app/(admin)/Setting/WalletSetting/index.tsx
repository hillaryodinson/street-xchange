import { TransactionsTable } from "@/components/site/transaction-table";
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

const WalletSetting = () => {
	const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false);
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
					<TransactionsTable transactions={[]} />
				</CardContent>
			</Card>
			<AddWalletModal
				open={isAddWalletModalOpen}
				onOpenChange={setIsAddWalletModalOpen}
			/>
		</>
	);
};

export default WalletSetting;
