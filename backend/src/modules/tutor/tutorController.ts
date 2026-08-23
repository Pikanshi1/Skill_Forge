import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as tutorService from "./tutorService.js";

export const chatWithTutor = asyncHandler(
	async (req: Request, res: Response) => {
		const result = await tutorService.chatWithTutor(
			(req.user as { id: string }).id,
			req.body,
		);

		res
			.status(200)
			.json(new ApiResponse("Tutor response generated successfully", result));
	},
);
