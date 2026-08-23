import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";

const errorMiddleware = (
	err: Error | AppError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const statusCode = err instanceof AppError ? err.statusCode : 500;

	res.status(statusCode).json({
		success: false,
		message: statusCode === 500 ? "Internal Server Error" : err.message,
	});
};

export default errorMiddleware;
