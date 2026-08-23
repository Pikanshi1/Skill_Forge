import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.coerce.number().int().positive().default(5000),
	DATABASE_URL: z.string().url(),

	JWT_SECRET: z.string().min(32),

	GROQ_API_KEY: z.string(),

	GROQ_MODEL: z.string(),
	FRONTEND_URL: z.string().url(),
	RESEND_API_KEY: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default env;
