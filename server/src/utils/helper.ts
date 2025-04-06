import { User } from "@prisma/client";
import { NodemailerDB } from "../services/nodemailer-db";
import db from "../configs/db";
import path from "path";
import fs from "fs";

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

export function generateRandomNumbers(length: number) {
	const charset = "0123456789"; // You can customize the character set
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

/**
 * Helper method to move an image from temp to live directory
 * @param publicUrl - The public URL of the image
 * @param customer - The customer ID
 */
export const moveImageToLive = async (
	publicUrl: string,
	customerId: string
) => {
	const imagePath = new URL(publicUrl).pathname; // Extract the path from the URL
	const tempPath = path.join("temp", customerId, imagePath.split("/").pop()!);
	const livePath = path.join("live", customerId, imagePath.split("/").pop()!);

	// Ensure live/customer directory exists
	const liveCustomerPath = path.join("live", customerId);
	if (!fs.existsSync(liveCustomerPath)) {
		fs.mkdirSync(liveCustomerPath, { recursive: true });
	}

	// Move the file from temp to live
	fs.renameSync(tempPath, livePath);

	// Delete all images in temp/customer folder
	const tempCustomerPath = path.join("temp", customerId);
	fs.rmSync(tempCustomerPath, { recursive: true, force: true });

	return livePath;
};
