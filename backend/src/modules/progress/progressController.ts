import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as progressService from "./progressService.js";

export const getCourseProgress = asyncHandler(
	async (req: Request, res: Response) => {
		const courseId = Array.isArray(req.params.courseId)
			? req.params.courseId[0]
			: req.params.courseId;

		const progress = await progressService.getCourseProgress(
			(req.user as { id: string }).id,
			courseId,
		);

		res
			.status(200)
			.json(new ApiResponse("Progress fetched successfully", progress));
	},
);
