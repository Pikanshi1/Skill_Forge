"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, ClipboardCheck, Library } from "lucide-react";
import dashboardService, { DashboardData } from "@/services/dashboardService";

const initialDashboard: DashboardData = {
  totalCourses: 0,
  totalLessons: 0,
  completedLessons: 0,
  quizzesSolved: 0,
  averageScore: 0,
  recentCourses: [],
};

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    dashboardService
      .getDashboard()
      .then((response) => setDashboard(response.data ?? initialDashboard))
      .catch(() => setError("Unable to load your dashboard right now."))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Courses", value: dashboard.totalCourses, icon: Library },
    { label: "Lessons", value: dashboard.totalLessons, icon: BookOpen },
    { label: "Completed", value: dashboard.completedLessons, icon: CheckCircle2 },
    { label: "Quizzes solved", value: dashboard.quizzesSolved, icon: ClipboardCheck },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-gray-500">Your learning progress at a glance.</p>
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
            <Icon className="text-purple-600" size={22} />
            <p className="mt-5 text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-3xl font-bold">{loading ? "-" : value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Recent courses</h2>
            <p className="mt-1 text-sm text-gray-500">Continue where you left off.</p>
          </div>
          <Link href="/courses" className="text-sm font-semibold text-purple-600">View all</Link>
        </div>

        {dashboard.recentCourses.length === 0 && !loading ? (
          <p className="mt-8 text-sm text-gray-500">You have not created a course yet.</p>
        ) : (
          <div className="mt-5 divide-y divide-gray-100">
            {dashboard.recentCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="flex items-center justify-between gap-4 py-4 hover:text-purple-600">
                <span className="font-medium">{course.title}</span>
                <span className="text-xs text-gray-500">{course.status}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}