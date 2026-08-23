"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 pr-10 text-sm outline-none transition focus:border-purple-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}