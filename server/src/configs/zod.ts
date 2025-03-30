import { z } from "zod";
export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const resetPasswordSchema = z.object({
	email: z.string().email(),
	callback_url: z.string(),
});

export const confirmPasswordResetSchema = z.object({
	token: z.string(),
	password: z.string(),
});

export const newAccountSchema = z
	.object({
		firstname: z
			.string()
			.min(2, "First name must be at least 2 characters"),
		middlename: z.string().optional(),
		surname: z.string().min(2, "Surname must be at least 2 characters"),
		email: z.string().email("Please enter a valid email address"),
		dateOfBirth: z.string().refine((date) => {
			const today = new Date();
			const dob = new Date(date);
			const age = today.getFullYear() - dob.getFullYear();
			return age >= 18;
		}, "You must be at least 18 years old"),
		address: z.string().min(5, "Please enter a valid address"),
		phoneNumber: z.string().min(10, "Please enter a valid phone number"),
		ninNumber: z.string().min(5, "Please enter a valid NIN number"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
		callbackUrl: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const imageSchema = z.object({
	image: z.string(),
	thumb: z.string(),
});
