import { AdminType } from "@/utils/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";

interface authAdminStoreState {
	user: AdminType | undefined | null;
	token: string | undefined | null;
	setSession: (user: AdminType, token: string) => void;
	clearSession: () => void;
	validateToken: () => void;
	isAuthenticated: () => boolean;
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
const authAdminStoreSlice: StateCreator<authAdminStoreState> = (set, get) => ({
	user: null,
	token: null,
	setSession: (user: AdminType, token: string) => {
		set({
			user,
			token,
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
});

const persistedAuthStore = persist(authAdminStoreSlice, {
	name: "ad-store",
	storage: createJSONStorage(() => localStorage),
	onRehydrateStorage: () => (state) => {
		if (state) {
			state.validateToken();
		}
	},
});
export const useAuthAdminStore = create(persistedAuthStore);
