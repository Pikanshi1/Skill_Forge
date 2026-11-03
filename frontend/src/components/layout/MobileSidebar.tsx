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
  Menu,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sections = [
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

export default function MobileSidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-lg p-2 hover:bg-gray-100 transition lg:hidden">
          <Menu size={22} />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0">
        <div className="flex h-16 items-center border-b px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-lg font-bold text-white">
            AI
          </div>

          <div className="ml-3">
            <h2 className="text-base font-bold">
              AI Course Builder
            </h2>

            <p className="text-xs text-gray-500">
              AI Learning Platform
            </p>
          </div>
        </div>

        <div className="overflow-y-auto p-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="mb-2 px-2 text-[11px] font-bold tracking-[0.18em] text-gray-400 uppercase">
                {section.title}
              </h3>

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
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                        active
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                          : "hover:bg-purple-50 text-gray-700"
                      }`}
                    >
                      <Icon size={18} />

                      <span className="font-medium">
                        {item.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}