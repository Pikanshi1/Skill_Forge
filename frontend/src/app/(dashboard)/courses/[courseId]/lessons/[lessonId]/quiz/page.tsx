"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import quizService, { QuizQuestion, QuizResult } from "@/services/quizService";
import LessonService from "@/services/lessonService";
import Link from "next/link";

export default function LessonQuizPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [lessonTitle, setLessonTitle] = useState("Lesson quiz");
  const [moduleTitle, setModuleTitle] = useState("");

  const loadQuiz = useCallback(async (generate = false) => {
    setWorking(true); setError("");
    try {
      const response = generate ? await quizService.generateQuiz(lessonId) : await quizService.getQuiz(lessonId);
      setQuestions(response.data.data ?? []);
      setResult(null);
    } catch (requestError: unknown) {
      setError(axios.isAxiosError(requestError) ? requestError.response?.data?.message ?? "This quiz could not be loaded." : "This quiz could not be loaded.");
    } finally { setWorking(false); setLoading(false); }
  }, [lessonId]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadQuiz(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadQuiz]);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const response = await LessonService.getLesson(lessonId);
        setLessonTitle(response.data.title);
        setModuleTitle(response.data.module?.title ?? "");
      } catch {
        setError("Lesson details could not be loaded.");
      }
    };
    void loadLesson();
  }, [lessonId]);

  async function submitQuiz() {
    if (Object.keys(answers).length === 0) { setError("Select at least one answer before submitting."); return; }
    setWorking(true); setError("");
    try {
      const response = await quizService.submitQuiz(lessonId, questions.map((question) => ({ quizId: question.id, answer: answers[question.id] })));
      setResult(response.data.data);
    } catch (requestError: unknown) { setError(axios.isAxiosError(requestError) ? requestError.response?.data?.message ?? "Your answers could not be submitted." : "Your answers could not be submitted."); }
    finally { setWorking(false); }
  }

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center text-gray-500">Loading quiz...</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><Link href="/quiz" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-purple-700"><ArrowLeft size={16} /> AI Quiz</Link><p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">{moduleTitle || "Knowledge check"}</p><h1 className="mt-2 text-3xl font-bold">{lessonTitle}</h1><p className="mt-2 text-gray-500">Test what you understood, then review the explanations.</p></div>{!result && <button onClick={() => void loadQuiz(true)} disabled={working} className="inline-flex items-center justify-center gap-2 rounded-lg border border-purple-200 px-4 py-2.5 text-sm font-semibold text-purple-700 hover:bg-purple-50 disabled:opacity-50"><Sparkles size={16} /> Generate fresh quiz</button>}</div>
      {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {result && <div className="rounded-2xl bg-gray-900 p-6 text-white"><p className="text-sm text-gray-300">Your score</p><p className="mt-1 text-4xl font-bold">{result.percentage}%</p><p className="mt-2 text-sm text-gray-300">{result.score} of {result.total} answers correct. Your lesson progress has been updated.</p></div>}
      {questions.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center"><h2 className="text-xl font-semibold">No quiz yet</h2><p className="mt-2 text-sm text-gray-500">Generate a quiz from this lesson when you are ready.</p><button onClick={() => void loadQuiz(true)} className="mt-5 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white">Generate quiz</button></div> : <div className="space-y-4">{questions.map((question, index) => <section key={question.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><p className="text-sm font-semibold text-purple-600">Question {index + 1}</p><h2 className="mt-2 text-lg font-semibold text-gray-900">{question.question}</h2><div className="mt-5 space-y-2">{question.options.map((option) => <label key={option} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${answers[question.id] === option ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300"}`}><input type="radio" name={question.id} value={option} checked={answers[question.id] === option} disabled={Boolean(result)} onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))} className="accent-purple-600" />{option}</label>)}</div></section>)}{!result && <button onClick={() => void submitQuiz()} disabled={working} className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50">{working && <Loader2 className="animate-spin" size={16} />} Submit answers</button>}</div>}
      {result && <div className="space-y-3"><div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Review</h2><button type="button" onClick={() => { setAnswers({}); setResult(null); setError(""); }} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50"><RefreshCw size={15} /> Retry</button></div>{result.results.map((item) => <div key={item.quizId} className="rounded-xl border bg-white p-4"><div className="flex gap-3"><CheckCircle2 className={item.isCorrect ? "text-green-600" : "text-red-600"} size={18} /><div><p className="font-medium">{item.question}</p><p className="mt-1 text-sm text-gray-500">Your answer: {item.yourAnswer ?? "Not answered"}</p><p className="mt-1 text-sm text-gray-500">Correct answer: {item.correctAnswer}</p>{item.explanation && <p className="mt-2 text-sm text-gray-600">{item.explanation}</p>}</div></div></div>)}</div>}
    </div>
  );
}