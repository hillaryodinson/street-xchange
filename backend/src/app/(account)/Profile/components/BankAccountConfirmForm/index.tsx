import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";
import { ApiResponse } from "@/utils/types";
import { toast } from "react-toastify";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const BankAccountConfirmSchema = z.object({
	otp: z.string().min(6).max(6),
});

const BankAccountConfirmForm = ({ onComplete }: { onComplete: () => void }) => {
	const form = useForm({
		resolver: zodResolver<z.infer<typeof BankAccountConfirmSchema>>(
			BankAccountConfirmSchema
		),
		values: {
			otp: "",
		},
	});

	const doSubmit = async (data: z.infer<typeof BankAccountConfirmSchema>) => {
		try {
			const response = await api.post("/banks/confirm", data);
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
					name={"otp"}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>OTP</FormLabel>
							<InputOTP
								maxLength={6}
								{...field}
								pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						</FormItem>
					)}
				/>

				<Button type={"submit"} className="w-full">
					<span>Confirm</span>
				</Button>
			</form>
		</Form>
	);
};

export default BankAccountConfirmForm;
