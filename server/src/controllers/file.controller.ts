import { Request } from "express";
import {
	CustomResponse,
	TypedRequest,
	TypedRequestQuery,
	TypedResponse,
} from "../configs/requests";
import { AppError, ERROR_CODES } from "../utils/errors";
import path from "path";
import fs from "fs";
import sharp from "sharp";

export const uploadFile = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	const files = req.files as Express.Multer.File[];
	const request = req as TypedRequestQuery<{ withThumb: string }>;
	const generateThumbnails = request.query.withThumb || false;
	const customer = request.user?.id;

	if (!customer)
		throw new AppError(
			ERROR_CODES.USER_NOT_AUTHORIZED,
			"Unauthorized",
			401
		);

	if (!files || files.length === 0) {
		throw new AppError(
			ERROR_CODES.FILE_NOT_FOUND,
			"No file was uploaded",
			400
		);
	}

	// Ensure temp/customer directory exists
	const tempCustomerPath = path.join("temp", customer);
	if (!fs.existsSync(tempCustomerPath)) {
		fs.mkdirSync(tempCustomerPath, { recursive: true });
	}

	const response = await Promise.all(
		files.map(async (file) => {
			const tempThumbPath = path.join(
				tempCustomerPath,
				"thumb",
				file.filename
			);
			const tempMainPath = path.join(
				tempCustomerPath,
				"main",
				file.filename
			);

			// Ensure temp/thumb and temp/main directories exist
			if (generateThumbnails) {
				const tempThumbDir = path.join(tempCustomerPath, "thumb");
				if (!fs.existsSync(tempThumbDir)) {
					fs.mkdirSync(tempThumbDir, { recursive: true });
				}
			}

			const tempMainDir = path.join(tempCustomerPath, "main");
			if (!fs.existsSync(tempMainDir)) {
				fs.mkdirSync(tempMainDir, { recursive: true });
			}

			if (generateThumbnails) {
				// Resize the image to thumbnail
				await sharp(file.path).resize(150, 150).toFile(tempThumbPath);
			}

			// Resize the image to main size
			await sharp(file.path).resize(800, 800).toFile(tempMainPath);

			// Return paths for thumb and main images
			const BASEURL = process.env.SERVER_URL || "http://localhost:3000";
			return generateThumbnails
				? {
						thumb: `${BASEURL}/${tempThumbPath}`,
						main: `${BASEURL}/${tempMainPath}`,
				  }
				: {
						main: `${BASEURL}/${tempMainPath}`,
				  };
		})
	);

	res.status(200).json({
		success: true,
		message: "File uploaded successfully",
		data: response,
	});
};

export const deleteFile = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	const request = req as TypedRequest<{}, { filename: string }>;
	const filename = request.body.filename;

	if (!filename)
		throw new AppError(
			ERROR_CODES.FILE_NOT_FOUND,
			"File name is required",
			400
		);

	// Build the paths for both thumb and main images
	const thumbPath = path.join("uploads", "thumb", filename as string);
	const mainPath = path.join("uploads", "main", filename as string);

	// Function to delete a file
	const deleteFile = (filePath: string): Promise<void> => {
		return new Promise((resolve, reject) => {
			fs.unlink(filePath, (err) => {
				if (err) {
					return reject(`Error deleting file: ${filePath}`);
				}
				resolve();
			});
		});
	};

	// Delete the files (thumb and main)
	await Promise.all([deleteFile(thumbPath), deleteFile(mainPath)]);

	res.status(200).json({
		success: true,
		message: "File was deleted successfully",
	});
};
