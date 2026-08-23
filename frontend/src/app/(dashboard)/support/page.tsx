"use client";

import { useState } from "react";
import { ChevronDown, Mail, MessageCircle } from "lucide-react";

const faqs = [{ question: "How are courses generated?", answer: "Create a course with a topic, goal, level, and duration. CourseForge generates a structured course that you can review and edit." }, { question: "When do I earn a certificate?", answer: "Complete every lesson in a course. The certificate becomes available in the Certificates area once progress is complete." }, { question: "Why can’t I generate a quiz?", answer: "A lesson needs generated content before the AI can create questions. Open the lesson first, then try again." }];

export default function SupportPage() {
  const [open, setOpen] = useState(0);
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">Help center</p><h1 className="mt-2 text-4xl font-bold">How can we help?</h1><p className="mt-2 text-gray-500">Find an answer quickly or send the team a message.</p></div>
      <div className="grid gap-5 md:grid-cols-2"><a href="mailto:support@courseforge.ai" className="rounded-2xl bg-gray-900 p-6 text-white transition hover:bg-gray-800"><Mail size={24} /><h2 className="mt-5 text-xl font-semibold">Email support</h2><p className="mt-2 text-sm text-gray-300">support@courseforge.ai</p></a><div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><MessageCircle className="text-purple-600" size={24} /><h2 className="mt-5 text-xl font-semibold">Send a message</h2>{sent ? <p className="mt-3 text-sm text-green-700">Your email draft is ready in your mail app.</p> : <button onClick={() => setSent(true)} className="mt-3 text-sm font-semibold text-purple-700">Open contact form</button>}</div></div>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><h2 className="text-xl font-semibold">Frequently asked questions</h2><div className="mt-4 divide-y divide-gray-100">{faqs.map((faq, index) => <div key={faq.question}><button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between py-4 text-left font-medium">{faq.question}<ChevronDown className={`transition ${open === index ? "rotate-180" : ""}`} size={18} /></button>{open === index && <p className="pb-4 text-sm leading-6 text-gray-600">{faq.answer}</p>}</div>)}</div></section>
    </div>
  );
}