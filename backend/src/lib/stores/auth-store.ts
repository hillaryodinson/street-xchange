import { UserType, VerificationType } from "@/utils/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";

interface authStoreState {
	user: UserType | undefined | null;
	token: string | undefined | null;
	setSession: (
		user: UserType,
		token: string,
		isVerified: VerificationType
	) => void;
	clearSession: () => void;
	validateToken: () => void;
	isAuthenticated: () => boolean;
	isVerified: VerificationType;
	updateVerificationStatus: (status: VerificationType) => void;
}

const validateToken = (token: string | null): boolean => {
	// Implement your token validation logic here
	// For example, you can check if the token is expired
	if (!token) return false;
	// Assuming the token is a JWT, you can decode and check its expiration
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload.exp > Date.now() / 1000;
	} catch (error) {
		console.log(error);
		return false;
	}
};
const authStoreSlice: StateCreator<authStoreState> = (set, get) => ({
	user: null,
	token: null,
	isVerified: "not-verified",
	setSession: (user: UserType, token: string, isVerified: string) => {
		set({
			user,
			token,
			isVerified: isVerified as VerificationType,
		});
	},

	clearSession: () => {
		set({
			user: null,
			token: null,
		});
	},
	validateToken: () => {
		const { clearSession, token } = get();

		if (!validateToken(token as string)) {
			clearSession();
		}
	},
	isAuthenticated: () => {
		const token = get().token;
		return validateToken(token as string);
	},

	updateVerificationStatus: (status: VerificationType) => {
		set({
			isVerified: status,
		});
	},
});

const persistedAuthStore = persist(authStoreSlice, {
	name: "user-store",
	storage: createJSONStorage(() => localStorage),
	onRehydrateStorage: () => (state) => {
		if (state) {
			state.validateToken();
		}
	},
});
export const useAuthStore = create(persistedAuthStore);
