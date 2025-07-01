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

export type UserType = {
	id: string;
	email: string;
	role: string;
	firstname: string;
	middlename: string;
	surname: string;
	createdat: string;
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

export interface Transaction {
	id: string;
	date: string;
	transId: string;
	transType: "flight" | "crypto" | "giftcard";
	description: string;
	amount: number;
	status: "pending" | "completed" | "failed";
	cryptoTransId: string;
	flightTransId: string;
	giftcardTransId: string;
	customerId: string;
	createdDate: string;
}
