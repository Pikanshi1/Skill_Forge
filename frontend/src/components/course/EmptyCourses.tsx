import Link from "next/link";
import { BookOpen, PlusCircle } from "lucide-react";

export default function EmptyCourses() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white py-24 px-8 text-center">

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100">

        <BookOpen
          size={46}
          className="text-purple-600"
        />

      </div>

      <h2 className="mt-8 text-3xl font-bold">
        No Courses Yet
      </h2>

      <p className="mt-4 max-w-lg text-lg leading-relaxed text-gray-500">
        You haven&apos;t created any courses yet. Start building your
        first AI-powered course and generate lessons, quizzes,
        and learning paths in minutes.
      </p>

      <Link
        href="/create-course"
        className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:shadow-xl"
      >
        <PlusCircle size={20} />
        Create Your First Course
      </Link>

    </div>
  );
}