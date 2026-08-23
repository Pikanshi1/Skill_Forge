import { z } from "zod";

export const submitQuizSchema = z.object({
	answers: z.array(
		z.object({
			quizId: z.string().cuid(),
			answer: z.string(),
		}),
	),
});

export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;
