import prisma from "../../lib/prisma.js";

import AppError from "../../utils/AppError.js";

export const createNote = async (
	userId: string,
	data: {
		lessonId: string;
		title?: string;
		content: string;
	},
) => {
	const lesson = await prisma.lesson.findFirst({
		where: {
			id: data.lessonId,
			module: {
				course: {
					userId,
				},
			},
		},
	});

	if (!lesson) {
		throw new AppError("Lesson not found", 404);
	}

	if (!lesson) {
		throw new AppError("Lesson not found", 404);
	}

	return prisma.note.create({
		data: {
			userId,

			lessonId: data.lessonId,

			title: data.title,

			content: data.content,
		},
	});
};

export const getLessonNotes = async (userId: string, lessonId: string) => {
	return prisma.note.findMany({
		where: {
			userId,
			lessonId,
		},

		orderBy: [
			{
				isPinned: "desc",
			},
			{
				createdAt: "desc",
			},
		],
	});
};

export const getNoteById = async (userId: string, noteId: string) => {
	const note = await prisma.note.findFirst({
		where: {
			id: noteId,
			userId,
		},
	});

	if (!note) {
		throw new AppError("Note not found", 404);
	}

	return note;
};

export const updateNote = async (
	userId: string,
	noteId: string,
	data: { title?: string; content?: string; isPinned?: boolean },
) => {
	const note = await getNoteById(userId, noteId);

	return prisma.note.update({
		where: {
			id: note.id,
		},

		data,
	});
};

export const deleteNote = async (userId: string, noteId: string) => {
	const note = await getNoteById(userId, noteId);

	await prisma.note.delete({
		where: {
			id: note.id,
		},
	});

	return true;
};
