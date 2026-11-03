"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  FileText,
  Bot,
  BarChart3,
  Award,
  User,
  Settings,
  BookMarked,
  LifeBuoy,
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    title: "MAIN",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "COURSE MANAGEMENT",
    items: [
      {
        title: "My Courses",
        href: "/courses",
        icon: BookOpen,
      },
      {
        title: "Create Course",
        href: "/create-course",
        icon: PlusCircle,
      },
      {
        title: "Lessons",
        href: "/lessons",
        icon: FileText,
      },
    ],
  },
  {
    title: "AI TOOLS",
    items: [
      {
        title: "AI Tutor",
        href: "/ai-tutor",
        icon: Bot,
      },
    ],
  },
  {
    title: "INSIGHTS",
    items: [
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        title: "Certificates",
        href: "/certificate",
        icon: Award,
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        title: "Profile",
        href: "/profile",
        icon: User,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "HELP",
    items: [
      {
        title: "Documentation",
        href: "/documentation",
        icon: BookMarked,
      },
      {
        title: "Support",
        href: "/support",
        icon: LifeBuoy,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0">
      <div className="h-16 px-5 flex items-center border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
          AI
        </div>

        <div className="ml-3">
          <h1 className="text-base font-bold tracking-tight">
            AI Course Builder
          </h1>

          <p className="text-xs text-gray-500">
            AI Learning Platform
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-gray-300">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="px-2 mb-2 text-[11px] font-bold tracking-[0.18em] text-gray-400 uppercase">
              {section.title}
            </h2>

            <div className="space-y-1.5">
              {section.items.map((item) => {
                const Icon = item.icon;

                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    <Icon size={18} />

                    <span className="text-sm font-medium">
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}