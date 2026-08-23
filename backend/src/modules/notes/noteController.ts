import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as noteService from "./noteService.js";

export const createNote = asyncHandler(async (req: Request, res: Response) => {
	const note = await noteService.createNote(
		(req.user as { id: string }).id,
		req.body,
	);

	res.status(201).json(new ApiResponse("Note created successfully", note));
});

export const getLessonNotes = asyncHandler(
	async (req: Request, res: Response) => {
		const notes = await noteService.getLessonNotes(
			(req.user as { id: string }).id,
			req.params.lessonId as string,
		);

		res.status(200).json(new ApiResponse("Notes fetched successfully", notes));
	},
);

export const getNoteById = asyncHandler(async (req: Request, res: Response) => {
	const note = await noteService.getNoteById(
		(req.user as { id: string }).id,
		req.params.noteId as string,
	);

	res.status(200).json(new ApiResponse("Note fetched successfully", note));
});

export const updateNote = asyncHandler(async (req: Request, res: Response) => {
	const note = await noteService.updateNote(
		(req.user as { id: string }).id,
		req.params.noteId as string,
		req.body,
	);

	res.status(200).json(new ApiResponse("Note updated successfully", note));
});

export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
	await noteService.deleteNote(
		(req.user as { id: string }).id,
		req.params.noteId as string,
	);

	res.status(200).json(new ApiResponse("Note deleted successfully", null));
});
