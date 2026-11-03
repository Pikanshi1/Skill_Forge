"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Edit3,
  KeyRound,
  LogOut,
  Mail,
  ShieldCheck,
  Trash2,
  User,
  X,
} from "lucide-react";

import useAuth from "@/hooks/useAuth";
import useCourse from "@/hooks/useCourse";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const clearCourses = useCourse(
  (state) => state.clearCourses
);
  const router = useRouter();
  const user = useAuth((state) => state.user);
  const authLoading = useAuth((state) => state.loading);
  const loadUser = useAuth((state) => state.loadUser);
  const logout = useAuth((state) => state.logout);
  const updateProfile = useAuth((state) => state.updateProfile);
  const changePassword = useAuth((state) => state.changePassword);
  const deleteAccount = useAuth((state) => state.deleteAccount);
  const loading = useAuth((state) => state.loading);
  const courses = useCourse((state) => state.courses);
  const fetchCourses = useCourse((state) => state.fetchCourses);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user, loadUser]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    startTransition(() => {
      setName(user?.name ?? "");
      setEmail(user?.email ?? "");
      setAvatar(user?.avatar ?? "");
    });
  }, [user]);

  const stats = useMemo(() => {
    const published = courses.filter(
      (course) => course.status === "PUBLISHED"
    ).length;

    const totalHours = courses.reduce(
      (total, course) => total + (Number(course.duration) || 0),
      0
    );

    return {
      created: courses.length,
      published,
      hours: totalHours,
      certificates: 0,
    };
  }, [courses]);

  const initials = useMemo(() => {
    const value = name.trim() || "User";
    return value
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [name]);

async function handleSaveProfile() {
  try {
    await updateProfile({
      name,
      email,
      avatar,
    });

    setSaveMessage("Profile updated successfully.");

setTimeout(() => {
  setSaveMessage("");
}, 3000);
    setIsEditing(false);
  } catch (error: unknown) {
    setSaveMessage(axios.isAxiosError(error) ? error.response?.data?.message ?? "Failed to update profile." : "Failed to update profile.");
  }
}
async function handleChangePassword() {
  if (!currentPassword || !newPassword || !confirmPassword) {
    setSaveMessage("Please fill in all password fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setSaveMessage("Passwords do not match.");
    return;
  }

  try {
    await changePassword(
      currentPassword,
      newPassword
    );

    setSaveMessage(
      "Password changed successfully."
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);

  } catch (error: unknown) {
    setSaveMessage(axios.isAxiosError(error) ? error.response?.data?.message ?? "Failed to change password." : "Failed to change password.");
  }
}

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  if (authLoading && !user) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
        <p className="mt-2 text-gray-500">
          Manage your account, security, and learning preferences.
        </p>
      </div>

      {saveMessage && (
        <div className="flex items-center justify-between rounded-2xl border border-purple-200 bg-purple-50 px-5 py-4 text-sm text-purple-700">
          <span>{saveMessage}</span>
          <button
            type="button"
            onClick={() => setSaveMessage("")}
            className="rounded-lg p-1 hover:bg-purple-100"
            aria-label="Dismiss message"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <section className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-100">
        <div className="h-32 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600" />

        <div className="-mt-12 flex flex-col gap-6 px-8 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5 md:flex-row md:items-end">
            <div className="relative">

  {avatar ? (
<Image
  src={avatar}
  alt="Profile"
  width={96}
  height={96}
      className="h-24 w-24 rounded-3xl border-4 border-white object-cover shadow-lg"
    />
  ) : (
    <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-purple-600 to-blue-600 text-3xl font-bold text-white shadow-lg">
      {initials || "U"}
    </div>
  )}

</div>

            <div className="pb-1">
              <h2 className="text-3xl font-bold text-gray-900">
                {user?.name || "Your Name"}
              </h2>
              <p className="mt-1 flex items-center gap-2 text-gray-500">
                <Mail size={16} />
                {user?.email || "your@email.com"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing((value) => !value)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            <Edit3 size={18} />
            {isEditing ? "Close Editor" : "Edit Profile"}
          </button>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<BookOpen size={22} />}
          label="Courses Created"
          value={stats.created}
        />
        <StatCard
          icon={<Check size={22} />}
          label="Courses Published"
          value={stats.published}
        />
        <StatCard
          icon={<Clock3 size={22} />}
          label="Learning Hours"
          value={stats.hours}
        />
        <StatCard
          icon={<ShieldCheck size={22} />}
          label="Certificates"
          value={stats.certificates}
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="mt-1 text-sm text-gray-500">
                Keep your account details up to date.
              </p>
            </div>
            <User className="text-purple-600" size={24} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Full Name"
              value={name}
              editing={isEditing}
              onChange={setName}
            />
            <Field
              label="Email Address"
              value={email}
              editing={isEditing}
              onChange={setEmail}
              type="email"
            />
            {isEditing && (
  <div className="md:col-span-2">
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      Profile Image URL
    </label>

    <input
      type="text"
      value={avatar}
      onChange={(e) => setAvatar(e.target.value)}
      placeholder="https://example.com/avatar.png"
      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-purple-600 focus:bg-white"
    />
  </div>
)}
          </div>

          {isEditing && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setName(user?.name ?? "");
                  setEmail(user?.email ?? "");
                  setAvatar(user?.avatar ?? "");
                  setIsEditing(false);
                }}
                className="rounded-2xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={loading}
                className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
          <div className="mb-7 flex items-center gap-3">
            <ShieldCheck className="text-purple-600" size={24} />
            <div>
              <h2 className="text-2xl font-bold">Security</h2>
              <p className="mt-1 text-sm text-gray-500">
                Protect your account and sign-in details.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPasswordForm((value) => !value)}
            className="flex w-full items-center justify-between rounded-2xl border border-gray-200 p-4 text-left transition hover:bg-gray-50"
          >
            <span className="flex items-center gap-3">
              <KeyRound className="text-purple-600" size={20} />
              <span>
                <span className="block font-semibold">Change Password</span>
                <span className="block text-sm text-gray-500">
                  Update your account password.
                </span>
              </span>
            </span>
            <ChevronRight
              size={20}
              className={showPasswordForm ? "rotate-90 transition" : "transition"}
            />
          </button>

          {showPasswordForm && (
            <div className="mt-5 space-y-4 rounded-2xl bg-gray-50 p-5">
              <PasswordField
                label="Current Password"
                value={currentPassword}
                onChange={setCurrentPassword}
              />
              <PasswordField
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
              />
              <PasswordField
                label="Confirm New Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
              <button
                type="button"
                onClick={handleChangePassword}
                className="w-full rounded-2xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Update Password
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-between rounded-2xl border border-red-200 p-4 text-left text-red-600 transition hover:bg-red-50"
          >
            <span className="flex items-center gap-3">
              <LogOut size={20} />
              <span>
                <span className="block font-semibold">Log Out</span>
                <span className="block text-sm text-red-400">
                  End your current session.
                </span>
              </span>
            </span>
            <ChevronRight size={20} />
          </button>
        </section>
      </div>

      <section className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
        <div className="mb-7 flex items-center gap-3">
          <Bell className="text-purple-600" size={24} />
          <div>
            <h2 className="text-2xl font-bold">Preferences</h2>
            <p className="mt-1 text-sm text-gray-500">
              Customize how your course builder behaves.
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          <PreferenceRow
            icon={<Bell size={20} />}
            title="Email Notifications"
            description="Receive updates about generated courses and account activity."
            enabled={notifications}
            onToggle={() => setNotifications((value) => !value)}
          />

        </div>
      </section>

      <section className="rounded-3xl border border-red-200 bg-red-50 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Trash2 className="text-red-600" size={22} />
              <h2 className="text-2xl font-bold text-red-700">Danger Zone</h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-red-600/80">
              Deleting your account is permanent. This action should only be used
              when you are sure you no longer need your account.
            </p>
          </div>

          <button
            type="button"
onClick={async () => {
  if (
    confirm(
      "Are you sure you want to delete your account?"
    )
  ) {
    try {
      await deleteAccount();
       clearCourses();
    router.push("/");
    } catch (error: unknown) {
      setSaveMessage(
        axios.isAxiosError(error) ? error.response?.data?.message ?? "Failed to delete account." : "Failed to delete account."
      );
    }
  }
}}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-300 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
        {icon}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function Field({
  label,
  value,
  editing,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!editing}
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-purple-600 focus:bg-white disabled:cursor-default disabled:text-gray-600"
      />
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-purple-600"
      />
    </div>
  );
}

function PreferenceRow({
  icon,
  title,
  description,
  enabled,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 text-purple-600">{icon}</div>
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={enabled}
        className={`relative h-7 w-12 rounded-full transition ${
          enabled ? "bg-purple-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
