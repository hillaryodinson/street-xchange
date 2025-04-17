import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email("Invalid email address."),
	password: z
		.string()
		.min(1, "Password must be more than one character and less than 20")
		.max(20, "Password must be more than one character and less than 20"),
});

export const registerFormSchema = z
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
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const ResetPasswordSchema = z.object({
	email: z.string().email(),
});

export const PasswordConfirmationSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const FlightBookinSchema = z
	.object({
		from: z.string({
			required_error: "Please select a departure airport.",
		}),
		to: z.string({
			required_error: "Please select a destination airport.",
		}),
		scheduledFlightDate: z.date({
			required_error: "Please select a flight date.",
		}),
		type: z.enum(["economy", "business", "firstClass"], {
			required_error: "Please select a flight class.",
		}),
		paymentMethod: z.string({
			required_error: "Please select a cryptocurrency for payment.",
		}),
		passengers: z.coerce.number().min(1).max(10),
	})
	.refine((data) => data.from !== data.to, {
		message: "Departure and destination airports cannot be the same.",
		path: ["to"],
	});

export const BankSchema = z.object({
	bankName: z.string(),
	accountNo: z.string(),
	accountName: z.string(),
});

export const KYCSchema = z.object({
	type: z.string(),
	number: z.string(),
	frontimage: z.string(),
	backimage: z.string().optional(),
});

export const ChangePasswordSchema = z
	.object({
		oldpassword: z.string(),
		password: z.string(),
		confirm_password: z.string(),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const generalFormSchema = z.object({
	currentRate: z.coerce.number().positive({
		message: "Rate must be a positive number.",
	}),
});

export const walletFormSchema = z.object({
	crypto: z.string().min(1, "Wallet name is required."),
	address: z.string().min(1, "Wallet address is required."),
	network: z.string().min(1, "Wallet network is required."),
});

export const ImageSchema = z.object({
	image: z.string(),
	thumb: z.string(),
});
