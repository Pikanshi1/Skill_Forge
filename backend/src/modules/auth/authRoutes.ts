import { Router } from "express";
import rateLimit from "express-rate-limit";
import authMiddleware from "../../middleware/authMiddleware.js";
import validateRequest from "../../middleware/validateRequest.js";
import {
	changePassword,
	deleteAccount,
	forgotPasswordController,
	login,
	logout,
	profile,
	register,
	resetPasswordController,
	updateProfile,
} from "./authController.js";
import {
	changePasswordSchema,
	forgotPasswordSchema,
	loginSchema,
	registerSchema,
	resetPasswordSchema,
	updateProfileSchema,
} from "./authValidator.js";

const router = Router();
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: {
		success: false,
		message: "Too many authentication attempts. Try again later.",
	},
});

router.post(
	"/register",
	authLimiter,
	validateRequest(registerSchema),
	register,
);

router.post("/login", authLimiter, validateRequest(loginSchema), login);

router.post("/logout", authMiddleware, logout);

router.post(
	"/forgot-password",
	authLimiter,
	validateRequest(forgotPasswordSchema),
	forgotPasswordController,
);

router.post(
	"/reset-password",
	authLimiter,
	validateRequest(resetPasswordSchema),
	resetPasswordController,
);

router.get("/profile", authMiddleware, profile);

router.patch(
	"/profile",
	authMiddleware,
	validateRequest(updateProfileSchema),
	updateProfile,
);

router.patch(
	"/change-password",
	authMiddleware,
	validateRequest(changePasswordSchema),
	changePassword,
);

router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;
