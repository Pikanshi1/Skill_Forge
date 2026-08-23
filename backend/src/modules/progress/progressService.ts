import prisma from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

export const getCourseProgress = async (userId: string, courseId: string) => {
	const course = await prisma.course.findFirst({
		where: {
			id: courseId,
			userId,
		},
		include: {
			modules: {
				include: {
					lessons: true,
				},
			},
		},
	});

	if (!course) {
		throw new AppError("Course not found", 404);
	}

	const lessonIds = course.modules.flatMap((module) =>
		module.lessons.map((lesson) => lesson.id),
	);

	const progress = await prisma.progress.findMany({
		where: {
			userId,
			lessonId: {
				in: lessonIds,
			},
		},
	});

	const completedLessons = progress.filter((p) => p.completed).length;

	const totalLessons = lessonIds.length;

	const percentage =
		totalLessons === 0
			? 0
			: Math.round((completedLessons / totalLessons) * 100);

	return {
		totalLessons,
		completedLessons,
		percentage,
		progress,
	};
};
