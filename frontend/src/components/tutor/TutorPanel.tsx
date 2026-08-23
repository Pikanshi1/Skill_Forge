"use client";

import { useEffect, useRef, useState } from "react";

import TutorHeader from "./TutorHeader";
import TutorChat from "./TutorChatWindow";
import TutorInput from "./TutorInput";
import TutorResizeHandle from "./TutorResizeHandle";

import TutorService from "@/services/tutorService";
import CourseService from "@/services/courseService";
import LessonService from "@/services/lessonService";

import { Course, Lesson } from "@/types/course";

type Props = {
  open: boolean;
  courseId: string;
  lessonId: string;
  onClose: () => void;
};

type Message = {
  role: "user" | "assistant";
  message: string;
};

export default function TutorPanel({
  open,
  courseId,
  lessonId,
  onClose,
}: Props) {
  const [width, setWidth] = useState(420);

  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState<Course | null>(null);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [contextError, setContextError] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      message:
        "👋 Hello! I'm your AI Tutor.\n\nAsk me anything about this lesson.\n\nI can explain concepts, debug code, answer doubts and even teach topics outside the lesson whenever needed.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);
  useEffect(() => {
    const load = async () => {
      setContextError(null);
      try {
        const courseRes = await CourseService.getCourse(courseId);

        setCourse(courseRes.data);
      } catch {
        setContextError("Course context could not be loaded. You can still retry your question.");
      }

      try {
        const lessonRes = await LessonService.getLesson(lessonId);

        setLesson(lessonRes.data);
      } catch {
        setContextError("Lesson context could not be loaded. Please retry before asking about this lesson.");
      }
    };

    if (courseId && lessonId) {
      load();
    }
  }, [courseId, lessonId]);
  const startResize = (e: React.MouseEvent) => {
    const startX = e.clientX;

    const startWidth = width;

    const move = (event: MouseEvent) => {
      const newWidth = startWidth - (event.clientX - startX);

      if (newWidth >= 320 && newWidth <= 850) {
        setWidth(newWidth);
      }
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);

      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);

    window.addEventListener("mouseup", stop);
  };
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = {
      role: "user" as const,
      message: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await TutorService.chat({
        courseId,

        lessonId,

        message: text,

        previousMessages: messages,
      } );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: response.answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: "❌ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;

  return (
    <div
      style={{
        width,
      }}
      className="
h-full
flex
border-l
bg-gray-50
shrink-0
"
    >
      <TutorResizeHandle onMouseDown={startResize} />

      <div className="flex flex-col flex-1">
        <TutorHeader onClose={onClose} />

        <TutorChat messages={messages} />

        {(course || lesson) && (
          <div className="px-4 pb-2 text-xs text-gray-500">
            {course?.title ?? "Course"} / {lesson?.title ?? "Lesson context loading"}
          </div>
        )}

        {contextError && (
          <div className="mx-4 mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            {contextError}
          </div>
        )}

        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {["Explain the key idea", "Give me a practical example", "Quiz me on this lesson"].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void sendMessage(suggestion)}
              disabled={loading}
              className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-50 disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {loading && (
          <div className="px-5 pb-3">
            <div
              className="
bg-white
border
rounded-xl
px-4
py-3
w-fit
text-sm
text-gray-500
"
            >
              AI Tutor is thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />

        <TutorInput onSend={sendMessage} />
      </div>
    </div>
  );
}
