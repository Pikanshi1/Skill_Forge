import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as certificateService from "./certificateService.js";

export const generateCertificate = asyncHandler(
	async (req: Request, res: Response) => {
		const certificate = await certificateService.generateCertificate(
			(req.user as { id: string }).id,
			Array.isArray(req.params.courseId)
				? req.params.courseId[0]
				: req.params.courseId,
		);

		res
			.status(201)
			.json(new ApiResponse("Certificate generated successfully", certificate));
	},
);

export const getCertificates = asyncHandler(
	async (req: Request, res: Response) => {
		const certificates = await certificateService.getCertificates(
			(req.user as { id: string }).id,
		);

		res
			.status(200)
			.json(new ApiResponse("Certificates fetched successfully", certificates));
	},
);

export const verifyCertificate = asyncHandler(
	async (req: Request, res: Response) => {
		const certificate = await certificateService.verifyCertificate(
			Array.isArray(req.params.certificateNo)
				? req.params.certificateNo[0]
				: req.params.certificateNo,
		);

		res.status(200).json(new ApiResponse("Certificate verified", certificate));
	},
);
