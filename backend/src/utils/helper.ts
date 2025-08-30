export const toCurrency = (value: number, currency: string = "NGN") => {
	// return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency,
	}).format(value);
};

export const getCycleLabel = (data: {
	duration: number;
	cycle: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
}) => {
	const cycles = {
		DAILY: data.duration > 1 ? "days" : "day",
		WEEKLY: data.duration > 1 ? "weeks" : "week",
		MONTHLY: data.duration > 1 ? "months" : "month",
		YEARLY: data.duration > 1 ? "years" : "year",
	};
	return cycles[data.cycle] || data.cycle;
};

// const getFlightPrice = () => {
// 	if (!flightDetails) return 0;

// 	const basePrice = 250; // Base price for economy
// 	const typeMultiplier =
// 		flightDetails.type === "economy"
// 			? 1
// 			: flightDetails.type === "business"
// 			? 2.5
// 			: 4; // First class

// 	return basePrice * typeMultiplier * flightDetails.passengers;
// };

// const getCryptoAmount = (flightDetails) => {
// 	if (!flightDetails) return 0;

// 	const price = getFlightPrice();
// 	const cryptoRates = {
// 		btc: 43250, // 1 BTC = $43,250
// 		eth: 3150, // 1 ETH = $3,150
// 		usdt: 1, // 1 USDT = $1
// 		bnb: 530, // 1 BNB = $530
// 		sol: 102, // 1 SOL = $102
// 		xrp: 0.5, // 1 XRP = $0.50
// 	};

// 	const selectedCrypto =
// 		flightDetails.paymentMethod as keyof typeof cryptoRates;
// 	return (price / cryptoRates[selectedCrypto]).toFixed(6);
// };
