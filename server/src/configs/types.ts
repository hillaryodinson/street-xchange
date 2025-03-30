import { z } from "zod";
import {
	confirmPasswordResetSchema,
	loginSchema,
	newAccountSchema,
	resetPasswordSchema,
} from "./zod";
import { User } from "@prisma/client";

export type LoginType = z.infer<typeof loginSchema>;
export type UserType = Omit<
	User,
	"password, resetToken, actiToken, tokenExpiresAt, isVerified"
>;
export type PublicUserType = {
	id: string;
	firstname: string;
	middlename: string | null;
	surname: string;
	email: string;
	dob: Date;
	residentialAddress: string;
	phoneNo: string;
	nin: string;
	createAt: Date;
};
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type ConfirmPasswordResetType = z.infer<
	typeof confirmPasswordResetSchema
>;
export type NewAccountType = z.infer<typeof newAccountSchema>;
export type AccessTokenType = {
	id: string;
	name: string;
	email: string;
	role: string;
};
