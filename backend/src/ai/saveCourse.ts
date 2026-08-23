import type { Difficulty } from "@prisma/client";
import prisma from "../lib/prisma.js";
import type { CourseAI } from "./types.js";

export const saveGeneratedCourse = async (
	userId: string,
	course: CourseAI,
	difficulty: Difficulty,
	duration: number,
	goal: string,
) => {
	try {
		return await prisma.$transaction(
			async (tx) => {
				const createdCourse = await tx.course.create({
					data: {
						title: course.title,
						description: course.description,
						difficulty,
						duration,
						goal,
						userId,
					},
				});

				for (let i = 0; i < course.modules.length; i++) {
					const module = course.modules[i];
					const createdModule = await tx.module.create({
						data: {
							title: module.title,
							description: module.description,
							order: i + 1,
							courseId: createdCourse.id,
						},
					});

					await tx.lesson.createMany({
						data: module.lessons.map((lesson, index) => ({
							title: lesson.title,
							content: null,
							summary: null,
							duration: lesson.duration,
							order: index + 1,
							moduleId: createdModule.id,
						})),
					});

					console.log(
						`${module.lessons.length} lessons created for ${module.title}`,
					);
				}

				return await tx.course.findUnique({
					where: {
						id: createdCourse.id,
					},
					include: {
						modules: {
							include: {
								lessons: true,
							},
						},
					},
				});
			},
			{
				maxWait: 10000,
				timeout: 30000,
			},
		);
	} catch (error) {
		console.error(error);
		throw error;
	}
};
