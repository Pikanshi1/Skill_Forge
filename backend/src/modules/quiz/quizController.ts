import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as quizService from "./quizService.js";

const lessonId = (value: string | string[]) =>
	Array.isArray(value) ? value[0] : value;

export const generateQuiz = asyncHandler(
	async (req: Request, res: Response) => {
		const quiz = await quizService.generateQuiz(lessonId(req.params.lessonId));

		res.status(201).json(new ApiResponse("Quiz generated successfully", quiz));
	},
);

export const getQuiz = asyncHandler(async (req: Request, res: Response) => {
	const quiz = await quizService.getQuiz(lessonId(req.params.lessonId));

	res.status(200).json(new ApiResponse("Quiz fetched successfully", quiz));
});

export const submitQuiz = asyncHandler(async (req: Request, res: Response) => {
	const result = await quizService.submitQuiz(
		lessonId(req.params.lessonId),
		(req.user as { id: string }).id,
		req.body.answers,
	);

	res.status(200).json(new ApiResponse("Quiz submitted successfully", result));
});

export const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
	await quizService.deleteQuiz(lessonId(req.params.lessonId));

	res.status(200).json(new ApiResponse("Quiz deleted successfully", null));
});
