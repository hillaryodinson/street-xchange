import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader, Save, XCircle } from "lucide-react";
import api from "@/utils/api";
import { ApiResponse, BankType } from "@/utils/types";
import { toast } from "react-toastify";
import { BankSchema } from "@/utils/zod";
import { banks } from "@/lib/banks";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";

const BankAccountForm = ({ onComplete }: { onComplete: () => void }) => {
	const [isValidAccountName, setIsValidAccountName] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const form = useForm({
		resolver: zodResolver<BankType>(BankSchema),
		values: {
			bankName: "",
			accountName: "",
			accountNo: "",
		},
	});

	const getAccountName = async (accountNo: string, bankName: string) => {
		setIsSearching(true);
		try {
			if (accountNo && accountNo.length === 10 && bankName) {
				const bankCode = getBanksCode(bankName);
				if (!bankCode) {
					throw new Error("Invalid bank selected");
				}
				// https://nubapi.com/api/verify?account_number={#}&bank_code={#}',
				const response = await axios.get(
					`https://nubapi.com/api/verify?account_number=${accountNo}&bank_code=${bankCode}`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_NUBAPI_TOKEN
							}`,
							"Content-Type": "application/json",
						},
					}
				);
				const result = response.data as { account_name: string };
				form.setValue("accountName", result.account_name);
				setIsValidAccountName(true);
			}
			setIsSearching(false);
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			toast.error((error as any)?.response?.data?.message || error);
			console.log(error);
			setIsSearching(false);
			form.setValue("accountName", "");
			setIsValidAccountName(false);
		}
	};

	const doSubmit = async (data: BankType) => {
		try {
			const response = await api.post("/banks", data);
			const result = response.data as ApiResponse<undefined>;
			if (result.success) {
				toast.success(result.message);
				onComplete();
			} else {
				throw new Error(result.message);
			}
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			toast.error((error as any)?.response.data.message);
			console.log(error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(doSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="bankName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bank Name</FormLabel>

							<Select
								{...field}
								onValueChange={(val) => {
									form.setValue(field.name, val);
								}}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select bank" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Bank</SelectLabel>
										{[...banks]
											.sort((a, b) =>
												a.name.localeCompare(b.name)
											)
											.map((bank, index) => (
												<SelectItem
													value={bank.name}
													key={index}>
													{bank.name}
												</SelectItem>
											))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>

				<FormField
					name="accountNo"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Number</FormLabel>
							<FormControl>
								<Input
									type="text"
									{...field}
									placeholder="e.g 1010001101"
									maxLength={10}
									onBlur={() =>
										getAccountName(
											field.value,
											form.getValues("bankName")
										)
									}
									onChange={(e) => {
										setIsValidAccountName(false);
										field.onChange(e);
										if (e.target.value.length === 10) {
											getAccountName(
												e.target.value,
												form.getValues("bankName")
											);
										} else {
											form.setValue("accountName", "");
										}
									}}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="accountName"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Name</FormLabel>
							<FormControl>
								<div className="flex items-center space-x-2">
									<Input
										type="text"
										disabled
										{...field}
										placeholder="e.g John Doe"
									/>
									{isSearching ? (
										<Loader className="animate-spin" />
									) : isValidAccountName ? (
										<CheckCircle className="text-green-600 w-4 h-4 animate-in" />
									) : (
										field.value && (
											<XCircle className="text-red-600 w-4 h-4 animate-in" />
										)
									)}
								</div>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type={"submit"} className="w-full">
					<Save />
					<span>Add Account</span>
				</Button>
			</form>
		</Form>
	);
};

export default BankAccountForm;
function getBanksCode(bankName: string): string | undefined {
	const bank = banks.find((b) => b.name === bankName);
	return bank?.code;
}
