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
		lastname: z.string().min(2, "Lastname must be at least 2 characters"),
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
		callbackUrl: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const bookingSchema = z
	.object({
		from: z.string({
			required_error: "Please select a departure airport.",
		}),
		to: z.string({
			required_error: "Please select a destination airport.",
		}),
		scheduledFlightDate: z.coerce.date({
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

export const kycSchema = z.object({
	type: z.string(),
	number: z.string(),
	frontimage: z.string(),
	backimage: z.string().optional(),
});

export const transactionSchema = z.object({
	transType: z.string(),
	description: z.string(),
	amount: z.coerce.string(),
	customerId: z.string(),
	transId: z.string(),
	typeId: z.string(),
});

export const bankSchema = z.object({
	bankName: z.string(),
	accountNo: z.string(),
	accountName: z.string(),
});

export const imageSchema = z.object({
	image: z.string(),
	thumb: z.string(),
});

export const WalletSchema = z.object({
	name: z.string(),
	symbol: z.string(),
	network: z.string(),
	address: z.string(),
});

export const CryptoTransactionSchema = z.object({
	cryptoTypeSent: z.string(),
	cryptoAmountSent: z.coerce.number(),
	fiatAmountReceived: z.coerce.number(),
	fiatCurrency: z.string(),
	fiatRate: z.coerce.number(),
	currentUSDRate: z.coerce.number(),
	walletAddress: z.string(),
	walletNetwork: z.string(),
	bankAccountId: z.string(),
});

/*
cardType   String //itunes,amazon, steam, ebay, razer gold, google
  country    String
  type       String //Physical, Ecode, Horizontal, white board
  speed      Int?
  amount     Int
  isPending  Boolean  @default(true)
*/
export const GiftCardTransactionSchema = z.object({
	cardType: z.string(),
	country: z.string(),
	type: z.string(),
	speed: z.coerce.number().optional(),
	amount: z.coerce.number(),
	accountId: z.string(),

	pin: z.string().optional(),
	additionalInfo: z.string().optional(),
	cardCode: z.string().optional(),
	cardImage: z.string().optional(),
});
