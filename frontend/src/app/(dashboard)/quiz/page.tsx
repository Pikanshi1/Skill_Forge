"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, Loader2 } from "lucide-react";
import CourseService from "@/services/courseService";
import { Course, Module } from "@/types/course";

export default function QuizPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await CourseService.getCourses();
        setCourses(response.data ?? []);
      } catch {
        setError("Courses could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadCourses();
  }, []);

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="animate-spin text-purple-600" /></div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">Practice</p>
        <h1 className="mt-2 text-4xl font-bold">AI Quiz</h1>
        <p className="mt-2 text-gray-500">Choose a course, module and lesson to generate a quiz from its content.</p>
      </div>

      {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {!selectedCourse && (
        courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <ClipboardCheck className="mx-auto text-purple-500" size={42} />
            <h2 className="mt-4 text-xl font-semibold">Create a course first</h2>
            <Link href="/create-course" className="mt-5 inline-flex rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white">Create course</Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <button key={course.id} type="button" onClick={() => setSelectedCourse(course)} className="rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-gray-200 transition hover:ring-purple-400">
                <BookOpen className="text-purple-600" />
                <h2 className="mt-4 text-xl font-semibold">{course.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">{course.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-700">View modules <ArrowRight size={16} /></span>
              </button>
            ))}
          </div>
        )
      )}

      {selectedCourse && !selectedModule && (
        <section className="space-y-4">
          <button type="button" onClick={() => setSelectedCourse(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-purple-700"><ArrowLeft size={16} /> All courses</button>
          <h2 className="text-2xl font-semibold">{selectedCourse.title} modules</h2>
          {selectedCourse.modules.map((module) => (
            <button key={module.id} type="button" onClick={() => setSelectedModule(module)} className="flex w-full items-center justify-between rounded-xl bg-white p-5 text-left shadow-sm ring-1 ring-gray-200 hover:ring-purple-400">
              <span><span className="block font-semibold">{module.title}</span><span className="mt-1 block text-sm text-gray-500">{module.lessons.length} lessons</span></span>
              <ArrowRight className="text-purple-600" size={18} />
            </button>
          ))}
        </section>
      )}

      {selectedCourse && selectedModule && (
        <section className="space-y-4">
          <button type="button" onClick={() => setSelectedModule(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-purple-700"><ArrowLeft size={16} /> {selectedCourse.title}</button>
          <h2 className="text-2xl font-semibold">{selectedModule.title} lessons</h2>
          {selectedModule.lessons.map((lesson) => (
            <Link key={lesson.id} href={`/courses/${selectedCourse.id}/lessons/${lesson.id}/quiz`} className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 hover:ring-purple-400">
              <span><span className="block font-semibold">{lesson.title}</span><span className="mt-1 block text-sm text-gray-500">{lesson.duration} minutes</span></span>
              <ArrowRight className="text-purple-600" size={18} />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
