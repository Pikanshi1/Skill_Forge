"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardCheck, ExternalLink, Loader2 } from "lucide-react";
import CourseService from "@/services/courseService";
import { Course } from "@/types/course";

export default function QuizPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CourseService.getCourses().then((response) => setCourses(response.data ?? [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">Practice</p><h1 className="mt-2 text-4xl font-bold">Choose a lesson quiz</h1><p className="mt-2 text-gray-500">Quizzes are generated from individual lesson content, so start with the lesson you want to review.</p></div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-600" /></div> : courses.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center"><ClipboardCheck className="mx-auto text-purple-500" size={42} /><h2 className="mt-4 text-xl font-semibold">Create a course first</h2><Link href="/create-course" className="mt-5 inline-flex rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white">Create course</Link></div> : <div className="space-y-5">{courses.map((course) => <section key={course.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><h2 className="text-xl font-semibold">{course.title}</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{course.modules?.flatMap((module) => module.lessons.map((lesson) => <Link key={lesson.id} href={`/courses/${course.id}/lessons/${lesson.id}/quiz`} className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-purple-400 hover:bg-purple-50"><span><span className="block text-xs text-gray-500">{module.title}</span><span className="mt-1 block font-medium">{lesson.title}</span></span><ExternalLink size={17} className="text-purple-600" /></Link>))}</div></section>)}</div>}
    </div>
  );
}