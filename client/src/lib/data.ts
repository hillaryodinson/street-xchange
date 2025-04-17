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

export const airports = [
	{ value: "jfk", label: "New York (JFK)" },
	{ value: "lax", label: "Los Angeles (LAX)" },
	{ value: "lhr", label: "London (LHR)" },
	{ value: "cdg", label: "Paris (CDG)" },
	{ value: "dxb", label: "Dubai (DXB)" },
	{ value: "hnd", label: "Tokyo (HND)" },
	{ value: "sin", label: "Singapore (SIN)" },
	{ value: "syd", label: "Sydney (SYD)" },
] as const;

export const banks = [
	{
		name: "9mobile 9Payment Service Bank",
		code: "120001",
	},
	{
		name: "Abbey Mortgage Bank",
		code: "404",
	},
	{
		name: "Above Only MFB",
		code: "51204",
	},
	{
		name: "Abulesoro MFB",
		code: "51312",
	},
	{
		name: "Access Bank",
		code: "044",
	},
	{
		name: "Access Bank (Diamond)",
		code: "063",
	},
	{
		name: "Accion Microfinance Bank",
		code: "602",
	},
	{
		name: "AG Mortgage Bank",
		code: "90077",
	},
	{
		name: "Ahmadu Bello University Microfinance Bank",
		code: "50036",
	},
	{
		name: "Airtel Smartcash PSB",
		code: "120004",
	},
	{
		name: "AKU Microfinance Bank",
		code: "51336",
	},
	{
		name: "Akuchukwu Microfinance Bank Limited",
		code: "090561",
	},
	{
		name: "ALAT by WEMA",
		code: "035",
	},
	{
		name: "Amegy Microfinance Bank",
		code: "090629",
	},
	{
		name: "Amju Unique MFB",
		code: "50926",
	},
	{
		name: "AMPERSAND MICROFINANCE BANK",
		code: "51341",
	},
	{
		name: "Aramoko MFB",
		code: "50083",
	},
	{
		name: "ASO Savings and Loans",
		code: "401",
	},
	{
		name: "Astrapolaris MFB LTD",
		code: "50094",
	},
	{
		name: "AVUENEGBE MICROFINANCE BANK",
		code: "090478",
	},
	{
		name: "AWACASH MICROFINANCE BANK",
		code: "51351",
	},
	{
		name: "Bainescredit MFB",
		code: "51229",
	},
	{
		name: "Banc Corp Microfinance Bank",
		code: "50117",
	},
	{
		name: "Baobab Microfinance Bank",
		code: "50992",
	},
	{
		name: "BellBank Microfinance Bank",
		code: "51100",
	},
	{
		name: "Benysta Microfinance Bank Limited",
		code: "51267",
	},
	{
		name: "Beststar Microfinance Bank",
		code: "50123",
	},
	{
		name: "Bowen Microfinance Bank",
		code: "50931",
	},
	{
		name: "Branch International Financial Services Limited",
		code: "40163",
	},
	{
		name: "Carbon",
		code: "565",
	},
	{
		name: "Cashbridge Microfinance Bank Limited",
		code: "51353",
	},
	{
		name: "CASHCONNECT MFB",
		code: "865",
	},
	{
		name: "CEMCS Microfinance Bank",
		code: "50823",
	},
	{
		name: "Chanelle Microfinance Bank Limited",
		code: "50171",
	},
	{
		name: "Chikum Microfinance bank",
		code: "312",
	},
	{
		name: "Citibank Nigeria",
		code: "023",
	},
	{
		name: "CITYCODE MORTAGE BANK",
		code: "070027",
	},
	{
		name: "Consumer Microfinance Bank",
		code: "50910",
	},
	{
		name: "Corestep MFB",
		code: "50204",
	},
	{
		name: "Coronation Merchant Bank",
		code: "559",
	},
	{
		name: "County Finance Limited",
		code: "40128",
	},
	{
		name: "Crescent MFB",
		code: "51297",
	},
	{
		name: "Crust Microfinance Bank",
		code: "090560",
	},
	{
		name: "Davenport MICROFINANCE BANK",
		code: "51334",
	},
	{
		name: "Dot Microfinance Bank",
		code: "50162",
	},
	{
		name: "Ecobank Nigeria",
		code: "050",
	},
	{
		name: "Ekimogun MFB",
		code: "50263",
	},
	{
		name: "Ekondo Microfinance Bank",
		code: "098",
	},
	{
		name: "EXCEL FINANCE BANK",
		code: "090678",
	},
	{
		name: "Eyowo",
		code: "50126",
	},
	{
		name: "Fairmoney Microfinance Bank",
		code: "51318",
	},
	{
		name: "Fedeth MFB",
		code: "50298",
	},
	{
		name: "Fidelity Bank",
		code: "070",
	},
	{
		name: "Firmus MFB",
		code: "51314",
	},
	{
		name: "First Bank of Nigeria",
		code: "011",
	},
	{
		name: "First City Monument Bank",
		code: "214",
	},
	{
		name: "FIRST ROYAL MICROFINANCE BANK",
		code: "090164",
	},
	{
		name: "FirstTrust Mortgage Bank Nigeria",
		code: "413",
	},
	{
		name: "FLOURISH MFB",
		code: "50315",
	},
	{
		name: "FSDH Merchant Bank Limited",
		code: "501",
	},
	{
		name: "FUTMINNA MICROFINANCE BANK",
		code: "832",
	},
	{
		name: "Gateway Mortgage Bank LTD",
		code: "812",
	},
	{
		name: "Globus Bank",
		code: "00103",
	},
	{
		name: "Goldman MFB",
		code: "090574",
	},
	{
		name: "GoMoney",
		code: "100022",
	},
	{
		name: "GOOD SHEPHERD MICROFINANCE BANK",
		code: "090664",
	},
	{
		name: "Goodnews Microfinance Bank",
		code: "50739",
	},
	{
		name: "Greenwich Merchant Bank",
		code: "562",
	},
	{
		name: "Guaranty Trust Bank",
		code: "058",
	},
	{
		name: "Hackman Microfinance Bank",
		code: "51251",
	},
	{
		name: "Hasal Microfinance Bank",
		code: "50383",
	},
	{
		name: "HopePSB",
		code: "120002",
	},
	{
		name: "Ibile Microfinance Bank",
		code: "51244",
	},
	{
		name: "Ikoyi Osun MFB",
		code: "50439",
	},
	{
		name: "Ilaro Poly Microfinance Bank",
		code: "50442",
	},
	{
		name: "Imowo MFB",
		code: "50453",
	},
	{
		name: "IMPERIAL HOMES MORTAGE BANK",
		code: "415",
	},
	{
		name: "Infinity MFB",
		code: "50457",
	},
	{
		name: "Jaiz Bank",
		code: "301",
	},
	{
		name: "Kadpoly MFB",
		code: "50502",
	},
	{
		name: "KANOPOLY MFB",
		code: "51308",
	},
	{
		name: "Keystone Bank",
		code: "082",
	},
	{
		name: "KONGAPAY (Kongapay Technologies Limited)(formerly Zinternet)",
		code: "100025",
	},
	{
		name: "Kredi Money MFB LTD",
		code: "50200",
	},
	{
		name: "Kuda Bank",
		code: "50211",
	},
	{
		name: "Lagos Building Investment Company Plc.",
		code: "90052",
	},
	{
		name: "Links MFB",
		code: "50549",
	},
	{
		name: "Living Trust Mortgage Bank",
		code: "031",
	},
	{
		name: "LOMA MFB",
		code: "50491",
	},
	{
		name: "Lotus Bank",
		code: "303",
	},
	{
		name: "MAINSTREET MICROFINANCE BANK",
		code: "090171",
	},
	{
		name: "Mayfair MFB",
		code: "50563",
	},
	{
		name: "Mint MFB",
		code: "50304",
	},
	{
		name: "Money Master PSB",
		code: "946",
	},
	{
		name: "Moniepoint MFB",
		code: "50515",
	},
	{
		name: "MTN Momo PSB",
		code: "120003",
	},
	{
		name: "MUTUAL BENEFITS MICROFINANCE BANK",
		code: "090190",
	},
	{
		name: "NDCC MICROFINANCE BANK",
		code: "090679",
	},
	{
		name: "NET MICROFINANCE BANK",
		code: "51361",
	},
	{
		name: "Nigerian Navy Microfinance Bank Limited",
		code: "51142",
	},
	{
		name: "NPF MICROFINANCE BANK",
		code: "50629",
	},
	{
		name: "OPay Digital Services Limited (OPay)",
		code: "999992",
	},
	{
		name: "Optimus Bank Limited",
		code: "107",
	},
	{
		name: "Paga",
		code: "100002",
	},
	{
		name: "PalmPay",
		code: "999991",
	},
	{
		name: "Parallex Bank",
		code: "104",
	},
	{
		name: "Parkway - ReadyCash",
		code: "311",
	},
	{
		name: "PATHFINDER MICROFINANCE BANK LIMITED",
		code: "090680",
	},
	{
		name: "Paystack-Titan",
		code: "100039",
	},
	{
		name: "Peace Microfinance Bank",
		code: "50743",
	},
	{
		name: "PECANTRUST MICROFINANCE BANK LIMITED",
		code: "51226",
	},
	{
		name: "Personal Trust MFB",
		code: "51146",
	},
	{
		name: "Petra Mircofinance Bank Plc",
		code: "50746",
	},
	{
		name: "PFI FINANCE COMPANY LIMITED",
		code: "050021",
	},
	{
		name: "Platinum Mortgage Bank",
		code: "268",
	},
	{
		name: "Pocket App",
		code: "00716",
	},
	{
		name: "Polaris Bank",
		code: "076",
	},
	{
		name: "Polyunwana MFB",
		code: "50864",
	},
	{
		name: "PremiumTrust Bank",
		code: "105",
	},
	{
		name: "PROSPERIS FINANCE LIMITED",
		code: "050023",
	},
	{
		name: "Providus Bank",
		code: "101",
	},
	{
		name: "QuickFund MFB",
		code: "51293",
	},
	{
		name: "Rand Merchant Bank",
		code: "502",
	},
	{
		name: "RANDALPHA MICROFINANCE BANK",
		code: "090496",
	},
	{
		name: "Refuge Mortgage Bank",
		code: "90067",
	},
	{
		name: "REHOBOTH MICROFINANCE BANK",
		code: "50761",
	},
	{
		name: "Rephidim Microfinance Bank",
		code: "50994",
	},
	{
		name: "Rigo Microfinance Bank Limited",
		code: "51286",
	},
	{
		name: "ROCKSHIELD MICROFINANCE BANK",
		code: "50767",
	},
	{
		name: "Rubies MFB",
		code: "125",
	},
	{
		name: "Safe Haven MFB",
		code: "51113",
	},
	{
		name: "Safe Haven Microfinance Bank Limited",
		code: "951113",
	},
	{
		name: "SAGE GREY FINANCE LIMITED",
		code: "40165",
	},
	{
		name: "Shield MFB",
		code: "50582",
	},
	{
		name: "Signature Bank Ltd",
		code: "106",
	},
	{
		name: "Solid Allianze MFB",
		code: "51062",
	},
	{
		name: "Solid Rock MFB",
		code: "50800",
	},
	{
		name: "Sparkle Microfinance Bank",
		code: "51310",
	},
	{
		name: "Stanbic IBTC Bank",
		code: "221",
	},
	{
		name: "Standard Chartered Bank",
		code: "068",
	},
	{
		name: "STANFORD MICROFINANCE BANK",
		code: "090162",
	},
	{
		name: "STATESIDE MICROFINANCE BANK",
		code: "50809",
	},
	{
		name: "Stellas MFB",
		code: "51253",
	},
	{
		name: "Sterling Bank",
		code: "232",
	},
	{
		name: "Suntrust Bank",
		code: "100",
	},
	{
		name: "Supreme MFB",
		code: "50968",
	},
	{
		name: "TAJ Bank",
		code: "302",
	},
	{
		name: "Tangerine Money",
		code: "51269",
	},
	{
		name: "TCF MFB",
		code: "51211",
	},
	{
		name: "Titan Bank",
		code: "102",
	},
	{
		name: "U&C Microfinance Bank Ltd (U AND C MFB)",
		code: "50840",
	},
	{
		name: "Uhuru MFB",
		code: "51322",
	},
	{
		name: "Unaab Microfinance Bank Limited",
		code: "50870",
	},
	{
		name: "Unical MFB",
		code: "50871",
	},
	{
		name: "Unilag Microfinance Bank",
		code: "51316",
	},
	{
		name: "Union Bank of Nigeria",
		code: "032",
	},
	{
		name: "United Bank For Africa",
		code: "033",
	},
	{
		name: "Unity Bank",
		code: "215",
	},
	{
		name: "Uzondu Microfinance Bank Awka Anambra State",
		code: "50894",
	},
	{
		name: "Vale Finance Limited",
		code: "050020",
	},
	{
		name: "VFD Microfinance Bank Limited",
		code: "566",
	},
	{
		name: "Waya Microfinance Bank",
		code: "51355",
	},
	{
		name: "Wema Bank",
		code: "035",
	},
	{
		name: "Zenith Bank",
		code: "057",
	},
] as const;

