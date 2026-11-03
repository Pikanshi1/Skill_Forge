import { Router } from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import validateRequest from "../../middleware/validateRequest.js";
import * as tutorController from "./tutorController.js";
import { chatSchema, createChatSchema } from "./tutorValidator.js";

const router = Router();

router.use(authMiddleware);

router.get("/chats", tutorController.listChats);

router.post(
	"/chats",
	validateRequest(createChatSchema),
	tutorController.createChat,
);

router.get("/chats/:chatId", tutorController.getChat);

router.post(
	"/chat",
	validateRequest(chatSchema),
	tutorController.chatWithTutor,
);

export default router;
