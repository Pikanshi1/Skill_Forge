import { Router } from "express";

import authMiddleware from "../../middleware/authMiddleware.js";

import * as progressController from "./progressController.js";

const router = Router();

router.use(authMiddleware);

router.get("/:courseId", progressController.getCourseProgress);

export default router;
