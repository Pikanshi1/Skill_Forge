import ai from "../../ai/groqClient.js";
import { buildLessonPrompt } from "../../ai/lessonPrompt.js";
import env from "../../config/env.js";
import prisma from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";
import { updateAnalytics } from "../analytics/analyticsService.js";

export const getLessonById = async (lessonId: string, userId: string) => {
	const lesson = await prisma.lesson.findUnique({
		where: {
			id: lessonId,
			module: { course: { userId } },
		},
		include: {
			module: {
				include: {
					course: true,
				},
			},
			quizzes: true,
		},
	});

	if (!lesson) {
		throw new AppError("Lesson not found", 404);
	}

	return lesson;
};

export const generateLesson = async (lessonId: string, userId: string) => {
	const lesson = await prisma.lesson.findUnique({
		where: {
			id: lessonId,
			module: { course: { userId } },
		},
		include: {
			module: {
				include: {
					course: true,
				},
			},
		},
	});

	if (!lesson) {
		throw new AppError("Lesson not found", 404);
	}
	if (lesson.content && lesson.content.trim().length > 50) {
		return lesson;
	}

	const prompt = buildLessonPrompt(
		lesson.module.course.title,
		lesson.module.title,
		lesson.title,
		lesson.module.course.difficulty,
	);

	const response = await ai.chat.completions.create({
		model: env.GROQ_MODEL,
		messages: [
			{
				role: "user",
				content: prompt,
			},
		],
	});

	const generatedContent = response.choices[0]?.message?.content?.trim() ?? "";
	await prisma.lesson.update({
		where: {
			id: lesson.id,
		},
		data: {
			content: generatedContent,

			summary: generatedContent.replace(/#/g, "").substring(0, 400),

			duration: lesson.duration,
		},
	});

	return prisma.lesson.findUnique({
		where: {
			id: lesson.id,
		},
		include: {
			quizzes: true,
		},
	});
};

export const regenerateLesson = async (lessonId: string, userId: string) => {
	const lesson = await prisma.lesson.findFirst({
		where: { id: lessonId, module: { course: { userId } } },
		select: { id: true },
	});

	if (!lesson) {
		throw new AppError("Lesson not found", 404);
	}

	await prisma.lesson.update({
		where: { id: lesson.id },
		data: {
			content: null,
			summary: null,
		},
	});

	return generateLesson(lessonId, userId);
};

export const getModuleLessons = async (moduleId: string, userId: string) => {
	return prisma.lesson.findMany({
		where: {
			moduleId,
			module: { course: { userId } },
		},
		orderBy: {
			order: "asc",
		},
	});
};

export const markLessonCompleted = async (lessonId: string, userId: string) => {
	const lesson = await prisma.lesson.findUnique({
		where: {
			id: lessonId,
		},
	});

	if (!lesson) {
		throw new AppError("Lesson not found", 404);
	}

	const existingProgress = await prisma.progress.findUnique({
		where: {
			lessonId_userId: {
				lessonId,
				userId,
			},
		},
	});

	const progress = await prisma.progress.upsert({
		where: {
			lessonId_userId: {
				lessonId,
				userId,
			},
		},
		update: {
			completed: true,
			completedAt: new Date(),
		},
		create: {
			lessonId,
			userId,
			completed: true,
			startedAt: new Date(),
			completedAt: new Date(),
		},
	});

	if (!existingProgress?.completed) {
		await updateAnalytics(userId, lesson.duration, true);
	}

	return progress;
};

export const getLessonSummary = async (lessonId: string, userId: string) => {
	const lesson = await prisma.lesson.findUnique({
		where: {
			id: lessonId,
			module: { course: { userId } },
		},
		select: {
			id: true,
			title: true,
			summary: true,
		},
	});

	if (!lesson) {
		throw new AppError("Lesson not found", 404);
	}

	return lesson;
};
