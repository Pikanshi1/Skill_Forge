import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import validateRequest from "../../middleware/validateRequest.js";
import * as aiController from "./aiController.js";
import { generateCourseSchema } from "./aiValidator.js";

const router = Router();

router.use(authMiddleware);

router.post(
	"/generate-course",
	validateRequest(generateCourseSchema),
	aiController.generateCourse,
);

export default router;
