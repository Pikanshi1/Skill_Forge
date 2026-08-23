"use client";

import { useEffect, useState } from "react";
import { Award, Download, Loader2 } from "lucide-react";
import certificateService, { Certificate } from "@/services/certificateService";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { certificateService.getCertificates().then((response) => setCertificates(response.data.data ?? [])).catch(() => setError("Unable to load certificates right now.")).finally(() => setLoading(false)); }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">Achievements</p><h1 className="mt-2 text-4xl font-bold">Certificates</h1><p className="mt-2 text-gray-500">Credentials earned by completing every lesson in a course.</p></div>
      {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-600" /></div> : certificates.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center"><Award className="mx-auto text-purple-500" size={42} /><h2 className="mt-4 text-xl font-semibold">No certificates yet</h2><p className="mt-2 text-sm text-gray-500">Complete a course to unlock your first certificate.</p></div> : <div className="grid gap-5 md:grid-cols-2">{certificates.map((certificate) => <article key={certificate.id} className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700"><Award size={25} /></div><span className="text-xs text-gray-500">{new Date(certificate.createdAt).toLocaleDateString()}</span></div><h2 className="mt-5 text-xl font-semibold">{certificate.course.title}</h2><p className="mt-2 text-sm text-gray-500">{certificate.course.difficulty} course · {certificate.course.duration} hours</p><div className="mt-5 flex items-center justify-between border-t pt-4"><span className="font-mono text-xs text-gray-500">{certificate.certificateNo}</span><a href={`/api/certificate/verify/${certificate.certificateNo}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700"><Download size={16} /> Verify</a></div></article>)}</div>}
    </div>
  );
}