export const parseJsonResponse = <T>(text: string): T => {
	const cleaned = text
		.replace(/```json/g, "")
		.replace(/```/g, "")
		.trim();

	return JSON.parse(cleaned);
};
