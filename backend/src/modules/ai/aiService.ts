import ai from "../../ai/groqClient.js";
import { buildCoursePrompt } from "../../ai/promptBuilder.js";
import { parseJsonResponse } from "../../ai/responseParser.js";
import { saveGeneratedCourse } from "../../ai/saveCourse.js";
import type { CourseAI } from "../../ai/types.js";
import env from "../../config/env.js";
import type { GenerateCourseInput } from "./aiValidator.js";

export const generateCourse = async (
	userId: string,
	data: GenerateCourseInput,
) => {
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

		return savedCourse;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
