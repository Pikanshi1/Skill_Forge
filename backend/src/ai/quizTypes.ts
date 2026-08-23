export interface QuizQuestion {
	question: string;
	options: string[];
	answer: string;
	explanation: string;
}

export interface QuizResponse {
	questions: QuizQuestion[];
}
