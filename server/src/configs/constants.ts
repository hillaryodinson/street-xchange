export const SettingColunns = {
	NGN_RATE: "ngn_rate",
	TRANS_EXPIRY_SEC: "trans_expiry_sec", // 30 minutes
} as const;

export const DefaultSettings = {
	[SettingColunns.NGN_RATE]: 0,
	[SettingColunns.TRANS_EXPIRY_SEC]: 1800, // 30 minutes
};
