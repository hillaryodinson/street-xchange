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
import { CheckCircle } from "lucide-react";
import api from "@/utils/api";
import { ApiResponse } from "@/utils/types";
import { toast } from "react-toastify";
import { z } from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { FileUploader } from "@/components/site/file-uploader";
import { useState } from "react";

const KYCSchema = z.object({
	type: z.string(),
	number: z.string(),
	frontimage: z.string(),
	backimage: z.string().optional(),
});
type KYCType = z.infer<typeof KYCSchema>;

const allowedIdentityTypes = [
	{
		name: "Drivers License",
	},
	{
		name: "International Passport",
	},
	{
		name: "NIN",
	},
];

const KYCForm = ({ onComplete }: { onComplete: () => void }) => {
	const [currentID, setCurrentID] = useState("");
	const form = useForm({
		resolver: zodResolver<KYCType>(KYCSchema),
		values: {
			type: "",
			number: "",
			frontimage: "",
			backimage: "",
		},
	});

	const doSubmit = async (data: KYCType) => {
		try {
			const response = await api.post("/kyc", data);
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
	const handleDocumentImageUpload = async (file: File) => {
		const formData = new FormData();
		formData.append("images", file); // Append files to FormData object

		const response = await api.post("/file/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		const result = (await response.data) as ApiResponse<
			{ main: string; thumb: string }[]
		>;
		console.log("FILE UPLOADED =>", result);

		if (result.success && result.data) {
			const uploaded = result.data[0].main;
			return uploaded;
		} else {
			return null;
		}
	};

	const handleFrontDocumentUpload = async (file: File | null) => {
		try {
			if (!file) throw new Error("Please upload a valid file");
			const documentUrl = await handleDocumentImageUpload(file);
			if (documentUrl) form.setValue("frontimage", documentUrl);
			else
				throw new Error(
					"An error occured please contact administrator"
				);
		} catch (error: any) {
			toast.error(
				error instanceof Error
					? error.message
					: "An unknown error occurred"
			);
		}
	};

	const handleBackDocumentUpload = async (file: File | null) => {
		try {
			if (!file) throw new Error("Please upload a valid file");
			const documentUrl = await handleDocumentImageUpload(file);
			if (documentUrl) form.setValue("backimage", documentUrl);
			else
				throw new Error(
					"An error occured please contact administrator"
				);
		} catch (error: any) {
			toast.error(
				error instanceof Error
					? error.message
					: "An unknown error occurred"
			);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(doSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Identity Document</FormLabel>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setCurrentID(value);
								}}
								defaultValue={field.value}>
								<FormControl className="w-full">
									<SelectTrigger>
										<SelectValue placeholder="Select Identity Document" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{allowedIdentityTypes &&
										allowedIdentityTypes.map((identity) => (
											<SelectItem value={identity.name}>
												{identity.name}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>

				<FormField
					name="number"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Enter {currentID ? currentID : "Identity"} No
							</FormLabel>
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
					control={form.control}
					name="frontimage"
					render={() => (
						<FormItem>
							<FormLabel>Front Image</FormLabel>
							<FileUploader
								onFileUpload={handleFrontDocumentUpload}
								accept="image/*"
								maxSize={1}
								preview={form.getValues("frontimage")}
							/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="backimage"
					render={() => (
						<FormItem>
							<FormLabel>Back Image</FormLabel>
							<FileUploader
								onFileUpload={handleBackDocumentUpload}
								accept="image/*"
								maxSize={1}
								preview={form.getValues("backimage")}
							/>
						</FormItem>
					)}
				/>
				<Button type={"submit"} className="w-full">
					<CheckCircle />
					<span>Verify Account</span>
				</Button>
			</form>
		</Form>
	);
};

export default KYCForm;
