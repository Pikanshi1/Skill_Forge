import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import * as lessonController from "./lessonController.js";

const router = Router();

router.use(authMiddleware);

// Get lesson by id
router.get("/:lessonId", lessonController.getLessonById);

// Generate lesson content
router.post("/:lessonId/generate", lessonController.generateLesson);

// Regenerate lesson content
router.post("/:lessonId/regenerate", lessonController.regenerateLesson);

// Get lesson summary
router.get("/:lessonId/summary", lessonController.getLessonSummary);

// Mark lesson completed
router.patch("/:lessonId/complete", lessonController.markLessonCompleted);

// Get all lessons of a module
router.get("/module/:moduleId", lessonController.getModuleLessons);

export default router;
