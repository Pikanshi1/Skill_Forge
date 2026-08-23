import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as aiService from "./aiService.js";

export const generateCourse = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = (req.user as { id: string }).id;

		const course = await aiService.generateCourse(userId, req.body);

		res
			.status(200)
			.json(new ApiResponse("Course generated successfully", course));
	},
);
