import { Router } from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import validateRequest from "../../middleware/validateRequest.js";
import * as tutorController from "./tutorController.js";
import { chatSchema } from "./tutorValidator.js";

const router = Router();

router.use(authMiddleware);

// Chat with AI Tutor
router.post(
	"/chat",
	validateRequest(chatSchema),
	tutorController.chatWithTutor,
);

export default router;
