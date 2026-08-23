import { z } from "zod";

export const chatSchema = z.object({
	courseId: z.string().cuid(),

	lessonId: z.string().cuid().optional(),

	message: z.string().trim().min(1).max(4000),
});

export type ChatInput = z.infer<typeof chatSchema>;
