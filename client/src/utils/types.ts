import { z } from "zod";
import { BankSchema, ImageSchema } from "./zod";

export type ApiResponse<T> = {
	success: boolean;
	message: string;
	data?: T;
	errors?: Record<string, unknown>;
};

export type AuthResponse = {
	token: string;
	user: UserType;
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
