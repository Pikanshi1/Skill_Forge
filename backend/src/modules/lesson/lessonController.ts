import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as lessonService from "./lessonService.js";

export const getLessonById = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const userId = (req.user as { id: string }).id;
		const lesson = await lessonService.getLessonById(
			req.params.lessonId as string,
			userId,
		);

		if (!lesson) {
			res.status(404).json(new ApiResponse("Lesson not found", null));
			return;
		}

		res
			.status(200)
			.json(new ApiResponse("Lesson fetched successfully", lesson));
	},
);

export const generateLesson = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const userId = (req.user as { id: string }).id;
		const lesson = await lessonService.generateLesson(
			req.params.lessonId as string,
			userId,
		);

		res
			.status(200)
			.json(new ApiResponse("Lesson generated successfully", lesson));
	},
);

export const regenerateLesson = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const userId = (req.user as { id: string }).id;
		const lesson = await lessonService.regenerateLesson(
			req.params.lessonId as string,
			userId,
		);

		res
			.status(200)
			.json(new ApiResponse("Lesson regenerated successfully", lesson));
	},
);

export const getModuleLessons = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const userId = (req.user as { id: string }).id;
		const lessons = await lessonService.getModuleLessons(
			req.params.moduleId as string,
			userId,
		);

		res
			.status(200)
			.json(new ApiResponse("Lessons fetched successfully", lessons));
	},
);

export const markLessonCompleted = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const progress = await lessonService.markLessonCompleted(
			req.params.lessonId as string,
			(req.user as { id: string }).id,
		);

		res
			.status(200)
			.json(new ApiResponse("Lesson marked as completed", progress));
	},
);

export const getLessonSummary = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const userId = (req.user as { id: string }).id;
		const summary = await lessonService.getLessonSummary(
			req.params.lessonId as string,
			userId,
		);

		res
			.status(200)
			.json(new ApiResponse("Lesson summary fetched successfully", summary));
	},
);
