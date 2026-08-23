import prisma from "../../lib/prisma.js";

export const getAnalytics = async (userId: string) => {
	const analytics = await prisma.analytics.findUnique({
		where: {
			userId,
		},
	});

	if (analytics) {
		return analytics;
	}

	return prisma.analytics.create({
		data: {
			userId,
		},
	});
};

export const updateAnalytics = async (
	userId: string,
	learningMinutes: number,
	lessonCompleted = false,
	quizScore?: number,
) => {
	const analytics = await prisma.analytics.findUnique({
		where: { userId },
	});

	if (!analytics) {
		return prisma.analytics.create({
			data: {
				userId,
				totalLearningMinutes: learningMinutes,
				completedLessons: lessonCompleted ? 1 : 0,
				quizzesSolved: quizScore !== undefined ? 1 : 0,
				averageScore: quizScore ?? 0,
				currentStreak: lessonCompleted ? 1 : 0,
				longestStreak: lessonCompleted ? 1 : 0,
			},
		});
	}

	const quizzesSolved =
		analytics.quizzesSolved + (quizScore !== undefined ? 1 : 0);

	const averageScore =
		quizScore !== undefined
			? (analytics.averageScore * analytics.quizzesSolved + quizScore) /
				quizzesSolved
			: analytics.averageScore;

	const currentStreak = lessonCompleted
		? analytics.currentStreak + 1
		: analytics.currentStreak;

	const longestStreak = Math.max(analytics.longestStreak, currentStreak);

	return prisma.analytics.update({
		where: {
			userId,
		},
		data: {
			totalLearningMinutes: {
				increment: learningMinutes,
			},

			completedLessons: lessonCompleted
				? {
						increment: 1,
					}
				: undefined,

			quizzesSolved:
				quizScore !== undefined
					? {
							increment: 1,
						}
					: undefined,

			averageScore,

			currentStreak,

			longestStreak,
		},
	});
};
