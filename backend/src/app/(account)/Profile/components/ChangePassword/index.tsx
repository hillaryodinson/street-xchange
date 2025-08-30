/* eslint-disable @typescript-eslint/no-explicit-any */
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
import api from "@/utils/api";
import { ApiResponse, ChangePasswordType } from "@/utils/types";
import { toast } from "react-toastify";

import { ChangePasswordSchema } from "@/utils/zod";

const ChangePasswordForm = ({ onComplete }: { onComplete: () => void }) => {
	const form = useForm({
		resolver: zodResolver<ChangePasswordType>(ChangePasswordSchema),
		values: {
			oldpassword: "",
			password: "",
			confirm_password: "",
		},
	});

	const doSubmit = async (data: ChangePasswordType) => {
		try {
			const response = await api.post("/customers/change-password", data);
			const result = response.data as ApiResponse<undefined>;
			if (result.success) {
				toast.success(result.message);
				onComplete();
			} else {
				throw new Error(result.message);
			}
		} catch (error) {
			toast.error((error as any)?.response.data.message);
			console.log(error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(doSubmit)} className="space-y-6">
				<FormField
					name="oldpassword"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Old Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									{...field}
									placeholder=""
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									{...field}
									placeholder=""
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="confirm_password"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm New Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									{...field}
									placeholder=""
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type={"submit"} className="w-full">
					<span>Change Password</span>
				</Button>
			</form>
		</Form>
	);
};

export default ChangePasswordForm;
