import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as analyticsService from "./analyticsService.js";

export const getAnalytics = asyncHandler(
	async (req: Request, res: Response) => {
		const analytics = await analyticsService.getAnalytics(
			(req.user as { id: string }).id,
		);

		res
			.status(200)
			.json(new ApiResponse("Analytics fetched successfully", analytics));
	},
);
