import type { NextFunction, Request, Response } from "express";

import {
	changePasswordService,
	deleteAccountService,
	forgotPassword,
	getProfile,
	loginUser,
	logoutUser,
	registerUser,
	resetPassword,
	updateProfileService,
} from "./authService.js";

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await registerUser(req.body);

		res.status(201).json({
			success: true,
			message: "User registered successfully.",
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await loginUser(req.body);

		res.status(200).json({
			success: true,
			message: "Login successful.",
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const logout = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await logoutUser();

		res.status(200).json({
			success: true,
			...result,
		});
	} catch (error) {
		next(error);
	}
};

export const forgotPasswordController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await forgotPassword(req.body);

		res.status(200).json({
			success: true,
			...result,
		});
	} catch (error) {
		next(error);
	}
};

export const resetPasswordController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await resetPassword(req.body);

		res.status(200).json({
			success: true,
			...result,
		});
	} catch (error) {
		next(error);
	}
};

export const profile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await getProfile((req.user as { id: string }).id);

		res.json({
			success: true,
			data: {
				user,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const updateProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await updateProfileService(
			(req.user as { id: string }).id,
			req.body,
		);

		res.json({
			success: true,
			message: "Profile updated successfully",
			data: {
				user,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const changePassword = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await changePasswordService((req.user as { id: string }).id, req.body);

		res.json({
			success: true,
			message: "Password changed successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const deleteAccount = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await deleteAccountService((req.user as { id: string }).id);

		res.json({
			success: true,
			message: "Account deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};
