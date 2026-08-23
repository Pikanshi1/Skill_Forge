import type { Request, Response } from "express";
import AppError from "../../utils/AppError.js";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as courseService from "./courseService.js";

export const createCourse = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = (req.user as { id: string }).id;

		if (!userId) {
			throw new AppError("User not authenticated", 401);
		}

		const course = await courseService.createCourse(userId, req.body);

		res
			.status(201)
			.json(new ApiResponse("Course created successfully", course));
	},
);

export const getCourses = asyncHandler(async (req: Request, res: Response) => {
	const userId = (req.user as { id: string }).id;

	if (!userId) {
		throw new AppError("User not authenticated", 401);
	}

	const courses = await courseService.getCourses(userId);

	res
		.status(200)
		.json(new ApiResponse("Courses fetched successfully", courses));
});

export const getCourseById = asyncHandler(
	async (req: Request, res: Response) => {
		const course = await courseService.getCourseById(
			req.params.id as string,
			(req.user as { id: string }).id,
		);

		res
			.status(200)
			.json(new ApiResponse("Course fetched successfully", course));
	},
);

export const updateCourse = asyncHandler(async (req, res) => {
	const course = await courseService.updateCourse(
		req.params.id as string,
		(req.user as { id: string }).id,
		req.body,
	);

	res.json(new ApiResponse("Course updated successfully", course));
});

export const deleteCourse = asyncHandler(async (req, res) => {
	await courseService.deleteCourse(
		req.params.id as string,
		(req.user as { id: string }).id,
	);

	res.json(new ApiResponse("Course deleted successfully", null));
});

export const publishCourse = asyncHandler(async (req, res) => {
	const course = await courseService.publishCourse(
		req.params.id as string,
		(req.user as { id: string }).id,
	);

	res.json(new ApiResponse("Course published successfully", course));
});
