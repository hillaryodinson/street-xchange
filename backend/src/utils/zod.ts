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
		firstname: z.string().min(1, "First name is required"),
		lastname: z.string().min(1, "Last name is required"),
		email: z.string().email("Please enter a valid email address"),
		phoneNumber: z.string().min(10, "Please enter a valid phone number"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const updateProfileFormSchema = z
	.object({
		firstname: z.string().min(2, "First name is required"),
		lastname: z.string().min(2, "Last name is required"),
		dateOfBirth: z.string().refine((date) => {
			const today = new Date();
			const dob = new Date(date);
			const age = today.getFullYear() - dob.getFullYear();
			return age >= 18;
		}, "You must be at least 18 years old"),
		country: z.string().min(2, "Please enter a valid country").optional(),
		state: z.string().min(2, "Please enter a valid state").optional(),
		address: z.string().min(5, "Please enter a valid address").optional(),
		phoneNumber: z.string().min(10, "Please enter a valid phone number"),
	})
	.refine((data) => {
		if (data.address) {
			return !!data.country && !!data.state;
		}
		return true;
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
	name: z.string().min(1, "Wallet name is required."),
	symbol: z.string().min(1, "Wallet symbol is required."),
	address: z.string().min(1, "Wallet address is required."),
	network: z.string().min(1, "Wallet network is required."),
});

export const ImageSchema = z.object({
	image: z.string(),
	thumb: z.string(),
});

export const cryptoTransactionFormSchema = z.object({
	cryptoTypeSent: z.string().min(1, "Cryptocurrency type is required."),
	cryptoAmountSent: z.coerce
		.number()
		.positive("Crypto amount must be a positive number."),
	fiatAmountReceived: z.coerce
		.number()
		.positive("Fiat amount must be a positive number."),
	fiatCurrency: z.string().min(1, "Fiat currency is required."),
	fiatRate: z.coerce
		.number()
		.positive("Fiat rate must be a positive number."),
	currentUSDRate: z.coerce
		.number()
		.positive("Current USD rate must be a positive number."),
	walletAddress: z.string().min(1, "Wallet address is required."),
	walletNetwork: z.string().min(1, "Wallet network is required."),

	...BankSchema.shape,
});

export const giftCardTransactionFormSchema = z.object({
	cardType: z.string({
		required_error: "Please select a gift card type.",
	}),
	country: z.string({
		required_error: "Please select a country.",
	}),
	type: z.string({
		required_error: "Please select a card type.",
	}),
	amount: z.coerce
		.number()
		.positive("Amount must be positive")
		.min(5, "Minimum amount is $5"),
	cardNumber: z.string().min(1, "Please enter the card number"),
	pin: z.string().optional(),
	additionalInfo: z.string().optional(),
	accountId: z.string().min(1, "Please select your bank"),
	uploadedImages: z.array(z.string()).optional(),
});
