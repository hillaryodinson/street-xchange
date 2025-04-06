import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Wallet,
	Trash2,
	PlusCircle,
	Verified,
	Hourglass,
	Key,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/site/modal/modal";
import BankAccountForm from "./components/BankAccountForm";
import BankAccountConfirmForm from "./components/BankAccountConfirmForm";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { ApiResponse, BankType } from "@/utils/types";
import { toast } from "react-toastify";
import KYCForm from "./components/KYC/KYCForm";
import { useAuthStore } from "@/lib/stores/auth-store";
import ChangePasswordForm from "./components/ChangePassword";

type BankTypewithID = BankType & { id: string };
const MyProfilePage = () => {
	const APP_NAME = import.meta.env.VITE_APP_NAME || "My App";
	const [addBankStep, setAddBankStep] = useState(1);
	const isVerified = useAuthStore((state) => state.isVerified);

	const [openBankModal, setOpenBankModal] = useState(false);
	const [openVerifyModal, setOpenVerifyModal] = useState(false);
	const [openPasswordModal, setOpenPasswordModal] = useState(false);

	const { data: accounts } = useQuery({
		queryKey: ["customer_banks"],
		queryFn: async () => {
			const response = await api.get("/banks");
			const result = response.data as ApiResponse<BankTypewithID[]>;
			return result.data ?? [];
		},
	});

	return (
		<div className="flex flex-col gap-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					My Profile
				</h1>
				<p className="text-muted-foreground">
					Here you can update your basic and financial information
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex justify-between">
						<div className="flex flex-col">
							<CardTitle>Accounts</CardTitle>
							<CardDescription>
								Your bank accounts on {APP_NAME}
							</CardDescription>
						</div>
						<Button
							size={"icon"}
							variant={"outline"}
							onClick={() => setOpenBankModal(true)}>
							<PlusCircle className="h-3 w-3" />
						</Button>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{accounts && accounts.length > 0 ? (
								accounts.map((account) => (
									<BankAccountCard
										account={account}
										key={account.id}
									/>
								))
							) : (
								<div className="">
									<p className="text-muted-foreground text-center">
										No account have been added
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className="max-h-[150px]">
					<CardHeader>
						<CardTitle>Account status</CardTitle>
						<CardDescription>
							Your kyc and account status
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							{isVerified == "verified" ? (
								<p className="text-sm font-medium leading-none flex gap-2 text-green-700 items-center">
									<Verified />
									Verified
								</p>
							) : isVerified == "pending" ? (
								<p className="text-sm font-medium leading-none flex gap-2 text-blue-700 items-center">
									<Hourglass />
									Pending Verification
								</p>
							) : (
								<Button
									onClick={() => setOpenVerifyModal(true)}>
									<Verified />
									Verify Account
								</Button>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className="max-h-[150px]">
					<CardHeader>
						<CardTitle>Change Password</CardTitle>
						<CardDescription>Update your password</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Button onClick={() => setOpenPasswordModal(true)}>
								<Key />
								update
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			<Modal
				open={openBankModal}
				setOpen={setOpenBankModal}
				title={addBankStep == 1 ? "Add Bank" : "Confirm Action"}>
				{addBankStep == 1 && (
					<BankAccountForm onComplete={() => setAddBankStep(2)} />
				)}
				{addBankStep == 2 && (
					<BankAccountConfirmForm
						onComplete={() => setAddBankStep(2)}
					/>
				)}
			</Modal>
			<Modal
				open={openVerifyModal}
				setOpen={setOpenVerifyModal}
				title="Fill KYC Form">
				<KYCForm
					onComplete={() => {
						setOpenVerifyModal(false);
					}}
				/>
			</Modal>
			<Modal
				open={openPasswordModal}
				setOpen={setOpenPasswordModal}
				title="Change Password">
				<ChangePasswordForm
					onComplete={() => {
						setOpenPasswordModal(false);
					}}
				/>
			</Modal>
		</div>
	);
};

export default MyProfilePage;

const BankAccountCard = ({ account }: { account: BankTypewithID }) => {
	const doDelete = async (id: string) => {
		console.log(id);
		const response = await api.delete(`/banks/${id}`);
		const result = response.data as ApiResponse<undefined>;
		if (result.success) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};
	return (
		<div className="flex items-center justify-between border-b pb-4">
			<div className="flex items-center gap-4">
				<div className="rounded-full bg-primary/10 p-2">
					<Wallet className="h-4 w-4 text-primary" />
				</div>
				<div>
					<p className="font-medium">{account.bankName}</p>
					<p className="text-sm text-muted-foreground">
						{account.accountNo}
					</p>
				</div>
			</div>
			<Button
				variant={"ghost"}
				size={"icon"}
				onClick={() => doDelete(account.id)}>
				<Trash2 className="w-4 h-4" />
			</Button>
		</div>
	);
};
