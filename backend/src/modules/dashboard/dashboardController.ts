import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as dashboardService from "./dashboardService.js";

export const getDashboard = asyncHandler(
	async (req: Request, res: Response) => {
		const dashboard = await dashboardService.getDashboard(
			(req.user as { id: string }).id,
		);

		res
			.status(200)
			.json(new ApiResponse("Dashboard fetched successfully", dashboard));
	},
);
