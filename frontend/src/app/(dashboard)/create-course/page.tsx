"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import CourseForm from "@/components/course/CourseForm";
import useCourse from "@/hooks/useCourse";
import { CreateCourseRequest } from "@/types/course";

export default function CreateCoursePage() {
  const router = useRouter();

const generateCourse = useCourse(
  (state) => state.generateCourse
);
async function handleCreate(data: CreateCourseRequest) {
  try {
   await generateCourse({
  topic:data.title,
  difficulty:data.difficulty,
  duration:data.duration,
  studyHoursPerDay:2,
  goal:data.goal || data.description,
});

    console.log("Course created successfully");

    router.push("/courses");
  } catch (error) {
    console.error("Create course failed:", error);
  }
}

async function handleSaveDraft(data: CreateCourseRequest) {
  try {
    await generateCourse({
  topic:data.title,
  difficulty:data.difficulty,
  duration:data.duration,
  studyHoursPerDay:2,
  goal:data.goal || data.description,
});

    alert("Course saved as draft.");

    router.push("/courses");
  } catch (error) {
    console.error("Failed to save draft:", error);
    alert("Failed to save draft.");
  }
}

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <Link
            href="/courses"
            className="mb-4 inline-flex items-center gap-2 text-sm text-purple-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>

          <h1 className="text-4xl font-bold">
            Create AI Course
          </h1>

          <p className="mt-2 text-gray-500">
            Generate a complete AI-powered course with modules,
            lessons and quizzes.
          </p>

        </div>

      </div>

<CourseForm
  onSubmit={handleCreate}
  onSaveDraft={handleSaveDraft}
  submitText="Create Course"
/>

    </div>
  );
}