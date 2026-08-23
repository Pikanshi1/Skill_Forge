"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import useAuth from "@/hooks/useAuth";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const resetPassword = useAuth((state) => state.resetPassword);
  const loading = useAuth((state) => state.loading);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetPassword(token, password, confirmPassword);

      setSuccess(
        "Password reset successfully. Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message ?? "Unable to reset password." : "Unable to reset password.");
    }
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new secure password for your account."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={password}
          onChange={setPassword}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}