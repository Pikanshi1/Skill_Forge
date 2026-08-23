"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

import AuthLayout from "@/components/auth/AuthLayout";
import useAuth from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const forgotPassword = useAuth(
    (state) => state.forgotPassword
  );

  const loading = useAuth(
    (state) => state.loading
  );

  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    setSuccess("");

    try {
      await forgotPassword(email);

      setSuccess(
        "Password reset link has been sent to your email."
      );

      setEmail("");
    } catch (err: unknown) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message ?? "Failed to send reset link." : "Failed to send reset link.");
    }
  }

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your registered email to receive a reset link."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <div>
          <label className="mb-2 block font-semibold">
            Email
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        <p className="text-center text-gray-500">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-purple-600"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}