import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import validateRequest from "../../middleware/validateRequest.js";
import * as courseController from "./courseController.js";

import { createCourseSchema } from "./courseValidator.js";

const router = Router();

router.use(authMiddleware);

router.post(
	"/",
	validateRequest(createCourseSchema),
	courseController.createCourse,
);

router.get("/", courseController.getCourses);

router.get("/:id", courseController.getCourseById);

router.patch("/:id", courseController.updateCourse);

router.delete("/:id", courseController.deleteCourse);

router.patch("/:id/publish", courseController.publishCourse);

export default router;
