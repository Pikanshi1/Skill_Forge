"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import PasswordInput from "./PasswordInput";
import useAuth from "@/hooks/useAuth";

export default function RegisterForm() {
  const router = useRouter();

  const register = useAuth((state) => state.register);

  const loading = useAuth((state) => state.loading);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({
  name: form.name,
  email: form.email,
  password: form.password,
});

      setSuccess("Account created successfully. Please login.");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: unknown) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message ?? "Registration failed." : "Registration failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-600">
          {success}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-semibold">
          Full Name
        </label>

        <input
          type="text"
          placeholder="John Doe"
          value={form.name}
          onChange={(e) =>
            handleChange("name", e.target.value)
          }
          required
          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-purple-600"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold">
          Email
        </label>

        <input
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
          required
          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-purple-600"
        />
      </div>

      <PasswordInput
        label="Password"
        placeholder="Enter password"
        value={form.password}
        onChange={(value) =>
          handleChange("password", value)
        }
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm password"
        value={form.confirmPassword}
        onChange={(value) =>
          handleChange("confirmPassword", value)
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-purple-600"
        >
          Login
        </Link>
      </p>
    </form>
  );
}