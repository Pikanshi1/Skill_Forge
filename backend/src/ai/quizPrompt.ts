export const buildQuizPrompt = (
	courseTitle: string,
	lessonTitle: string,
	lessonContent: string,
) => {
	return `
You are an expert educator.

Generate exactly 10 multiple choice questions from the lesson.

Return ONLY valid JSON.

Format:

{
  "questions":[
    {
      "question":"...",
      "options":[
        "...",
        "...",
        "...",
        "..."
      ],
      "answer":"...",
      "explanation":"..."
    }
  ]
}

Rules:

- Exactly 10 questions.
- Four options per question.
- Only one correct answer.
- Explanation should be 1-2 sentences.
- Cover the complete lesson.
- No markdown.
- No extra text.

Course:
${courseTitle}

Lesson:
${lessonTitle}

Lesson Content:
${lessonContent}
`;
};
