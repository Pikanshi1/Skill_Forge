import { z } from "zod";

export const createNoteSchema = z.object({
	lessonId: z.string().cuid(),

	title: z.string().optional(),

	content: z.string().min(1),
});

export const updateNoteSchema = z.object({
	title: z.string().optional(),

	content: z.string().optional(),

	isPinned: z.boolean().optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
