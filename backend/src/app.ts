import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import errorMiddleware from "./middleware/errorMiddleware.js";
import aiRoutes from "./modules/ai/aiRoutes.js";
import analyticsRoutes from "./modules/analytics/analyticsRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js";
import certificateRoutes from "./modules/certificate/certificateRoutes.js";
import courseRoutes from "./modules/course/courseRoutes.js";
import dashboardRoutes from "./modules/dashboard/dashboardRoutes.js";
import lessonRoutes from "./modules/lesson/lessonRoutes.js";
import noteRoutes from "./modules/notes/noteRoutes.js";
import quizRoutes from "./modules/quiz/quizRoutes.js";
import tutorRoutes from "./modules/tutor/tutorRoutes.js";
import "./config/passport.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import env from "./config/env.js";
import progressRoutes from "./modules/progress/progressRoutes.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		limit: 300,
		standardHeaders: "draft-8",
		legacyHeaders: false,
	}),
);
app.use(
	session({
		secret: env.JWT_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			sameSite: "lax",
			secure: env.NODE_ENV === "production",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		},
	}),
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/progress", progressRoutes);

app.get("/", (_, res) => {
	res.json({
		message: "CourseForge AI API Running 🚀",
	});
});

app.get("/health", (_, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/certificate", certificateRoutes);

app.use(errorMiddleware);

export default app;
