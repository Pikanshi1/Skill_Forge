import { z } from "zod";

export const chatSchema = z.object({
	chatId: z.string().cuid().optional(),
	courseId: z.string().cuid().optional(),

	lessonId: z.string().cuid().optional(),

	message: z.string().trim().min(1).max(4000),
});

export type ChatInput = z.infer<typeof chatSchema>;

export const createChatSchema = z.object({
	title: z.string().trim().min(1).max(120).optional(),
});

export type CreateChatInput = z.infer<typeof createChatSchema>;
