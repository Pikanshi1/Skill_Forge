"use client";

import { X, BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Module } from "@/types/course";

type Props = {
  open: boolean;
  onClose: () => void;
  courseId?: string;
  modules?: Module[];
  lessonId?: string;
};

export default function LessonDrawer({ open, onClose, courseId, modules = [], lessonId }: Props) {
  return (
    <div
      className={`fixed left-0 top-0 h-screen w-80 bg-white border-r shadow-xl z-50 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="h-16 border-b flex items-center justify-between px-5">
        <h2 className="font-semibold flex items-center gap-2">
          <BookOpen size={18} />
          Lessons
        </h2>

        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto p-5">
        {modules.length === 0 ? <p className="text-sm text-gray-500">Course lessons are not available.</p> : modules.map((module) => <div key={module.id}><p className="mb-3 font-semibold">{module.title}</p><div className="space-y-2">{module.lessons.map((lesson) => <Link key={lesson.id} href={courseId ? `/courses/${courseId}/lessons/${lesson.id}` : "#"} className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm ${lesson.id === lessonId ? "bg-blue-50 font-semibold text-blue-700" : "text-gray-600 hover:bg-gray-50"}`} onClick={onClose}>{lesson.id === lessonId ? <span className="h-2 w-2 rounded-full bg-blue-600" /> : <CheckCircle size={16} className="text-gray-300" />}{lesson.title}</Link>)}</div></div>)}
      </div>
    </div>
  );
}
