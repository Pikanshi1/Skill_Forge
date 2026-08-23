import prisma from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";
import type { CreateCourseInput } from "./courseValidator.js";

export const createCourse = async (userId: string, data: CreateCourseInput) => {
	return prisma.course.create({
		data: {
			...data,
			userId,
		},
	});
};

export const getCourses = async (userId: string) => {
	return prisma.course.findMany({
		where: {
			userId,
		},
		include: {
			modules: {
				include: {
					lessons: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};

export const getCourseById = async (courseId: string, userId: string) => {
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

	return course;
};

export const updateCourse = async (
	courseId: string,
	userId: string,
	data: Partial<CreateCourseInput>,
) => {
	await getCourseById(courseId, userId);

	return prisma.course.update({
		where: {
			id: courseId,
		},
		data,
	});
};

export const deleteCourse = async (courseId: string, userId: string) => {
	await getCourseById(courseId, userId);

	await prisma.course.delete({
		where: {
			id: courseId,
		},
	});
};

export const publishCourse = async (courseId: string, userId: string) => {
	await getCourseById(courseId, userId);

	return prisma.course.update({
		where: {
			id: courseId,
		},
		data: {
			status: "PUBLISHED",
		},
	});
};
