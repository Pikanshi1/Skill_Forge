"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import CourseForm from "@/components/course/CourseForm";
import useCourse from "@/hooks/useCourse";
import { CreateCourseRequest } from "@/types/course";

export default function EditCoursePage() {
  const router = useRouter();

  const params = useParams();

  const id = params.courseId as string;

  const loading = useCourse(
    (state) => state.loading
  );

  const selectedCourse = useCourse(
    (state) => state.selectedCourse
  );

  const getCourse = useCourse(
    (state) => state.getCourse
  );

  const updateCourse = useCourse(
    (state) => state.updateCourse
  );

  useEffect(() => {
    if (id) {
      getCourse(id);
    }
  }, [id, getCourse]);

  async function handleUpdate(data: CreateCourseRequest) {
    await updateCourse(id, data);

    router.push(`/courses/${id}`);
  }

  if (loading || !selectedCourse) {
    return (
      <div className="flex h-[70vh] items-center justify-center">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10">

        <Link
          href={`/courses/${id}`}
          className="mb-4 inline-flex items-center gap-2 text-sm text-purple-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Course
        </Link>

        <h1 className="text-4xl font-bold">
          Edit Course
        </h1>

        <p className="mt-2 text-gray-500">
          Update your course details.
        </p>

      </div>

      <CourseForm
        initialValues={selectedCourse}
        onSubmit={handleUpdate}
        submitText="Update Course"
      />

    </div>
  );
}