import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="mt-2 text-gray-500">Administrative APIs are not enabled for this account yet.</p>
      <div className="mt-8 max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><h2 className="text-lg font-semibold">Continue building</h2><p className="mt-2 text-sm leading-6 text-gray-600">You can manage courses, learning progress, analytics, and certificates from the connected areas below.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/courses" className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white">Manage courses</Link><Link href="/analytics" className="rounded-lg border px-4 py-2 text-sm font-semibold">View analytics</Link></div></div>
    </div>
  );
}