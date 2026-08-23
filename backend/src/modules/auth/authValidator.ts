import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),

	email: z.string().email("Invalid email address"),

	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(128, "Password must be 128 characters or fewer"),
});

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),

	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
	.object({
		token: z.string().min(1, "Token is required"),

		password: z.string().min(8).max(128),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const updateProfileSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	avatar: z.string().url("Invalid avatar URL").optional().or(z.literal("")),
});

export const changePasswordSchema = z.object({
	currentPassword: z.string(),
	newPassword: z.string().min(8).max(128),
});
