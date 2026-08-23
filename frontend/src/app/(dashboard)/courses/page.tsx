"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Plus } from "lucide-react";

import useCourse from "@/hooks/useCourse";

import CourseSearch from "@/components/course/CourseSearch";
import CourseFilters from "@/components/course/CourseFilters";
import CourseList from "@/components/course/CourseList";

export default function CoursesPage() {
  const courses = useCourse(
    (state) => state.courses
  );



  const loading = useCourse(
    (state) => state.loading
  );

  const fetchCourses = useCourse(
    (state) => state.fetchCourses
  );

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filteredCourses =
    courses.filter((course) => {

      const matchesSearch =
        course.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        course.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "ALL"
          ? true
          : course.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            My Courses
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all your AI-powered courses.
          </p>

        </div>

        <Link
          href="/create-course"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          <Plus size={20} />

          Create Course

        </Link>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <CourseSearch
          value={search}
          onChange={setSearch}
        />

        <CourseFilters
          value={filter}
          onChange={setFilter}
        />

      </div>

      {loading ? (

        <div className="flex justify-center py-24">

          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />

        </div>

      ) : (

        <CourseList
          courses={
            filteredCourses
          }
        />

      )}

    </div>
  );
}