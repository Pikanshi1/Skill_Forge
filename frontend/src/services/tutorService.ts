import api from "./api";

export type TutorMessage = {
  role: "USER" | "ASSISTANT";
  message: string;
};

export type TutorChat = {
  id: string;
  title: string | null;
  messages: TutorMessage[];
};

class TutorService {
  async getChats(): Promise<TutorChat[]> {
    const response = await api.get<{ data: TutorChat[] }>("/tutor/chats");
    return response.data.data;
  }

  async createChat(title?: string): Promise<TutorChat> {
    const response = await api.post<{ data: TutorChat }>("/tutor/chats", {
      title,
    });
    return response.data.data;
  }

  async getChat(chatId: string): Promise<TutorChat> {
    const response = await api.get<{ data: TutorChat }>(`/tutor/chats/${chatId}`);
    return response.data.data;
  }

  async chat(data:{
    chatId?: string;
    courseId?:string;
    lessonId?:string;
    message:string;
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