import { z } from "zod";
import {
	BankSchema,
	ChangePasswordSchema,
	generalFormSchema,
	giftCardTransactionFormSchema,
	ImageSchema,
	KYCSchema,
	walletFormSchema,
} from "./zod";

export type ApiResponse<T> = {
	success: boolean;
	message: string;
	data?: T;
	errors?: Record<string, unknown>;
};
export type VerificationType = "pending" | "verified" | "not-verified";
export type AuthResponse = {
	token: string;
	user: UserType;
	isVerified: VerificationType;
};
export type AuthAdminResponse = {
	token: string;
	user: AdminType;
};

export type AdminType = {
	id: string;
	email: string;
	role: string;
	name: string;
	middlename: string;
};

export type ImageType = {
	id?: string;
	image: string;
	thumb: string;
};

export type UnitImageInfo = z.infer<typeof ImageSchema>[];

export type BankType = z.infer<typeof BankSchema> & { id?: string };
export type KYCType = z.infer<typeof KYCSchema>;
export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

export type GeneralFormValues = z.infer<typeof generalFormSchema>;
export type WalletFormValues = z.infer<typeof walletFormSchema>;
export type WalletType = {
	id?: string;
	name: string;
	symbol: string;
	address: string;
	network: string;
	isActive: boolean;
	createdAt: string;
};

export type cryptoType = {
	id: string;
	name: string;
	symbol: string;
};

export type networkType = {
	id: string;
	network: string;
};

export type giftCardFormType = z.infer<typeof giftCardTransactionFormSchema> & {
	id?: string;
};

// Deprecated: Use the User interface below for consistency with backend models
// export type UserType = {
// 	id: string;
// 	email: string;
// 	role: string;
// 	firstname: string;
// 	middlename: string;
// 	surname: string;
// 	createdat: string;
// };

// Deprecated: Use the Transaction interface below for consistency with backend models
// export interface Transaction {
// 	id: string;
// 	date: string;
// 	transId: string;
// 	transType: "flight" | "crypto" | "giftcard";
// 	description: string;
// 	amount?: number;
// 	status: "pending" | "completed" | "failed";
// 	cryptoTransId?: string;
// 	flightTransId?: string;
// 	giftcardTransId?: string;
// 	customerId: string;
// 	createdDate: string;
// }

export type TransactionType = "GIFT_CARD" | "CRYPTO" | "FLIGHT";
export type TransactionStatus = "Pending" | "Completed" | "Failed";

// New import
export interface UserType {
	id: string;
	firstname: string;
	middlename?: string | null;
	surname: string;
	email: string;
	dob: Date;
	residentialAddress: string;
	phoneNo: string;
	isVerified: 0 | 1 | 2 | 3;
	createdAt: Date;
	role: string;

	kyc: Kyc[];
	customerBank: CustomerBank[];
	Transaction: Transaction[];
}

export interface Admin {
	id: string;
	name: string;
	email: string;
	password: string;
}

export interface Kyc {
	id: string;
	customerId: string;
	customer: UserType;
	type: string;
	number: string;
	frontimage: string;
	backimage?: string | null;
	isApproved: boolean;
	createdAt: Date;
}

export type PaymentTransactionStatus =
	| "PendingPayment"
	| "PaymentDone"
	| "PaymentConfirmed"
	| "PaymentExpired"
	| "PendingDisbursement"
	| "DisbursementDone";

export type BookingStatus =
	| "PendingAvailability"
	| "FlightUnavailable"
	| "PendingPayment"
	| "Booked"
	| "Cancelled";

export interface Transaction {
	id: string;
	reference: string;
	description: string;
	transactionType: TransactionType;
	status: TransactionStatus;
	amount?: number | null;
	currency?: string | null;

	giftcardTransId?: string | null;
	giftcardTrans?: GiftCardTransaction | null;

	cryptoTransId?: string | null;
	cryptoTrans?: CryptoTransaction | null;

	flightTransId?: string | null;
	flightTrans?: FlightTransaction | null;

	customerId?: string;
	customer?: UserType;

	createdDate: Date;
}

export interface GiftCardTransaction {
	id: string;
	customerId: string;
	cardType: string;
	country: string;
	type: string;
	speed?: number | null;
	amount: number;

	pin?: string | null;
	additionalInfo?: string | null;
	cardCode?: string | null;
	cardImage?: string | null;

	accountId: string;
	Account: CustomerBank;

	status: PaymentTransactionStatus;
	createdAt: Date;
	updatedAt: Date;
	disbursedAt?: Date | null;
	Transaction: Transaction[];
}

export interface CryptoTransaction {
	id: string;
	customerId: string;
	cryptoTypeSent: string;
	cryptoAmountSent: number;
	fiatAmountReceived: number;
	fiatCurrency: string;
	fiatRate: number;
	currentUSDRate: number;
	walletAddress: string;
	walletNetwork: string;

	accountId: string;
	Account: CustomerBank;

	status: PaymentTransactionStatus;
	Transaction: Transaction[];
}

export interface FlightTransaction {
	id: string;
	customerId: string;
	paymentMethod: string;
	from: string;
	to: string;
	scheduledFlightDate: Date;
	type: string;
	passengers: number;

	walletAddress?: string | null;
	walletNetwork?: string | null;
	flightCost?: number | null;

	status: BookingStatus;
	note?: string | null;
	Transaction: Transaction[];
}

export interface CustomerBank {
	id: string;
	bankName: string;
	accountNo: string;
	accountName: string;
	createdAt: Date;
	customer: UserType;
	GiftCardTransaction: GiftCardTransaction[];
	CryptoTransaction: CryptoTransaction[];
}

export interface Setting {
	key: string;
	value: string;
}

export interface WalletAddress {
	id: string;
	name: string;
	symbol: string;
	address: string;
	network: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
