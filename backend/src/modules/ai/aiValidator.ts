import { z } from "zod";

export const generateCourseSchema = z.object({
	topic: z.string().min(3),
	difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
	duration: z.number().min(1),
	studyHoursPerDay: z.number().min(1).max(12),
	goal: z.string().min(5),
});

export type GenerateCourseInput = z.infer<typeof generateCourseSchema>;
