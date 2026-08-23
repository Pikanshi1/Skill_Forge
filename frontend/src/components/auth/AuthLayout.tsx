"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left */}

      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500 text-white p-12 relative overflow-hidden">
        <div className="absolute top-10 left-10 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-xl font-bold text-purple-700">
              AI
            </div>

            <h1 className="text-2xl font-bold">
              AI Course Builder
            </h1>
          </div>

          <h2 className="mt-12 text-4xl font-extrabold leading-tight">
            Learn Smarter.
            <br />
            Build Faster.
          </h2>

          <p className="mt-6 text-base leading-8 text-purple-100">
            Generate complete AI-powered courses, interactive quizzes,
            intelligent tutoring and personalized learning experiences
            from one modern platform.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <h3 className="text-2xl font-bold">
                10K+
              </h3>

              <p className="mt-1 text-sm text-purple-100">
                Courses
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <h3 className="text-2xl font-bold">
                24/7
              </h3>

              <p className="mt-1 text-sm text-purple-100">
                AI Tutor
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <h3 className="text-2xl font-bold">
                99%
              </h3>

              <p className="mt-1 text-sm text-purple-100">
                Success
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              {title}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}