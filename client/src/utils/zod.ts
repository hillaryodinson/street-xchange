import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email("Invalid email address."),
	password: z
		.string()
		.min(1, "Password must be more than one character and less than 20")
		.max(20, "Password must be more than one character and less than 20"),
});

export const registerFormSchema = z
	.object({
		firstname: z
			.string()
			.min(2, "First name must be at least 2 characters"),
		middlename: z.string().optional(),
		surname: z.string().min(2, "Surname must be at least 2 characters"),
		email: z.string().email("Please enter a valid email address"),
		dateOfBirth: z.string().refine((date) => {
			const today = new Date();
			const dob = new Date(date);
			const age = today.getFullYear() - dob.getFullYear();
			return age >= 18;
		}, "You must be at least 18 years old"),
		address: z.string().min(5, "Please enter a valid address"),
		phoneNumber: z.string().min(10, "Please enter a valid phone number"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const PropertySchema = z.object({
	name: z.string(),
	rentalType: z.string(),
	country: z.string(),
	state: z.string(),
	address: z.string(),
	categoryId: z.string(),
});

export const ImageSchema = z.object({
	image: z.string(),
	thumb: z.string(),
});

export const UnitBasicInfoSchema = z.object({
	name: z.string(),
	typeId: z.string(),
	rentPrice: z.coerce.number(),
	rentDuration: z.coerce.number(),
	rentCycle: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
});

export const UnitImageSchema = z.object({
	images: z.array(ImageSchema).optional(),
});

export const CategorySchema = z.object({ name: z.string() });
export const SubCategorySchema = z.object({
	name: z.string(),
	categoryId: z.string(),
});

export const AttributeSchema = z.object({
	name: z.string(),
	type: z.string(),
	valueType: z.string(),
});
