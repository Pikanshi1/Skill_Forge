"use client";

import { useState } from "react";
import axios from "axios";
import { Bell, KeyRound, Save } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function SettingsPage() {
  const user = useAuth((state) => state.user);
  const loading = useAuth((state) => state.loading);
  const changePassword = useAuth((state) => state.changePassword);
  const [notifications, setNotifications] = useState(() => typeof window === "undefined" || localStorage.getItem("courseforge-notifications") !== "false");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function savePreferences() {
    localStorage.setItem("courseforge-notifications", String(notifications));
    setMessage("Preferences saved.");
  }

  async function handlePasswordChange() {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      setMessage("Enter all password fields and make sure the new passwords match.");
      return;
    }
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setMessage("Password changed successfully.");
    } catch (error: unknown) {
      setMessage(axios.isAxiosError(error) ? error.response?.data?.message ?? "Could not change password." : "Could not change password.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-2 py-4">
      <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">Account control</p><h1 className="mt-2 text-4xl font-bold text-gray-900">Settings</h1><p className="mt-2 text-gray-500">Manage how CourseForge works for {user?.email ?? "your account"}.</p></div>
      {message && <div className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-800">{message}</div>}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="flex items-start justify-between"><div><h2 className="text-xl font-semibold">Preferences</h2><p className="mt-1 text-sm text-gray-500">Choose the experience you want each time you return.</p></div></div>
        <div className="mt-6 divide-y divide-gray-100">
          <label className="flex items-center justify-between gap-4 py-4"><span className="flex items-center gap-3"><Bell className="text-gray-400" size={20} /><span><span className="block font-medium">Learning notifications</span><span className="text-sm text-gray-500">Receive reminders about unfinished courses.</span></span></span><input type="checkbox" checked={notifications} onChange={(event) => setNotifications(event.target.checked)} className="h-5 w-5 accent-purple-600" /></label>
        </div>
        <button onClick={savePreferences} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"><Save size={16} /> Save preferences</button>
      </section>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><div className="flex items-start gap-3"><KeyRound className="mt-1 text-purple-600" size={22} /><div><h2 className="text-xl font-semibold">Password and security</h2><p className="mt-1 text-sm text-gray-500">Change your password without leaving your account.</p></div></div><div className="mt-6 grid gap-4 md:grid-cols-3"><PasswordField label="Current password" value={currentPassword} onChange={setCurrentPassword} /><PasswordField label="New password" value={newPassword} onChange={setNewPassword} /><PasswordField label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} /></div><button disabled={loading} onClick={handlePasswordChange} className="mt-5 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50">{loading ? "Updating..." : "Update password"}</button></section>
    </div>
  );
}

function PasswordField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="text-sm font-medium text-gray-700">{label}<input type="password" value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100" /></label>;
}
