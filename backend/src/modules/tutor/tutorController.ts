import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as tutorService from "./tutorService.js";

export const listChats = asyncHandler(async (req: Request, res: Response) => {
	const chats = await tutorService.getTutorChats((req.user as { id: string }).id);

	res.status(200).json(new ApiResponse("Tutor chats retrieved successfully", chats));
});

export const createChat = asyncHandler(async (req: Request, res: Response) => {
	const chat = await tutorService.createTutorChat(
		(req.user as { id: string }).id,
		req.body.title,
	);

	res.status(201).json(new ApiResponse("Tutor chat created successfully", chat));
});

export const getChat = asyncHandler(async (req: Request, res: Response) => {
	const chatId = req.params.chatId;

	if (typeof chatId !== "string") {
		throw new Error("Invalid tutor chat id");
	}

	const chat = await tutorService.getTutorChat(
		(req.user as { id: string }).id,
		chatId,
	);

	res.status(200).json(new ApiResponse("Tutor chat retrieved successfully", chat));
});

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
