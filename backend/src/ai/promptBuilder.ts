import type { GenerateCourseInput } from "../modules/ai/aiValidator.js";

export const buildCoursePrompt = (data: GenerateCourseInput) => `
You are an expert curriculum designer and university professor.

Return ONLY valid JSON.

Do not include markdown outside JSON.
Do not include explanations.
Do not wrap the response in triple backticks.

Return exactly this structure:

{
  "title": "",
  "description": "",
  "modules": [
    {
      "title": "",
      "description": "",
      "lessons": [
        {
          "title": "",
          "duration": 0
        }
      ]
    }
  ]
}

Instructions:

Create a complete learning roadmap.

Generate exactly:

- 6 modules
- 5 lessons per module

Each module should:

- Cover one major concept.
- Progress naturally from beginner to advanced.
- Avoid repeating topics.

Each lesson should:

- Have a meaningful title.
- Build upon previous lessons.
- Include an estimated duration in minutes.
- Be specific instead of generic.

The entire course should be professionally structured like a university curriculum.

Topic:
${data.topic}

Difficulty:
${data.difficulty}

Duration:
${data.duration} days

Study Hours Per Day:
${data.studyHoursPerDay}

Learning Goal:
${data.goal}
`;
