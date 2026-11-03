"use client";

import { useState } from "react";

import LessonHeader from "./LessonHeader";
import LessonDrawer from "./LessonDrawer";
import LessonContent from "./LessonContent";

import TutorPanel from "../tutor/TutorPanel";
import FloatingTutorButton from "../tutor/FloatingTutorButton";
import { Module } from "@/types/course";

type Props = {
  courseId: string;
  lessonId: string;
  title: string;
  module: string;
  progress: number;
  content: string;
  summary?: string;
  videoUrl?: string;
  modules?: Module[];
  completed?: boolean;
  onComplete?: () => void;
  onGenerate?: () => void;
  generating?: boolean;
};

export default function LessonLayout({
  courseId,
  lessonId,
  title,
  module,
  progress,
  content,
  summary,
  videoUrl,
  modules,
  completed = false,
  onComplete,
  onGenerate,
  generating,
}: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [tutorOpen, setTutorOpen] = useState(true);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-gray-50">
      <LessonHeader
        title={title}
        module={module}
        progress={progress}
        onDrawerToggle={() => setDrawerOpen(!drawerOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        <LessonDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} courseId={courseId} modules={modules} lessonId={lessonId} />

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-white">
            <LessonContent
              content={content}
              summary={summary}
              videoUrl={videoUrl}
              completed={completed}
              onComplete={onComplete}
              onGenerate={onGenerate}
              generating={generating}
            />
          </div>

          {tutorOpen && (
            <TutorPanel
              open={tutorOpen}
              courseId={courseId}
              lessonId={lessonId}
              onClose={() => setTutorOpen(false)}
            />
          )}

          {!tutorOpen && (
            <FloatingTutorButton onClick={() => setTutorOpen(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
