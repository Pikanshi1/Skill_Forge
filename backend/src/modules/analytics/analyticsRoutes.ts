import { Router } from "express";

import authMiddleware from "../../middleware/authMiddleware.js";

import * as analyticsController from "./analyticsController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", analyticsController.getAnalytics);

export default router;
