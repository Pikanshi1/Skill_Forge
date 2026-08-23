export const buildLessonPrompt = (
	courseTitle: string,
	moduleTitle: string,
	lessonTitle: string,
	difficulty: string,
) => `
You are an expert professor, technical writer, senior software engineer, and instructional designer.

Your task is to generate ONE complete, high-quality lesson.

Return ONLY GitHub Markdown.

IMPORTANT:
- Do NOT return JSON.
- Do NOT wrap the response inside \`\`\`markdown fences.
- Do NOT include explanations before or after the lesson.
- Start directly with the lesson title using a Markdown heading.

The lesson should be between 1200 and 2200 words.

Write like a premium university textbook while keeping the content concise, engaging, and easy to understand.

Use emojis only in headings where appropriate.

--------------------------------------------

Course

${courseTitle}

Module

${moduleTitle}

Lesson

${lessonTitle}

Difficulty

${difficulty}

--------------------------------------------

Generate the lesson using the following structure.

# Lesson Title

---

## 🎯 Learning Objectives

- Explain what students will learn.
- Include 5–8 clear objectives.

---

## 📖 Introduction

Explain:

- What this topic is
- Why it is important
- Where it is used
- Why every engineer should know it

---

## 🧠 Core Concepts

Introduce all major concepts.

For each concept:

- Start with an intuitive explanation.
- Then explain the technical details.
- Use analogies where helpful.

---

## 🔍 Deep Dive

Break the lesson into multiple subsections.

Explain:

- Internal working
- Architecture
- Design
- Algorithms
- Important implementation details

Use headings for each subsection.

---

## 📊 Diagrams (Markdown)

Use Mermaid diagrams whenever they improve understanding.

Example:

\`\`\`mermaid
graph TD
A --> B
B --> C
\`\`\`

---

## 💡 Real World Examples

Provide 2–3 practical examples.

Explain each example clearly.

---

## 💻 Code Examples

If the lesson is technical:

Provide well-formatted code examples.

Use fenced code blocks.

Supported languages include:

- C++
- Java
- Python
- JavaScript
- TypeScript
- SQL
- Bash

For every example:

- Explain what it does.
- Mention Time Complexity (if applicable).
- Mention Space Complexity (if applicable).
- Mention Best Practices.

---

## 🌍 Industry Applications

Explain where this concept is used in real products or companies.

---

## ⚠ Common Mistakes

List common beginner mistakes.

Explain why they happen.

Explain how to avoid them.

---

## 🚀 Pro Tips

Provide practical interview tips and optimization advice.

---

## 📚 Related Concepts

Mention a few related topics students should learn next.

---

## 📝 Practice Questions

### Beginner

Generate 3 questions.

### Intermediate

Generate 3 questions.

### Advanced

Generate 3 questions.

---

## 💻 Coding Challenges

Generate:

- Easy
- Medium
- Hard

Briefly describe each challenge.

---

## 🎯 Interview Questions

Generate 5 interview questions.

---

## 📚 Recommended Resources

Recommend:

- Official documentation
- Books
- Research papers (if relevant)
- Useful YouTube search topics

---

## 📖 Summary

Write a concise summary.

---

## ⭐ Key Takeaways

Provide 8–10 bullet points.

--------------------------------------------

Rules

- Write naturally.
- Avoid repetition.
- Use proper GitHub Markdown.
- Use tables whenever appropriate.
- Use bullet lists.
- Use numbered lists.
- Use blockquotes for important notes.
- Use fenced code blocks.
- Explain concepts clearly without unnecessary verbosity.
- Ensure all Markdown is valid and renders correctly.
`;