export const cryptoes = [
	{
		name: "Bitcoin",
		symbol: "BTC",
		networks: ["Bitcoin Mainnet", "Lightning Network", "Testnet"],
	},
	{
		name: "Ethereum",
		symbol: "ETH",
		networks: [
			"Ethereum Mainnet",
			"Goerli Testnet",
			"Sepolia Testnet",
			"Arbitrum",
			"Optimism",
			"Polygon",
			"zkSync",
			"Base",
		],
	},
	{
		name: "Binance Coin",
		symbol: "BNB",
		networks: [
			"BNB Beacon Chain (BEP2)",
			"BNB Smart Chain (BEP20)",
			"BNB Greenfield",
		],
	},
	{
		name: "Solana",
		symbol: "SOL",
		networks: ["Solana Mainnet Beta", "Solana Testnet", "Solana Devnet"],
	},
	{
		name: "Cardano",
		symbol: "ADA",
		networks: ["Cardano Mainnet", "Preprod Testnet", "Preview Testnet"],
	},
	{
		name: "Tether",
		symbol: "USDT",
		networks: [
			"Ethereum (ERC-20)",
			"Tron (TRC-20)",
			"BNB Smart Chain (BEP-20)",
			"Polygon",
			"Solana",
			"Algorand",
			"Avalanche",
			"Arbitrum",
			"Optimism",
			"Near",
			"EOS",
			"Omni",
		],
	},
] as const;
