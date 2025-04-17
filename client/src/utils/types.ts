import { z } from "zod";
import {
	BankSchema,
	ChangePasswordSchema,
	generalFormSchema,
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
export interface Transaction {
	id: string;
	date: string;
	type: "flight" | "crypto" | "giftcard";
	description: string;
	amount: number;
	status: "pending" | "completed" | "failed";
}

export type BankType = z.infer<typeof BankSchema>;
export type KYCType = z.infer<typeof KYCSchema>;
export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

export type GeneralFormValues = z.infer<typeof generalFormSchema>;
export type WalletFormValues = z.infer<typeof walletFormSchema>;
