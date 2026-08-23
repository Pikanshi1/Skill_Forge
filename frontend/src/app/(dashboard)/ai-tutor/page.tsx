"use client";

import { useEffect, useState } from "react";
import { Send, BookOpen, Menu, X, Bot, User } from "lucide-react";
import TutorService from "@/services/tutorService";
import CourseService from "@/services/courseService";
import { Course } from "@/types/course";

export default function TutorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const response = await CourseService.getCourses();

        if (response.data?.length > 0) {
          setCourse(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to load course", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, []);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your AI Tutor. Ask me anything about your course.",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentMessage,
      },
    ]);

    setMessage("");

    try {
      if (!course) {
        setMessages((prev) => [...prev, { role: "assistant", content: "Create a course first, then I can tutor you with its lesson context." }]);
        return;
      }

      setSending(true);
      const lesson = course.modules?.[0]?.lessons?.[0];

      const response = await TutorService.chat({
        courseId: course.id,
        lessonId: lesson?.id,
        message: currentMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer || "I could not generate an answer. Please try again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50">
      {/* Current Learning Sidebar */}

      <div
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
          </div>
        </div>
      </div>

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
                Your personal learning assistant
              </p>
            </div>
          </div>
        </div>

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
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
