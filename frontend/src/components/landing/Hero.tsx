import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[620px] flex items-center justify-center text-center px-6">
      <div className="max-w-5xl">
        <h2 className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-semibold tracking-wide text-transparent md:text-3xl">
          AI Powered Learning Platform
        </h2>

        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Build Complete Courses
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
            with AI
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-gray-500 md:text-lg">
          Create complete courses, generate lessons,
          build quizzes and get personalized learning
          assistance with artificial intelligence.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/register"
            className="rounded-full bg-black px-7 py-3 text-base text-white transition hover:scale-105"
          >
            Start Building
          </Link>

          <Link
            href="/courses"
            className="rounded-full border px-7 py-3 text-base transition hover:bg-gray-100"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
}