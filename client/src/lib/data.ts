export const giftCardTypes = [
	{ value: "itunes", label: "iTunes", rate: 0.8 },
	{ value: "amazon", label: "Amazon", rate: 0.85 },
	{ value: "steam", label: "Steam", rate: 0.82 },
	{ value: "ebay", label: "eBay", rate: 0.78 },
	{ value: "razer", label: "Razer Gold", rate: 0.75 },
	{ value: "google", label: "Google Play", rate: 0.8 },
] as const;

export const countries = [
	{ value: "us", label: "United States" },
	{ value: "uk", label: "United Kingdom" },
	{ value: "ca", label: "Canada" },
	{ value: "au", label: "Australia" },
	{ value: "eu", label: "Europe" },
	{ value: "other", label: "Other" },
] as const;

export const cardTypes = [
	{ value: "physical", label: "Physical Card" },
	{ value: "ecode", label: "E-Code" },
	{ value: "horizontal", label: "Horizontal" },
	{ value: "whiteboard", label: "White Board" },
] as const;

export const cryptocurrencies = [
	{
		value: "btc",
		label: "Bitcoin (BTC)",
		rate: { usd: 43250, ngn: 43250 * 1550 },
	},
	{
		value: "eth",
		label: "Ethereum (ETH)",
		rate: { usd: 3150, ngn: 3150 * 1550 },
	},
	{ value: "usdt", label: "Tether (USDT)", rate: { usd: 1, ngn: 1550 } },
	{
		value: "bnb",
		label: "Binance Coin (BNB)",
		rate: { usd: 530, ngn: 530 * 1550 },
	},
	{
		value: "sol",
		label: "Solana (SOL)",
		rate: { usd: 102, ngn: 102 * 1550 },
	},
	{
		value: "xrp",
		label: "Ripple (XRP)",
		rate: { usd: 0.5, ngn: 0.5 * 1550 },
	},
] as const;
