const features = [
  {
    icon: "✨",
    title: "AI Course Creation",
    tone: "violet",
    description: "Generate complete courses with structured modules, lessons and learning paths instantly using AI."
  },
  {
    icon: "🤖",
    title: "Personal AI Tutor",
    tone: "blue",
    description: "Learn faster with an intelligent AI Tutor that explains concepts, answers questions and helps debug code."
  },
  {
    icon: "📝",
    title: "AI Quiz Generator",
    tone: "amber",
    description: "Create smart assessments and practice quizzes personalized for your learning journey."
  },
  {
    icon: "📊",
    title: "Learning Analytics",
    tone: "emerald",
    description: "Track your progress, identify improvements and understand your learning performance."
  },
  {
    icon: "🧩",
    title: "Lesson Practice",
    tone: "rose",
    description: "Strengthen your understanding with focused lesson practice and useful examples."
  },
  {
    icon: "🚀",
    title: "Personalized Learning",
    tone: "cyan",
    description: "Follow AI-powered learning paths designed around your goals and interests."
  }
];

export default function Features() {
  return (
    <section id="features" className="px-6 md:px-12 py-18">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Build, Learn & Grow
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-500 md:text-lg">
          From AI-powered course creation to intelligent tutoring and learning analytics, every feature is designed to accelerate your learning journey.
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-500 md:text-lg">
          Powerful AI-driven tools designed to help you create courses, learn efficiently, track your progress and achieve your goals—all in one platform.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`feature-card feature-card-${feature.tone} animate-fade-up rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm ring-1 ring-slate-200/80 transition duration-500 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="feature-card-icon mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-3xl shadow-sm ring-1 ring-slate-200/80">
              {feature.icon}
            </div>

            <h3 className="feature-card-title text-lg font-semibold">
              {feature.title}
            </h3>

            <p className="feature-card-description mt-3 text-sm leading-7 text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}