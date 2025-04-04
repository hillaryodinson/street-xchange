import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { banks } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check, Save } from "lucide-react";
import api from "@/utils/api";
import { ApiResponse, BankType } from "@/utils/types";
import { toast } from "react-toastify";
import { BankSchema } from "@/utils/zod";

const BankAccountForm = ({ onComplete }: { onComplete: () => void }) => {
	const [open, setOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver<BankType>(BankSchema),
		values: {
			bankName: "",
			accountName: "",
			accountNo: "",
		},
	});

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

							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<FormControl className="w-full">
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-full justify-between",
												!field.value &&
													"text-muted-foreground"
											)}>
											{field.value
												? banks.find(
														(bank) =>
															bank.name ===
															field.value
												  )?.name
												: "Select Bank"}
											<ChevronsUpDown className="opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Command>
										<CommandInput
											placeholder="Search framework..."
											className="h-9"
										/>
										<CommandList>
											<CommandEmpty>
												No framework found.
											</CommandEmpty>
											<CommandGroup>
												{banks.map((bank) => (
													<CommandItem
														value={bank.name}
														key={bank.code}
														onSelect={() => {
															form.setValue(
																field.name,
																bank.name
															);
															setOpen(false);
														}}>
														{bank.name}
														<Check
															className={cn(
																"ml-auto",
																bank.name ===
																	field.value
																	? "opacity-100"
																	: "opacity-0"
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
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
								<Input
									type="text"
									{...field}
									placeholder="e.g John Doe"
								/>
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
