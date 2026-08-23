import OpenAI from "openai";
import env from "../config/env.js";

const ai = new OpenAI({
	// env values can be unknown; cast to expected type for OpenAI client
	apiKey: env.GROQ_API_KEY as string | undefined,
	baseURL: "https://api.groq.com/openai/v1",
});

export default ai;
