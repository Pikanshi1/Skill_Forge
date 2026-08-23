"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";
import { useLessonStore } from "@/store/lessonStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function LessonPage() {
  
  const params = useParams();

  const lesson = useLessonStore((state) => state.lesson);

  const loading = useLessonStore((state) => state.loading);

  const getLesson = useLessonStore((state) => state.getLesson);

  const markComplete = useLessonStore(
  (state) => state.markComplete
);

  const completed = useLessonStore((state) => state.completed);

  useEffect(() => {
    if (params.id) {
      getLesson(params.id as string);
    }
  }, [getLesson, params.id]);

  if (loading) {
    return <div className="p-10">Loading lesson...</div>;
  }

  if (!lesson) {
    return <div className="p-10">Lesson not found</div>;
  }

  let markdown = "";
  let summary = "";

  try {
    const parsed = JSON.parse(lesson.content || "{}");

    markdown = parsed.content || "";
    summary = parsed.summary || "";
  } catch {
    markdown = lesson.content || "";
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-bold">{lesson.title}</h1>

      <p className="mt-3 text-gray-500">{lesson.description}</p>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">
          📖 Lesson Content
        </h2>

        {summary && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-bold text-blue-700">
              📌 Lesson Summary
            </h3>

            <p className="mt-2 text-gray-700">
              {summary}
            </p>
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>


<button
  onClick={() => markComplete(lesson.id)}
  disabled={completed}
  className={`mt-8 rounded-xl px-6 py-3 font-semibold text-white ${
    completed
      ? "bg-green-600 cursor-not-allowed"
      : "bg-gradient-to-r from-purple-600 to-blue-600"
  }`}
>
  {completed
    ? "✅ Lesson Completed"
    : "Mark Lesson Complete"}
</button>

      {lesson.videoUrl && (
        <div className="mt-8">
          <video controls className="w-full rounded-xl">
            <source src={lesson.videoUrl} />
          </video>
        </div>
      )}
    </div>
  );
}