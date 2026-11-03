export default function About() {
  return (
    <section id="about" className="about-section px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="about-kicker text-sm font-bold uppercase tracking-[0.2em]">
              A better way to learn
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Turn curiosity into{" "}
              <span className="about-gradient-text">real progress.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
              Skill Forge brings course creation, focused lessons, practice,
              progress tracking and AI guidance into one calm workspace built
              for consistent learning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Learn at your pace", "Practice with purpose", "Keep your momentum"].map((item) => (
                <span key={item} className="about-pill rounded-full px-4 py-2 text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="about-panel rounded-3xl p-6 shadow-xl transition duration-500 hover:-translate-y-1 md:p-8">
            <div className="flex items-center justify-between">
              <span className="about-panel-label text-sm font-semibold">Your learning workspace</span>
              <span className="about-status rounded-full px-3 py-1 text-xs font-bold">In focus</span>
            </div>
            <div className="mt-8 space-y-4">
              <div className="about-row rounded-2xl p-4">
                <span className="text-2xl">🧭</span>
                <span><strong className="block">Structured courses</strong><small>Clear paths from first concept to confident practice.</small></span>
              </div>
              <div className="about-row rounded-2xl p-4">
                <span className="text-2xl">💬</span>
                <span><strong className="block">One helpful Tutor</strong><small>Ask questions, debug ideas and keep the context.</small></span>
              </div>
              <div className="about-row rounded-2xl p-4">
                <span className="text-2xl">📈</span>
                <span><strong className="block">Visible progress</strong><small>See what you have completed and what comes next.</small></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}