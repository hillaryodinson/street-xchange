"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardTransactionSchema = exports.CryptoTransactionSchema = exports.WalletSchema = exports.imageSchema = exports.bankSchema = exports.transactionSchema = exports.kycSchema = exports.bookingSchema = exports.newAccountSchema = exports.confirmPasswordResetSchema = exports.resetPasswordSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.resetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    callback_url: zod_1.z.string(),
});
exports.confirmPasswordResetSchema = zod_1.z.object({
    token: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.newAccountSchema = zod_1.z
    .object({
    firstname: zod_1.z
        .string()
        .min(2, "First name must be at least 2 characters"),
    middlename: zod_1.z.string().optional(),
    surname: zod_1.z.string().min(2, "Surname must be at least 2 characters"),
    email: zod_1.z.string().email("Please enter a valid email address"),
    dateOfBirth: zod_1.z.string().refine((date) => {
        const today = new Date();
        const dob = new Date(date);
        const age = today.getFullYear() - dob.getFullYear();
        return age >= 18;
    }, "You must be at least 18 years old"),
    address: zod_1.z.string().min(5, "Please enter a valid address"),
    phoneNumber: zod_1.z.string().min(10, "Please enter a valid phone number"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: zod_1.z.string(),
    callbackUrl: zod_1.z.string().optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
exports.bookingSchema = zod_1.z
    .object({
    from: zod_1.z.string({
        required_error: "Please select a departure airport.",
    }),
    to: zod_1.z.string({
        required_error: "Please select a destination airport.",
    }),
    scheduledFlightDate: zod_1.z.coerce.date({
        required_error: "Please select a flight date.",
    }),
    type: zod_1.z.enum(["economy", "business", "firstClass"], {
        required_error: "Please select a flight class.",
    }),
    paymentMethod: zod_1.z.string({
        required_error: "Please select a cryptocurrency for payment.",
    }),
    passengers: zod_1.z.coerce.number().min(1).max(10),
})
    .refine((data) => data.from !== data.to, {
    message: "Departure and destination airports cannot be the same.",
    path: ["to"],
});
exports.kycSchema = zod_1.z.object({
    type: zod_1.z.string(),
    number: zod_1.z.string(),
    frontimage: zod_1.z.string(),
    backimage: zod_1.z.string().optional(),
});
exports.transactionSchema = zod_1.z.object({
    transType: zod_1.z.string(),
    description: zod_1.z.string(),
    amount: zod_1.z.coerce.string(),
    customerId: zod_1.z.string(),
    transId: zod_1.z.string(),
    typeId: zod_1.z.string(),
});
exports.bankSchema = zod_1.z.object({
    bankName: zod_1.z.string(),
    accountNo: zod_1.z.string(),
    accountName: zod_1.z.string(),
});
exports.imageSchema = zod_1.z.object({
    image: zod_1.z.string(),
    thumb: zod_1.z.string(),
});
exports.WalletSchema = zod_1.z.object({
    name: zod_1.z.string(),
    symbol: zod_1.z.string(),
    network: zod_1.z.string(),
    address: zod_1.z.string(),
});
exports.CryptoTransactionSchema = zod_1.z.object(Object.assign({ cryptoTypeSent: zod_1.z.string(), cryptoAmountSent: zod_1.z.coerce.number(), fiatAmountReceived: zod_1.z.coerce.number(), fiatCurrency: zod_1.z.string(), fiatRate: zod_1.z.coerce.number(), currentUSDRate: zod_1.z.coerce.number(), walletAddress: zod_1.z.string(), walletNetwork: zod_1.z.string() }, exports.bankSchema.shape));
/*
cardType   String //itunes,amazon, steam, ebay, razer gold, google
  country    String
  type       String //Physical, Ecode, Horizontal, white board
  speed      Int?
  amount     Int
  isPending  Boolean  @default(true)
*/
exports.GiftCardTransactionSchema = zod_1.z.object({
    cardType: zod_1.z.string(),
    country: zod_1.z.string(),
    type: zod_1.z.string(),
    speed: zod_1.z.coerce.number().optional(),
    amount: zod_1.z.coerce.number(),
    accountId: zod_1.z.string(),
    pin: zod_1.z.string().optional(),
    additionalInfo: zod_1.z.string().optional(),
    cardCode: zod_1.z.string().optional(),
    cardImage: zod_1.z.string().optional(),
});
