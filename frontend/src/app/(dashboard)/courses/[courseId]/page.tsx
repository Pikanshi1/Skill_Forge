"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useParams } from "next/navigation";

import progressService from "@/services/progressService";

import useCourse from "@/hooks/useCourse";

import {
  ArrowLeft,
  Pencil,
  Globe,
  BookOpen,
  Clock3,
  Layers,
  Target,
} from "lucide-react";

type ProgressItem = { lessonId: string; completed: boolean };

export default function CourseDetailsPage() {
  const params = useParams();

  const id = params.courseId as string;

  const course = useCourse((state) => state.selectedCourse);

  const loading = useCourse((state) => state.loading);

  const getCourse = useCourse((state) => state.getCourse);

  const publishCourse = useCourse((state) => state.publishCourse);

  const [courseProgress, setCourseProgress] = useState({
    totalLessons: 0,

    completedLessons: 0,

    percentage: 0,

    progress: [] as ProgressItem[],
  });

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        await getCourse(id);

        const response = await progressService.getCourseProgress(id);

        setCourseProgress(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [getCourse, id]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-3xl font-bold">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-purple-600"
      >
        <ArrowLeft size={18} />
        Back to Courses
      </Link>

      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex h-72 items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              width={1200}
              height={500}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-8xl">📚</span>
          )}
        </div>

        <div className="space-y-6 p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold">{course.title}</h1>

              <p className="mt-3 text-lg text-gray-600">{course.description}</p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/courses/${course.id}/edit`}
                className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-white"
              >
                <Pencil className="mr-2 inline" size={18} />
                Edit
              </Link>

              {course.status === "DRAFT" && (
                <button
                  onClick={() => publishCourse(course.id)}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 font-semibold text-white"
                >
                  <Globe className="mr-2 inline" size={18} />
                  Publish
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-100 p-5">
              <BookOpen className="mb-3 text-purple-600" />

              <p className="text-sm text-gray-500">Difficulty</p>

              <h3 className="text-xl font-bold">{course.difficulty}</h3>
            </div>

            <div className="rounded-2xl bg-gray-100 p-5">
              <Clock3 className="mb-3 text-purple-600" />

              <p className="text-sm text-gray-500">Duration</p>

              <h3 className="text-xl font-bold">{course.duration} Hours</h3>
            </div>

            <div className="rounded-2xl bg-gray-100 p-5">
              <Target className="mb-3 text-purple-600" />

              <p className="text-sm text-gray-500">Learning Goal</p>

              <h3 className="text-xl font-bold">
                {course.goal || "No goal specified"}
              </h3>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Course Progress</h2>

                  <p className="text-sm text-gray-500">
                    {courseProgress.completedLessons} of{" "}
                    {courseProgress.totalLessons} lessons completed
                  </p>
                </div>

                <span className="rounded-full bg-purple-100 px-4 py-2 font-semibold text-purple-700">
                  {courseProgress.percentage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
                  style={{
                    width: `${courseProgress.percentage}%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-2xl bg-gray-100 p-5">
              <Layers className="mb-3 text-purple-600" />

              <p className="text-sm text-gray-500">Modules</p>

              <h3 className="text-xl font-bold">
                {course.modules?.length ?? 0}
              </h3>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold">Course Modules</h2>

            {course.modules?.length ? (
              <div className="space-y-5">
                {course.modules.map((module, index) => (
                  <div key={module.id} className="rounded-2xl border p-6">
                    <h3 className="text-xl font-semibold">
                      Module {index + 1}: {module.title}
                    </h3>

                    <p className="mt-2 text-gray-600">{module.description}</p>

                    <div className="mt-5 space-y-3">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = courseProgress.progress.some(
                          (p) => p.lessonId === lesson.id && p.completed,
                        );

                        return (
                          <Link
                            key={lesson.id}
                            href={`/courses/${course.id}/lessons/${lesson.id}`}
                            className="block rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">
                                Lesson {lessonIndex + 1}: {lesson.title}
                              </h4>

                              {isCompleted ? (
                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                  ✓ Completed
                                </span>
                              ) : (
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                                  Pending
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                              {lesson.description}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed py-16 text-center text-gray-500">
                No modules available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
