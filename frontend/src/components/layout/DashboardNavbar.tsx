"use client";

import { Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import MobileSidebar from "./MobileSidebar";

export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="flex h-full items-center justify-between px-5 md:px-6">
        <div className="flex items-center gap-3">
          <MobileSidebar />

          <div className="hidden lg:flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-lg font-bold text-white shadow-md">
            AI
          </div>

          <div className="hidden lg:block">
            <h1 className="text-lg font-bold">
              AI Course Builder
            </h1>

            <p className="text-xs text-gray-500">
              AI Learning Platform
            </p>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white text-sm font-bold">
              AI
            </div>

            <span className="text-sm font-bold">
              AI Course Builder
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition hover:bg-gray-200">
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}