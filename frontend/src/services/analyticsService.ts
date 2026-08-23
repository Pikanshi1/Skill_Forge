import api from "./api";
import { ApiResponse } from "@/types/auth";

export interface AnalyticsData {
  totalLearningMinutes: number;
  completedLessons: number;
  quizzesSolved: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
}

class AnalyticsService {
  async getAnalytics() {
    const response = await api.get<ApiResponse<AnalyticsData>>("/analytics");
    return response.data;
  }
}

const analyticsService = new AnalyticsService();
export default analyticsService;