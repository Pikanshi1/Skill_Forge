import api from "./api";

class TutorService{
  async chat(data:{
    courseId:string;
    lessonId?:string;
    message:string;
    previousMessages?:{
      role:string;
      message:string;
    }[];
  }): Promise<{ chatId: string; answer: string }> {
    const response=await api.post<{
      success: boolean;
      message: string;
      data: { chatId: string; answer: string };
    }>("/tutor/chat", data);
    return response.data.data;
  }
}

const tutorService = new TutorService();
export default tutorService;