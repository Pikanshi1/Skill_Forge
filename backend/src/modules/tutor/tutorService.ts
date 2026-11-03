import type { Lesson } from "@prisma/client";
import ai from "../../ai/groqClient.js";
import { buildTutorPrompt } from "../../ai/tutorPrompt.js";
import env from "../../config/env.js";
import prisma from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

export const getTutorChats = async (userId: string) => {
	return prisma.tutorChat.findMany({
		where: { userId },
		orderBy: { createdAt: "desc" },
		include: {
			messages: {
				orderBy: { createdAt: "asc" },
				take: 1,
				select: { role: true, message: true },
			},
		},
	});
};

export const createTutorChat = async (
	userId: string,
	title?: string,
) => {
	return prisma.tutorChat.create({
		data: {
			userId,
			title: title ?? "New AI Tutor Chat",
		},
		include: { messages: true },
	});
};

export const getTutorChat = async (userId: string, chatId: string) => {
	const chat = await prisma.tutorChat.findFirst({
		where: { id: chatId, userId },
		include: {
			messages: {
				orderBy: { createdAt: "asc" },
				select: { role: true, message: true },
			},
		},
	});

	if (!chat) {
		throw new AppError("Tutor chat not found", 404);
	}

	return chat;
};

export const chatWithTutor = async (
	userId: string,
	data: {
		chatId?: string;
		courseId?: string;
		lessonId?: string;
		message: string;
	},
) => {
	const course = data.courseId
		? await prisma.course.findFirst({
				where: { id: data.courseId, userId },
			})
		: null;

	if (data.courseId && !course) {
		throw new AppError("Course not found", 404);
	}

	let lesson: Lesson | null = null;

	if (data.lessonId) {
		lesson = await prisma.lesson.findFirst({
			where: {
				id: data.lessonId,
				module: {
					course: {
						id: data.courseId ?? "",
						userId,
					},
				},
			},
		});

		if (!lesson) {
			throw new AppError("Lesson not found", 404);
		}
	}

	const chatTitle = course
		? `${course.title} - ${lesson?.title ?? "General guidance"}`
		: "General AI Tutor Chat";
	let chat = data.chatId
		? await prisma.tutorChat.findFirst({
				where: { id: data.chatId, userId },
			})
		: null;

	if (data.chatId && !chat) {
		throw new AppError("Tutor chat not found", 404);
	}

	if (!chat) {
		chat = await prisma.tutorChat.create({
			data: {
				userId,
				title: chatTitle,
			},
		});
	}

	const previousMessages = await prisma.chatMessage.findMany({
		where: {
			tutorChatId: chat.id,
		},

		orderBy: {
			createdAt: "asc",
		},

		take: 10,

		select: {
			role: true,
			message: true,
		},
	});

	const prompt = buildTutorPrompt(
		course?.title ?? "General learning",

		lesson?.title ?? "",

		lesson?.content ?? "",

		previousMessages,

		data.message,
	);

	const response = await ai.chat.completions.create({
		model: env.GROQ_MODEL,

		messages: [
			{
				role: "system",
				content:
					"You are an AI tutor. Explain concepts clearly and help students learn.",
			},
			{
				role: "user",
				content: prompt,
			},
		],
	});

	const answer = response.choices[0]?.message?.content ?? "";

	await prisma.chatMessage.create({
		data: {
			role: "USER",

			message: data.message,

			tutorChatId: chat.id,
		},
	});

	await prisma.chatMessage.create({
		data: {
			role: "ASSISTANT",

			message: answer,

			tutorChatId: chat.id,
		},
	});

	return {
		chatId: chat.id,

		answer,
	};
};
