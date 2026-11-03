"use client";

import { useEffect, useState } from "react";
import { Send, BookOpen, Menu, X, Bot, User, Plus } from "lucide-react";
import TutorService, { TutorChat } from "@/services/tutorService";
import CourseService from "@/services/courseService";
import { Course } from "@/types/course";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function TutorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState<TutorChat[]>([]);
  const [activeChat, setActiveChat] = useState<TutorChat | null>(null);
  const [message, setMessage] = useState("");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTutor = async () => {
      try {
        const [coursesResponse, existingChats] = await Promise.all([
          CourseService.getCourses(),
          TutorService.getChats(),
        ]);
        setCourse(coursesResponse.data?.[0] ?? null);
        setChats(existingChats);

        if (existingChats.length > 0) {
          setActiveChat(await TutorService.getChat(existingChats[0].id));
        } else {
          const newChat = await TutorService.createChat();
          setChats([newChat]);
          setActiveChat(newChat);
        }
      } catch {
        setError("AI Tutor could not be loaded. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadTutor();
  }, []);

  const messages: Message[] = activeChat?.messages.map((item) => ({
    role: item.role === "USER" ? "user" : "assistant",
    content: item.message,
  })) ?? [
    {
      role: "assistant",
      content: "Hello! I am your AI Tutor. Ask me anything about your course, programming, DSA, DBMS, SQL, OS, CN, AI/ML or mathematics.",
    },
  ];

  const selectChat = async (chat: TutorChat) => {
    try {
      setActiveChat(await TutorService.getChat(chat.id));
    } catch {
      setError("That chat could not be loaded.");
    }
  };

  const createNewChat = async () => {
    try {
      const newChat = await TutorService.createChat();
      setChats((previous) => [newChat, ...previous]);
      setActiveChat(newChat);
      setError(null);
    } catch {
      setError("A new chat could not be created.");
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !activeChat || sending) return;

    const currentMessage = message;
    setMessage("");
    setSending(true);
    try {
      const lesson = course?.modules?.[0]?.lessons?.[0];
      const response = await TutorService.chat({
        chatId: activeChat.id,
        courseId: course?.id,
        lessonId: lesson?.id,
        message: currentMessage,
      });
      const updatedChat = await TutorService.getChat(response.chatId);
      setActiveChat(updatedChat);
      setChats((previous) =>
        previous.map((chat) =>
          chat.id === response.chatId ? updatedChat : chat,
        ),
      );
    } catch {
      setError("Something went wrong while contacting the AI Tutor. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50">
      {/* Current Learning Sidebar */}

      <aside
        className={`bg-white border-r transition-all duration-300 overflow-hidden ${
          sidebarOpen ? "w-72" : "w-0"
        }`}
      >
        <div className="w-72 h-full">
          <div className="p-5 border-b flex items-center gap-3">
            <BookOpen size={20} />

            <h2 className="font-semibold">Current Learning</h2>
          </div>

          <div className="p-5 space-y-6">
            <div>
              <p className="text-sm text-gray-500">Course</p>

              <h3 className="font-semibold">{loading ? "Loading..." : course?.title ?? "No course yet"}</h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">Current Lesson</p>

              <h3 className="font-semibold">{course?.modules?.[0]?.lessons?.[0]?.title ?? "Select a course lesson"}</h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Progress</p>

              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: course ? "0%" : "0%" }}></div>
              </div>

              <p className="text-xs text-gray-500 mt-2">Progress is tracked from each lesson.</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm text-gray-500">Chat history</p>
                <button
                  type="button"
                  onClick={() => void createNewChat()}
                  className="rounded-lg p-1 text-blue-600 hover:bg-blue-50"
                  title="New Chat"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="space-y-1">
                {chats.map((chat) => (
                  <button
                    type="button"
                    key={chat.id}
                    onClick={() => void selectChat(chat)}
                    className={`w-full truncate rounded-lg px-3 py-2 text-left text-sm ${
                      chat.id === activeChat?.id ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                    }`}
                  >
                    {chat.title ?? "AI Tutor Chat"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Chat Section */}

      <div className="flex flex-col flex-1">
        {/* Header */}

        <div className="h-16 bg-white border-b flex items-center px-5 gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Bot size={20} />
            </div>

            <div>
              <h1 className="font-semibold">AI Tutor</h1>

              <p className="text-xs text-gray-500">
                Your personal AI Tutor
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void createNewChat()}
            className="ml-auto flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700 hover:bg-blue-100"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {error && <p className="border-b bg-amber-50 px-6 py-2 text-sm text-amber-800">{error}</p>}

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="bg-blue-100 p-2 rounded-full h-fit">
                  <Bot size={18} />
                </div>
              )}

              <div
                className={`max-w-3xl px-5 py-4 rounded-2xl whitespace-pre-wrap leading-7 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow-sm border"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div className="bg-gray-200 p-2 rounded-full h-fit">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}

        <div className="bg-white border-t p-4">
          <div className="max-w-5xl mx-auto flex gap-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask your AI Tutor anything..."
              className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={sendMessage}
              disabled={sending || loading}
              className="bg-blue-600 text-white px-5 rounded-xl flex items-center gap-2 disabled:opacity-50"
            >
              <Send size={18} />
              {sending ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
