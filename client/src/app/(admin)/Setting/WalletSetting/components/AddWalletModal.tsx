import { Modal } from "@/components/site/modal/modal";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cryptoes } from "@/lib/data";
import { walletFormSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ApiResponse, WalletFormValues } from "@/utils/types";
import { adminApi } from "@/utils/api";

const AddWalletModal = ({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (value: boolean) => void;
}) => {
	const [isGeneralSubmitting, setIsGeneralSubmitting] = useState(false);
	const [networks, setNetworks] = useState<string[]>([]);

	const walletForm = useForm({
		resolver: zodResolver(walletFormSchema),
		defaultValues: {
			crypto: "",
			address: "",
			network: "",
		},
	});

	const onWalletFormSubmit = async (data: WalletFormValues) => {
		setIsGeneralSubmitting(true);

		// Simulate API call
		//await new Promise((resolve) => setTimeout(resolve, 1000));
		try {
			const response = await adminApi.post("/wallets", data);
			const result = response.data as ApiResponse<undefined>;
			if (result.success) {
				toast.success("Your wallet have been added successfully.");
				onOpenChange(false);
			} else if (result.errors) {
				throw new Error(result.message);
			} else {
				throw new Error(
					"An error occured please contact administrator"
				);
			}
		} catch (error) {
			const errorMessage =
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(error as any)?.message ||
				"An error occured. Please contact admin";
			toast.error(errorMessage);
		}
		setIsGeneralSubmitting(false);
	};

	return (
		<Modal
			open={open}
			setOpen={() => onOpenChange(false)}
			title="Add Wallet">
			<Form {...walletForm}>
				<form onSubmit={walletForm.handleSubmit(onWalletFormSubmit)}>
					<CardContent className="space-y-6">
						<FormField
							control={walletForm.control}
							name="crypto"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cryptocurrency</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											const selectedCrypto =
												cryptoes.find(
													(crypto) =>
														crypto.name == value
												);
											if (selectedCrypto) {
												setNetworks([
													...selectedCrypto.networks,
												]);
											}
										}}
										value={field.value || ""}
										defaultValue={field.value}>
										<FormControl className="!w-full">
											<SelectTrigger>
												<SelectValue placeholder="Select cryptocurrency" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{cryptoes.map((crypto) => (
												<SelectItem
													key={crypto.name}
													value={crypto.name}>
													{crypto.name} (
													{crypto.symbol})
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Select cryptocurrency wallet
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={walletForm.control}
							name="network"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Network</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value || ""}
										defaultValue={field.value}>
										<FormControl className="!w-full">
											<SelectTrigger>
												<SelectValue placeholder="Select network" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{networks.map((network) => (
												<SelectItem
													key={network}
													value={network}>
													{network}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Select network for the cryptocurrency
										wallet
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={walletForm.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Wallet Address</FormLabel>
									<Input
										type="text"
										{...field}
										placeholder="Crypto address"
									/>
									<FormDescription>
										Enter wallet address here
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex justify-end mt-4">
						<Button type="submit" disabled={isGeneralSubmitting}>
							{isGeneralSubmitting ? (
								<>Saving...</>
							) : (
								<>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</>
							)}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Modal>
	);
};

export default AddWalletModal;
