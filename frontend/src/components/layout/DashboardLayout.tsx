"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import useAuth from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const token = useAuth((state) => state.token);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [router, token]);

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        <div className="flex flex-1 flex-col min-w-0">
          <DashboardNavbar />

          <main className="flex-1 overflow-y-auto p-4 md:p-5 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}