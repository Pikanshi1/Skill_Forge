"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const dashboardPath = /^\/(admin|ai-tutor|analytics|certificate|certificates|course|courses|create-course|dashboard|documentation|lessons|profile|quiz|settings|support)(\/|$)/;

  if (dashboardPath.test(pathname)) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <nav className="w-full flex items-center px-6 md:px-10 lg:px-16 xl:px-20 py-4">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
            AI
          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-tight">
              AI Course Builder
            </h1>

            <p className="text-xs text-gray-500">
              Learn • Build • Grow
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <div className="flex-1 flex justify-center">

          <div className="hidden lg:flex items-center gap-8">

            <Link href="/" className="text-base font-medium text-gray-600 hover:text-purple-600 transition duration-300">
              Home
            </Link>

            <Link href="/courses" className="text-base font-medium text-gray-600 hover:text-purple-600 transition duration-300">
              Courses
            </Link>

            <Link href="/#features" className="text-base font-medium text-gray-600 hover:text-purple-600 transition duration-300">
              Features
            </Link>

            <Link href="/#about" className="text-base font-medium text-gray-600 hover:text-purple-600 transition duration-300">
              About
            </Link>

          </div>

        </div>

        {/* Right Buttons */}

        <div className="flex items-center gap-5 ml-auto">
          <ThemeToggle />

          <Link
            href="/login"
            className="text-base font-semibold text-gray-700 hover:text-purple-600 transition duration-300"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>


        </div>

      </nav>
    </header>
  );
}