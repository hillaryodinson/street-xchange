import { User } from "@prisma/client";
import { NodemailerDB } from "../services/nodemailer-db";
import db from "../configs/db";

export const sendActivationEmail = async (token: string, user: User) => {
	//verify email address
	const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";
	const ACTIVATION_ROUTE = process.env.CLIENT_ACTIVATION_ROUTE || "/activate";
	const ACTIVATION_URL = `${CLIENT_URL}${ACTIVATION_ROUTE}?token=${token}`;

	const mailer = new NodemailerDB(db);
	await mailer.sendMail({
		to: user.email,
		subject: "Activate Your Account",
		template: `activate_account`,
		context: {
			name: user.email,
			activationURL: ACTIVATION_URL,
		},
		from: process.env.EMAIL || "no-reply@example.com",
	});
};

export function generateRandomString(length: number) {
	const charset =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // You can customize the character set
	let randomString = "";

	// Loop to generate a random string of the specified length
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		randomString += charset[randomIndex];
	}

	return randomString;
}

export function generateUniqueRandomStrings(count: number, length: number) {
	const uniqueStrings = new Set(); // Set will automatically handle uniqueness

	// Generate unique strings until we have the required count
	while (uniqueStrings.size < count) {
		uniqueStrings.add(generateRandomString(length));
	}

	// Convert the Set back to an array and return it
	return Array.from(uniqueStrings);
}
