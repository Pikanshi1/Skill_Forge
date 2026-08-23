import api from "./api";

class ProgressService {
  async getCourseProgress(courseId: string) {
    const response = await api.get(`/progress/${courseId}`);
    return response.data;
  }
}

const progressService = new ProgressService();
export default progressService;