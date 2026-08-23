import crypto from "crypto";
import env from "../../config/env.js";
import prisma from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";
import type {
	ForgotPasswordInput,
	LoginInput,
	RegisterInput,
	ResetPasswordInput,
} from "./authValidator.js";
import { sendResetPasswordEmail } from "./emailService";

export const registerUser = async (data: RegisterInput) => {
	const existingUser = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	});

	if (existingUser) {
		throw new AppError("User already exists", 409);
	}

	const hashedPassword = await hashPassword(data.password);

	const user = await prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			password: hashedPassword,
		},
	});

	const token = generateToken(user.id);

	return {
		token,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
		},
	};
};

export const loginUser = async (data: LoginInput) => {
	const user = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	});

	if (!user) {
		throw new AppError("Invalid email or password", 401);
	}

	const isPasswordValid = await comparePassword(data.password, user.password);

	if (!isPasswordValid) {
		throw new AppError("Invalid email or password", 401);
	}

	const token = generateToken(user.id);

	return {
		token,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
		},
	};
};

export const logoutUser = async () => {
	return {
		message: "Logged out successfully",
	};
};

export const forgotPassword = async (data: ForgotPasswordInput) => {
	const user = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	});

	if (!user) {
		return {
			message: "If the email exists, a reset link has been sent.",
		};
	}

	const token = crypto.randomBytes(32).toString("hex");
	const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

	const expires = new Date(Date.now() + 15 * 60 * 1000);

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			resetPasswordToken: tokenHash,
			resetPasswordExpires: expires,
		},
	});

	const resetLink = `${env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(token)}`;
	await sendResetPasswordEmail(user.email, resetLink);

	return {
		message: "If the email exists, a reset link has been sent.",
	};
};

export const resetPassword = async (data: ResetPasswordInput) => {
	const tokenHash = crypto
		.createHash("sha256")
		.update(data.token)
		.digest("hex");
	const user = await prisma.user.findFirst({
		where: {
			resetPasswordToken: tokenHash,
			resetPasswordExpires: {
				gt: new Date(),
			},
		},
	});

	if (!user) {
		throw new AppError("Invalid or expired reset token.", 400);
	}

	const hashedPassword = await hashPassword(data.password);

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			password: hashedPassword,
			resetPasswordToken: null,
			resetPasswordExpires: null,
		},
	});

	return {
		message: "Password reset successfully.",
	};
};

export const getProfile = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true,
			avatar: true,
		},
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	return user;
};

export const updateProfileService = async (
	userId: string,
	data: {
		name?: string;
		email?: string;
		avatar?: string;
	},
) => {
	const user = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			name: data.name,
			email: data.email,
			avatar: data.avatar,
		},
	});

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		avatar: user.avatar,
	};
};

export const changePasswordService = async (
	userId: string,
	data: {
		currentPassword: string;
		newPassword: string;
	},
) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	const match = await comparePassword(data.currentPassword, user.password);

	if (!match) {
		throw new AppError("Current password is incorrect", 400);
	}

	const hashed = await hashPassword(data.newPassword);

	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			password: hashed,
		},
	});
};

export const deleteAccountService = async (userId: string) => {
	await prisma.user.delete({
		where: {
			id: userId,
		},
	});
};
