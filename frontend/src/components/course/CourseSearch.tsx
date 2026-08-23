"use client";

import { Search, X } from "lucide-react";

interface CourseSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CourseSearch({
  value,
  onChange,
}: CourseSearchProps) {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search courses..."
        className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-12 pr-12 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-red-500"
        >
          <X size={18} />
        </button>
      )}

    </div>
  );
}