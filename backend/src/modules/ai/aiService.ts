import ai from "../../ai/groqClient.js";
import { buildCoursePrompt } from "../../ai/promptBuilder.js";
import { parseJsonResponse } from "../../ai/responseParser.js";
import { saveGeneratedCourse } from "../../ai/saveCourse.js";
import type { CourseAI } from "../../ai/types.js";
import { isValidCourseAI } from "../../ai/types.js";
import env from "../../config/env.js";
import prisma from "../../lib/prisma.js";
import type { GenerateCourseInput } from "./aiValidator.js";
import { generateLesson } from "../lesson/lessonService.js";

export const generateCourse = async (
	userId: string,
	data: GenerateCourseInput,
) => {
	let createdCourseId: string | undefined;

	try {
		const prompt = buildCoursePrompt(data);

		const response = await ai.chat.completions.create({
			model: env.GROQ_MODEL,
			messages: [
				{
					role: "user",
					content: typeof prompt === "string" ? prompt : JSON.stringify(prompt),
				},
			],
		});

		const text = response.choices[0]?.message?.content ?? "";

		const generatedCourse = parseJsonResponse<CourseAI>(text);
		if (!isValidCourseAI(generatedCourse)) {
			throw new Error("AI returned an invalid course structure");
		}

		const savedCourse = await saveGeneratedCourse(
			userId,
			generatedCourse,
			data.difficulty,
			data.duration,
			data.goal,
		);

		if (!savedCourse) {
			throw new Error("Failed to save generated course");
		}
		createdCourseId = savedCourse.id;

		for (const module of savedCourse.modules) {
			for (const lesson of module.lessons) {
				await generateLesson(lesson.id, userId);
			}
		}

		return prisma.course.findUnique({
			where: { id: savedCourse.id },
			include: { modules: { include: { lessons: true } } },
		});
	} catch (error) {
		if (createdCourseId) {
			await prisma.course.delete({ where: { id: createdCourseId } });
		}
		console.error(error);
		throw error;
	}
};
