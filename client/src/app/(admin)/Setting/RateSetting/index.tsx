import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
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
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generalFormSchema } from "@/utils/zod";
import { ApiResponse, GeneralFormValues } from "@/utils/types";
import { toast } from "react-toastify";
import { adminApi } from "@/utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const RatingSetting = () => {
	const [isGeneralSubmitting, startTransition] = useTransition();
	const queryClient = useQueryClient();

	const { data: rateData } = useQuery({
		queryKey: ["fetch_currentRate"],
		queryFn: async () => {
			const response = await adminApi.get("/settings?setting=ngn_rate");
			const result = response.data as ApiResponse<string>;
			if (result.success) {
				return result.data ? parseFloat(result.data) : 0;
			} else {
				throw new Error(result.message);
			}
		},
	});

	const generalForm = useForm<GeneralFormValues>({
		resolver: zodResolver(generalFormSchema),
		defaultValues: {
			currentRate: rateData,
		},
	});

	async function onGeneralSubmit(data: GeneralFormValues) {
		startTransition(async () => {
			const response = await adminApi.put("/settings?setting=rate", {
				amount: data.currentRate,
			});

			const result = response.data as ApiResponse<undefined>;
			if (result.success) {
				console.log("General settings updated:", data);
				toast.success(result.message);
				queryClient.invalidateQueries({
					queryKey: ["fetch_currentRate"],
				});
			} else {
				toast.success(result.message);
			}
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>General Settings</CardTitle>
				<CardDescription>
					Configure your application's general settings.
				</CardDescription>
			</CardHeader>
			<Form {...generalForm}>
				<form onSubmit={generalForm.handleSubmit(onGeneralSubmit)}>
					<CardContent className="space-y-6">
						<FormField
							control={generalForm.control}
							name="currentRate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current Rate (USD)</FormLabel>
									<FormControl>
										<div className="relative">
											<span className="absolute left-3 top-2.5">
												₦
											</span>
											<Input
												type="number"
												step="0.01"
												min="0"
												placeholder="0.00"
												className="pl-7"
												{...field}
											/>
										</div>
									</FormControl>
									<FormDescription>
										The current rate charged for your
										services.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
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
		</Card>
	);
};

export default RatingSetting;
