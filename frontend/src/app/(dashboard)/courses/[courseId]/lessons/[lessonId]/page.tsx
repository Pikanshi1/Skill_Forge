"use client";

import LessonLayout from "@/components/lesson/LessonLayout";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useLessonStore } from "@/store/lessonStore";
import useCourse from "@/hooks/useCourse";

export default function LessonPage() {
  const params = useParams();

  const courseId =
    typeof params.courseId === "string" ? params.courseId : "";

  const lessonId =
    typeof params.lessonId === "string" ? params.lessonId : "";

  const lesson = useLessonStore((state) => state.lesson);
  const loading = useLessonStore((state) => state.loading);
  const error = useLessonStore((state) => state.error);
  const completed = useLessonStore((state) => state.completed);
  const getLesson = useLessonStore((state) => state.getLesson);
  const markComplete = useLessonStore((state) => state.markComplete);
  const course = useCourse((state) => state.selectedCourse);
  const getCourse = useCourse((state) => state.getCourse);

  useEffect(() => {
    if (!courseId || !lessonId) return;
    void getLesson(lessonId);
    void getCourse(courseId);
  }, [courseId, getCourse, getLesson, lessonId]);

  if (!courseId || !lessonId) {
    return <div className="p-6 text-gray-500">Lesson not found.</div>;
  }

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center text-gray-500">Loading lesson...</div>;
  }

  if (error || !lesson) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Lesson unavailable</h1>
        <p className="max-w-md text-gray-500">{error ?? "This lesson could not be found."}</p>
        <button
          type="button"
          onClick={() => void getLesson(lessonId)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  let content = lesson.content ?? lesson.description;
  let summary = lesson.description;
  try {
    const generated = JSON.parse(lesson.content ?? "{}");
    content = generated.content ?? content;
    summary = generated.summary ?? summary;
  } catch {
  }

  return (
    <LessonLayout
      courseId={courseId}
      lessonId={lesson.id}
      title={lesson.title}
      module={course?.title ?? "Course lesson"}
      progress={completed ? 100 : 0}
      content={content}
      summary={summary}
      videoUrl={lesson.videoUrl}
      modules={course?.modules}
      completed={completed}
      onComplete={() => void markComplete(lesson.id)}
    />
  );
}