"use client";

interface CourseFiltersProps {
  value: string;
  onChange: (value: string) => void;
}

const filters = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Draft",
    value: "DRAFT",
  },
  {
    label: "Published",
    value: "PUBLISHED",
  },
  {
    label: "Archived",
    value: "ARCHIVED",
  },
];

export default function CourseFilters({
  value,
  onChange,
}: CourseFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">

      {filters.map((filter) => (

        <button
          key={filter.value}
          type="button"
          onClick={() =>
            onChange(filter.value)
          }
          className={`rounded-xl px-5 py-3 text-sm font-semibold transition-all

          ${
            value === filter.value
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
              : "border border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50"
          }`}
        >
          {filter.label}
        </button>

      ))}

    </div>
  );
}