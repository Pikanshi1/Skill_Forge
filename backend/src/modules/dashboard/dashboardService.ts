import prisma from "../../lib/prisma.js";

export const getDashboard = async (userId: string) => {
	const totalCourses = await prisma.course.count({
		where: {
			userId,
		},
	});

	const totalLessons = await prisma.lesson.count({
		where: {
			module: {
				course: {
					userId,
				},
			},
		},
	});

	const completedLessons = await prisma.progress.count({
		where: {
			userId,
			completed: true,
		},
	});

	const quizzesSolved = await prisma.progress.count({
		where: {
			userId,
			score: {
				not: null,
			},
		},
	});

	const average = await prisma.progress.aggregate({
		where: {
			userId,
			score: {
				not: null,
			},
		},
		_avg: {
			score: true,
		},
	});

	const recentCourses = await prisma.course.findMany({
		where: {
			userId,
		},
		orderBy: {
			updatedAt: "desc",
		},
		take: 5,
	});

	return {
		totalCourses,
		totalLessons,
		completedLessons,
		quizzesSolved,
		averageScore: average._avg.score ?? 0,
		recentCourses,
	};
};
