export default function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-20">
      <div className="max-w-5xl mx-auto">

        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Transforming the Future of{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Learning with AI
            </span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-600 leading-8">
            AI Course Builder is a modern learning platform that uses artificial
            intelligence to help students, educators and professionals create
            structured courses, interactive lessons and personalized learning
            experiences—all from a single intelligent workspace.
          </p>
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-8 shadow-sm">

          <div className="grid items-center gap-10 md:grid-cols-2">

            <div>

              <h3 className="text-3xl font-bold leading-tight">
                Everything you need to create,
                learn and grow smarter.
              </h3>

              <p className="mt-5 text-base text-gray-600 leading-8">
                Generate complete courses, learn with an intelligent AI tutor,
                create quizzes automatically and monitor your progress with
                powerful analytics designed for modern learners.
              </p>

            </div>

            <div className="flex justify-center">

              <div className="flex h-60 w-full max-w-sm flex-col items-center justify-center rounded-2xl bg-white shadow-lg">

                <div className="text-6xl">
                  🤖
                </div>

                <h4 className="mt-5 text-xl font-bold">
                  AI Tutor
                </h4>

                <p className="mt-2 px-6 text-center text-sm leading-7 text-gray-500">
                  Your intelligent companion for understanding, practicing and growing.
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">

          <div className="text-center">

            <h3 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-5xl font-extrabold text-transparent">
              10K+
            </h3>

            <p className="mt-2 text-lg font-semibold">
              Courses Built
            </p>

            <p className="mt-2 text-sm text-gray-500">
              AI-generated learning experiences.
            </p>

          </div>

          <div className="text-center">

            <h3 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-5xl font-extrabold text-transparent">
              24/7
            </h3>

            <p className="mt-2 text-lg font-semibold">
              AI Tutor
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Instant guidance whenever you need it.
            </p>

          </div>

          <div className="text-center">

            <h3 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-5xl font-extrabold text-transparent">
              Smart
            </h3>

            <p className="mt-2 text-lg font-semibold">
              Analytics
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Track progress and improve continuously.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}