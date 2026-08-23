import { Router } from "express";

import authMiddleware from "../../middleware/authMiddleware.js";

import * as quizController from "./quizController.js";

const router = Router();

router.use(authMiddleware);

// Generate AI quiz
router.post("/:lessonId/generate", quizController.generateQuiz);

// Get quiz
router.get("/:lessonId", quizController.getQuiz);

// Submit quiz
router.post("/:lessonId/submit", quizController.submitQuiz);

// Delete quiz
router.delete("/:lessonId", quizController.deleteQuiz);

export default router;
