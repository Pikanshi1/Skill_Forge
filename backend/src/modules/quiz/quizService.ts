import ai from "../../ai/groqClient.js";
import { buildQuizPrompt } from "../../ai/quizPrompt.js";
import { parseJsonResponse } from "../../ai/responseParser.js";
import env from "../../config/env.js";
import prisma from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";
import { updateAnalytics } from "../analytics/analyticsService.js";

type GeneratedQuestion = {
	question: string;
	options: string[];
	answer: string;
	explanation?: string;
};
type GeneratedQuiz = { questions: GeneratedQuestion[] };

export const generateQuiz = async (lessonId: string) => {
	const lesson = await prisma.lesson.findUnique({
		where: {
			id: lessonId,
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

	if (!lesson.content) {
		throw new AppError("Generate lesson content first.", 400);
	}

	await prisma.quiz.deleteMany({
		where: {
			lessonId,
		},
	});

	const prompt = buildQuizPrompt(
		lesson.module.course.title,
		lesson.title,
		lesson.content,
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

	const text = response.choices[0]?.message?.content ?? "";

	const parsed = parseJsonResponse<GeneratedQuiz>(text);

	await prisma.quiz.createMany({
		data: parsed.questions.map((q) => ({
			question: q.question,
			options: q.options,
			answer: q.answer,
			explanation: q.explanation,
			lessonId,
		})),
	});

	return prisma.quiz.findMany({
		where: {
			lessonId,
		},
		select: {
			id: true,
			question: true,
			options: true,
		},
	});
};

export const getQuiz = async (lessonId: string) => {
	return prisma.quiz.findMany({
		where: {
			lessonId,
		},
		select: {
			id: true,
			question: true,
			options: true,
		},
	});
};

export const submitQuiz = async (
	lessonId: string,
	userId: string,
	answers: {
		quizId: string;
		answer: string;
	}[],
) => {
	if (!answers || answers.length === 0) {
		throw new AppError("Please submit at least one answer.", 400);
	}

	const quizzes = await prisma.quiz.findMany({
		where: {
			lessonId,
		},
	});

	if (!quizzes.length) {
		throw new AppError("Quiz not found", 404);
	}

	let score = 0;

	for (const quiz of quizzes) {
		const userAnswer = answers.find((a) => a.quizId === quiz.id);

		if (userAnswer && userAnswer.answer === quiz.answer) {
			score++;
		}
	}

	const percentage = (score / quizzes.length) * 100;

	await prisma.progress.upsert({
		where: {
			lessonId_userId: {
				lessonId,
				userId,
			},
		},
		update: {
			score,
			completed: true,
			completedAt: new Date(),
		},
		create: {
			lessonId,
			userId,
			score,
			completed: true,
			completedAt: new Date(),
		},
	});

	// Update analytics without adding lesson duration again
	await updateAnalytics(userId, 0, false, score);

	return {
		score,
		total: quizzes.length,
		percentage,
		results: quizzes.map((quiz) => {
			const userAnswer = answers.find((a) => a.quizId === quiz.id);

			return {
				quizId: quiz.id,
				question: quiz.question,
				yourAnswer: userAnswer?.answer ?? null,
				correctAnswer: quiz.answer,
				explanation: quiz.explanation,
				isCorrect: userAnswer?.answer === quiz.answer,
			};
		}),
	};
};

export const deleteQuiz = async (lessonId: string) => {
	await prisma.quiz.deleteMany({
		where: {
			lessonId,
		},
	});

	return true;
};
