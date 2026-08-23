import api from "./api";

export type QuizQuestion = { id: string; question: string; options: string[] };
export type QuizAnswer = { quizId: string; answer: string };
export type QuizResult = { score: number; total: number; percentage: number; results: Array<{ quizId: string; question: string; yourAnswer: string | null; correctAnswer: string; explanation?: string; isCorrect: boolean }> };

class QuizService {
	async getQuiz(lessonId: string) { return api.get<{ data: QuizQuestion[] }>(`/quiz/${lessonId}`); }
	async generateQuiz(lessonId: string) { return api.post<{ data: QuizQuestion[] }>(`/quiz/${lessonId}/generate`); }
	async submitQuiz(lessonId: string, answers: QuizAnswer[]) { return api.post<{ data: QuizResult }>(`/quiz/${lessonId}/submit`, { answers }); }
}

const quizService = new QuizService();
export default quizService;
