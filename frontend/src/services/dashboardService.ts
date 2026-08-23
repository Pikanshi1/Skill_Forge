import api from "./api";
import { ApiResponse } from "@/types/auth";
import { Course } from "@/types/course";

export interface DashboardData {
  totalCourses: number;
  totalLessons: number;
  completedLessons: number;
  quizzesSolved: number;
  averageScore: number;
  recentCourses: Course[];
}

class DashboardService {
  async getDashboard() {
    const response = await api.get<ApiResponse<DashboardData>>("/dashboard");
    return response.data;
  }
}

const dashboardService = new DashboardService();
export default dashboardService;