"use client";

import { Course } from "@/types/course";

import CourseCard from "./CourseCard";
import EmptyCourses from "./EmptyCourses";

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({
  courses,
}: CourseListProps) {
  if (courses.length === 0) {
    return <EmptyCourses />;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}

    </div>
  );
}