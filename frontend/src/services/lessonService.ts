import api from "./api";
import { ApiResponse } from "@/types/auth";
import { Lesson } from "@/types/course";

class LessonService {

  async getLesson(id: string) {
    const response = await api.get<ApiResponse<Lesson>>(
      `/lesson/${id}`
    );

    return response.data;
  }

  async generateLesson(id: string) {
    const response = await api.post<ApiResponse<Lesson>>(
      `/lesson/${id}/generate`
    );

    return response.data;
  }

  async markComplete(id: string) {
    const response = await api.patch(
      `/lesson/${id}/complete`
    );

    return response.data;
  }
}

const lessonService = new LessonService();
export default lessonService;