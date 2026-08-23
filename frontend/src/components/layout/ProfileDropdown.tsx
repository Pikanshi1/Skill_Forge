"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import useAuth from "@/hooks/useAuth";

export default function ProfileDropdown() {
  const router = useRouter();

  const logout = useAuth((state) => state.logout);

  const user = useAuth((state) => state.user);

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClick);

    return () =>
      window.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    await logout();

    router.replace("/");
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl bg-gray-100 px-2.5 py-1.5 transition hover:bg-gray-200"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-bold text-white">
          {user?.name?.charAt(0).toUpperCase() ?? "U"}
        </div>

        <ChevronDown
          size={16}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-lg font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  {user?.name ?? "User"}
                </h3>

                <p className="text-xs text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-100"
            >
              <User size={17} />
              My Profile
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-100"
            >
              <Settings size={17} />
              Settings
            </Link>
          </div>

          <div className="border-t border-gray-100 p-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}