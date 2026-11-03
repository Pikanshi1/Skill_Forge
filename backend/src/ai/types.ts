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

export const isValidCourseAI = (value: unknown): value is CourseAI => {
	if (!value || typeof value !== "object") return false;
	const course = value as CourseAI;

	return Boolean(
		typeof course.title === "string" &&
			typeof course.description === "string" &&
			Array.isArray(course.modules) &&
			course.modules.length > 0 &&
			course.modules.every(
				(module) =>
					typeof module.title === "string" &&
					typeof module.description === "string" &&
					Array.isArray(module.lessons) &&
					module.lessons.length > 0 &&
					module.lessons.every(
						(lesson) =>
							typeof lesson.title === "string" &&
							Number.isFinite(lesson.duration) &&
							lesson.duration > 0,
					),
			),
	);
};
