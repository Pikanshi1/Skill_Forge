"use client";

import { useEffect, useState } from "react";
import analyticsService, { AnalyticsData } from "@/services/analyticsService";

const initialAnalytics: AnalyticsData = {
  totalLearningMinutes: 0,
  completedLessons: 0,
  quizzesSolved: 0,
  averageScore: 0,
  currentStreak: 0,
  longestStreak: 0,
};

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    analyticsService
      .getAnalytics()
      .then((response) => setAnalytics(response.data ?? initialAnalytics))
      .catch(() => setError("Unable to load analytics right now."))
      .finally(() => setLoading(false));
  }, []);

  const metrics = [
    ["Learning time", `${analytics.totalLearningMinutes} min`],
    ["Lessons completed", analytics.completedLessons],
    ["Quizzes solved", analytics.quizzesSolved],
    ["Average score", `${Math.round(analytics.averageScore)}%`],
    ["Current streak", `${analytics.currentStreak} days`],
    ["Longest streak", `${analytics.longestStreak} days`],
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-1 text-gray-500">Track your learning momentum and results.</p>
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-3 text-3xl font-bold">{loading ? "-" : value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}