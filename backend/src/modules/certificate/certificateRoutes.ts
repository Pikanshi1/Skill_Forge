import { Router } from "express";

import authMiddleware from "../../middleware/authMiddleware.js";

import * as certificateController from "./certificateController.js";

const router = Router();

// Public
router.get("/verify/:certificateNo", certificateController.verifyCertificate);

// Protected
router.use(authMiddleware);

router.post("/generate/:courseId", certificateController.generateCertificate);

router.get("/", certificateController.getCertificates);

export default router;
