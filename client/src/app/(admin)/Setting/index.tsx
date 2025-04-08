import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const generalFormSchema = z.object({
	currentRate: z.coerce.number().positive({
		message: "Rate must be a positive number.",
	}),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;

const SettingsPage = () => {
	const [isGeneralSubmitting, setIsGeneralSubmitting] = useState(false);

	const generalForm = useForm<GeneralFormValues>({
		resolver: zodResolver(generalFormSchema),
		defaultValues: {
			currentRate: 1500,
		},
	});

	async function onGeneralSubmit(data: GeneralFormValues) {
		setIsGeneralSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log("General settings updated:", data);
		toast.success("Your general settings have been updated successfully.");

		setIsGeneralSubmitting(false);
	}

	return (
		<div className="container py-10">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
				<p className="text-muted-foreground">
					Manage your application settings and preferences.
				</p>
			</div>

			<Tabs defaultValue="general" className="space-y-4">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="wallets">Wallets</TabsTrigger>
				</TabsList>

				<TabsContent value="general">
					<Card>
						<CardHeader>
							<CardTitle>General Settings</CardTitle>
							<CardDescription>
								Configure your application's general settings.
							</CardDescription>
						</CardHeader>
						<Form {...generalForm}>
							<form
								onSubmit={generalForm.handleSubmit(
									onGeneralSubmit
								)}>
								<CardContent className="space-y-6">
									<FormField
										control={generalForm.control}
										name="currentRate"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Current Rate (USD)
												</FormLabel>
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
													The current rate charged for
													your services.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter>
									<Button
										type="submit"
										disabled={isGeneralSubmitting}>
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
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default SettingsPage;
