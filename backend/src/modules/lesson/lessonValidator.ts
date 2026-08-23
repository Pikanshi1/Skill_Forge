import { z } from "zod";

export const generateLessonSchema = z.object({
	lessonId: z.string().cuid(),
});

export const completeLessonSchema = z.object({
	completed: z.boolean(),
});

export type GenerateLessonInput = z.infer<typeof generateLessonSchema>;

export type CompleteLessonInput = z.infer<typeof completeLessonSchema>;
