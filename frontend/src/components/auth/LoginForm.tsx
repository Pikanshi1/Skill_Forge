"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import PasswordInput from "./PasswordInput";
import useAuth from "@/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();

  const login = useAuth((state) => state.login);

  const loading = useAuth((state) => state.loading);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    try {
      await login({
        email,
        password,
      });

      router.push("/dashboard");
    } catch (err: unknown) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message ?? "Invalid email or password" : "Invalid email or password");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-semibold">
          Email
        </label>

        <input
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-purple-600"
        />
      </div>

      <PasswordInput
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={setPassword}
      />

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <Link href="/forgot-password" className="font-medium text-purple-600">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
      >
        {loading ? "Signing In..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-purple-600">
          Register
        </Link>
      </p>
    </form>
  );
}