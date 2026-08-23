export interface LessonAI {
	title: string;
	duration: number;
}

export interface GeneratedLessonAI {
	content: string;
	summary: string;
}

export interface ModuleAI {
	title: string;
	description: string;
	lessons: LessonAI[];
}

export interface CourseAI {
	title: string;
	description: string;
	modules: ModuleAI[];
}
