import api from "./api";
import { ApiResponse } from "@/types/auth";
import {
  Course,
  CreateCourseRequest,
  GenerateCourseRequest,
} from "@/types/course";

class CourseService {
  async getCourses() {
    const response =
      await api.get<ApiResponse<Course[]>>(
        "/course"
      );

    return response.data;
  }

  async getCourse(id: string) {
    const response =
      await api.get<ApiResponse<Course>>(
        `/course/${id}`
      );

    return response.data;
  }

async createCourse(data: CreateCourseRequest) {
  const response = await api.post<ApiResponse<Course>>("/course", data);
  return response.data;
}
  async updateCourse(
    id: string,
    data: Partial<CreateCourseRequest>
  ) {
const response =
  await api.patch<ApiResponse<Course>>(
    `/course/${id}`,
    data
  );
    return response.data;
  }

  async deleteCourse(id: string) {
    const response =
      await api.delete<ApiResponse<null>>(
        `/course/${id}`
      );

    return response.data;
  }

  async publishCourse(id: string) {
    const response =
      await api.patch<ApiResponse<Course>>(
        `/course/${id}/publish`
      );

    return response.data;
  }

  async generateCourse(data: GenerateCourseRequest) {
    const response =
      await api.post<ApiResponse<Course>>(
        "/ai/generate-course",
        data
      );

    return response.data;
  }
}

const courseService = new CourseService();
export default courseService;