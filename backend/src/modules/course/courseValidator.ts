import { z } from "zod";

export const createCourseSchema = z.object({
	title: z.string().min(3, "Course title must be at least 3 characters"),

	description: z.string().min(10, "Description must be at least 10 characters"),

	goal: z.string().min(5, "Goal must be at least 5 characters"),

	duration: z.number().min(1, "Duration must be at least 1 day"),

	difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
