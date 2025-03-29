import { Transaction } from "@/utils/types";

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

// Sample transaction data
export const allTransactions: Transaction[] = [
	{
		id: "TX123456",
		date: "2023-03-15T10:30:00",
		type: "flight",
		description: "Flight Booking - JFK to LHR",
		amount: -850.0,
		status: "completed",
	},
	{
		id: "TX123457",
		date: "2023-03-14T14:20:00",
		type: "crypto",
		description: "Bitcoin Exchange",
		amount: 1200.0,
		status: "completed",
	},
	{
		id: "TX123458",
		date: "2023-03-10T09:15:00",
		type: "giftcard",
		description: "Amazon Gift Card Sale",
		amount: 50.0,
		status: "completed",
	},
	{
		id: "TX123459",
		date: "2023-03-05T16:45:00",
		type: "flight",
		description: "Flight Booking - LAX to SYD",
		amount: -1250.0,
		status: "completed",
	},
	{
		id: "TX123460",
		date: "2023-03-02T11:30:00",
		type: "crypto",
		description: "Ethereum Exchange",
		amount: 750.0,
		status: "completed",
	},
	{
		id: "TX123461",
		date: "2023-02-28T13:20:00",
		type: "giftcard",
		description: "iTunes Gift Card Sale",
		amount: 25.0,
		status: "completed",
	},
	{
		id: "TX123462",
		date: "2023-02-25T10:10:00",
		type: "flight",
		description: "Flight Booking - LHR to CDG",
		amount: -320.0,
		status: "completed",
	},
	{
		id: "TX123463",
		date: "2023-02-20T15:30:00",
		type: "crypto",
		description: "Solana Exchange",
		amount: 180.0,
		status: "completed",
	},
	{
		id: "TX123464",
		date: "2023-02-18T09:45:00",
		type: "giftcard",
		description: "Google Play Gift Card Sale",
		amount: 30.0,
		status: "completed",
	},
	{
		id: "TX123465",
		date: "2023-02-15T14:15:00",
		type: "flight",
		description: "Flight Booking - DXB to SIN",
		amount: -950.0,
		status: "completed",
	},
	{
		id: "TX123466",
		date: "2023-02-10T11:00:00",
		type: "crypto",
		description: "Bitcoin Exchange",
		amount: 2200.0,
		status: "completed",
	},
	{
		id: "TX123467",
		date: "2023-02-05T16:20:00",
		type: "giftcard",
		description: "Steam Gift Card Sale",
		amount: 100.0,
		status: "completed",
	},
	{
		id: "TX123468",
		date: "2023-01-30T13:45:00",
		type: "flight",
		description: "Flight Booking - JFK to LAX",
		amount: -450.0,
		status: "completed",
	},
	{
		id: "TX123469",
		date: "2023-01-25T10:30:00",
		type: "crypto",
		description: "Tether Exchange",
		amount: 500.0,
		status: "completed",
	},
	{
		id: "TX123470",
		date: "2023-01-20T09:15:00",
		type: "giftcard",
		description: "eBay Gift Card Sale",
		amount: 75.0,
		status: "completed",
	},
	{
		id: "TX123471",
		date: "2023-04-01T10:30:00",
		type: "flight",
		description: "Flight Booking - SYD to HND",
		amount: -1100.0,
		status: "pending",
	},
	{
		id: "TX123472",
		date: "2023-04-02T14:20:00",
		type: "crypto",
		description: "Ethereum Exchange",
		amount: 900.0,
		status: "pending",
	},
	{
		id: "TX123473",
		date: "2023-04-03T09:15:00",
		type: "giftcard",
		description: "Razer Gold Gift Card Sale",
		amount: 80.0,
		status: "pending",
	},
];
