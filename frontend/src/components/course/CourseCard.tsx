"use client";

import { Trash2, Pencil, Eye } from "lucide-react";
import { Course } from "@/types/course";
import useCourse from "@/hooks/useCourse";
import Link from "next/link";
import Image from "next/image";

interface Props {
  course: Course;
}

export default function CourseCard({
  course,
}: Props) {
  const deleteCourse = useCourse(
    (state) => state.deleteCourse
  );

  const publishCourse = useCourse(
    (state) => state.publishCourse
  );

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow transition hover:shadow-xl">

      <div className="h-52 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">

        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            width={800}
            height={320}
            unoptimized
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-6xl text-white">
            📚
          </span>
        )}

      </div>

      <div className="p-6">

        <div className="flex items-center justify-between">

          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            {course.difficulty}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold

            ${
              course.status === "PUBLISHED"
                ? "bg-green-100 text-green-700"
                : course.status === "ARCHIVED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {course.status}
          </span>

        </div>

        <h2 className="mt-5 text-2xl font-bold">
          {course.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-gray-500">
          {course.description}
        </p>

        <div className="mt-6 flex justify-between text-sm text-gray-500">

          <span>
            ⏱ {course.duration} hrs
          </span>

          <span>
            📅{" "}
            {new Date(
              course.createdAt
            ).toLocaleDateString()}
          </span>

        </div>

        <div className="mt-6 flex gap-3">

         <Link
  href={`/courses/${course.id}`}
  className="flex-1 rounded-xl bg-blue-600 py-2 text-white transition hover:bg-blue-700"
>
  <Eye
    size={18}
    className="mx-auto"
  />
</Link>

          <button className="flex-1 rounded-xl bg-yellow-500 py-2 text-white transition hover:bg-yellow-600">
            <Pencil
              size={18}
              className="mx-auto"
            />
          </button>

          <button
            onClick={() =>
              deleteCourse(course.id)
            }
            className="flex-1 rounded-xl bg-red-500 py-2 text-white transition hover:bg-red-600"
          >
            <Trash2
              size={18}
              className="mx-auto"
            />
          </button>

        </div>

        {course.status ===
          "DRAFT" && (
          <button
            onClick={() =>
              publishCourse(course.id)
            }
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white"
          >
            Publish Course
          </button>
        )}

      </div>

    </div>
  );
}