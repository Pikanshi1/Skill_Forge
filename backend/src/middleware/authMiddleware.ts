import type { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma.js";
import AppError from "../utils/AppError.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = async (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader?.startsWith("Bearer ")) {
			throw new AppError("Unauthorized", 401);
		}

		const token = authHeader.split(" ")[1];

		const decoded = verifyToken(token);

		const user = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
		});

		if (!user) {
			throw new AppError("User not found", 401);
		}

		const { password, ...userWithoutPassword } = user;

		req.user = userWithoutPassword;

		next();
	} catch (error) {
		next(error);
	}
};

export default authMiddleware;
