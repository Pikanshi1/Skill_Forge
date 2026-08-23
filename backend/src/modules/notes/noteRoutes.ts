import { Router } from "express";

import authMiddleware from "../../middleware/authMiddleware.js";

import * as noteController from "./noteController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", noteController.createNote);

router.get("/lesson/:lessonId", noteController.getLessonNotes);

router.get("/:noteId", noteController.getNoteById);

router.patch("/:noteId", noteController.updateNote);

router.delete("/:noteId", noteController.deleteNote);

export default router;
