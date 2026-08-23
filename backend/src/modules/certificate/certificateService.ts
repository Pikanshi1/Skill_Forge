import crypto from "crypto";
import prisma from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

export const generateCertificate = async (userId: string, courseId: string) => {
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

	const totalLessons = course.modules.reduce(
		(count, module) => count + module.lessons.length,
		0,
	);

	if (totalLessons === 0) {
		throw new AppError("Course has no lessons.", 400);
	}

	const completedLessons = await prisma.progress.count({
		where: {
			userId,
			completed: true,
			lesson: {
				module: {
					courseId,
				},
			},
		},
	});

	if (completedLessons < totalLessons) {
		throw new AppError("Complete the course first", 400);
	}

	const existing = await prisma.certificate.findFirst({
		where: {
			userId,
			courseId,
		},
	});

	if (existing) {
		return existing;
	}

	return prisma.certificate.create({
		data: {
			userId,
			courseId,
			certificateNo: crypto.randomUUID(),
		},
	});
};

export const getCertificates = async (userId: string) => {
	return prisma.certificate.findMany({
		where: {
			userId,
		},
		include: {
			course: {
				select: {
					id: true,
					title: true,
					difficulty: true,
					duration: true,
				},
			},
		},
	});
};

export const verifyCertificate = async (certificateNo: string) => {
	const certificate = await prisma.certificate.findUnique({
		where: {
			certificateNo,
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
				},
			},
			course: {
				select: {
					id: true,
					title: true,
					difficulty: true,
					duration: true,
				},
			},
		},
	});

	if (!certificate) {
		throw new AppError("Certificate not found", 404);
	}

	return certificate;
};
