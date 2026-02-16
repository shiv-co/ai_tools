import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text-primary)]">

      {/* ================= HERO SECTION ================= */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-sm text-[var(--accent)] font-medium">
            🔥 Hot Tool
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Discover Free AI Tools That Can
            <span className="block text-[var(--accent)]">
              Boost Your Productivity
            </span>
          </h1>

          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            Curated AI tools for students, creators, developers and businesses.
            Save time, work smarter and grow faster.
          </p>

          <div className="flex items-center gap-4">
            <button className="px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition">
              Explore Tools →
            </button>

            <ThemeToggle />
          </div>
        </div>
      </section>

      {/* ================= FEATURED TOOLS ================= */}
      <section className="mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Featured AI Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "AI Resume Builder",
            "AI Caption Generator",
            "AI Prompt Generator",
          ].map((tool) => (
            <div
              key={tool}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 hover:shadow-md transition"
            >
              <span className="text-xs text-[var(--accent)] font-medium">
                Free Tool
              </span>

              <h3 className="mt-2 font-semibold text-lg">
                {tool}
              </h3>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Generate high-quality results using AI in seconds.
              </p>

              <button className="mt-4 text-sm font-medium text-[var(--accent)]">
                Use Tool →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= POPULAR TOOLS ================= */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Popular Tools
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Chatbot AI",
            "AI Image Generator",
            "AI Email Writer",
            "AI Code Helper",
          ].map((item) => (
            <div
              key={item}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center text-sm font-medium hover:bg-[var(--border)] transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= LATEST ARTICLES ================= */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Latest Articles
        </h2>

        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((post) => (
            <article
              key={post}
              className="flex flex-col sm:flex-row gap-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4"
            >
              <div className="sm:w-48 h-32 bg-[var(--border)] rounded-lg" />

              <div className="flex-1">
                <span className="text-xs text-[var(--text-secondary)]">
                  AI Tools • 2 days ago
                </span>

                <h3 className="mt-1 font-semibold text-lg">
                  Best Free AI Tools You Should Try in 2026
                </h3>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  A curated list of powerful AI tools that can help you save time and improve productivity.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="mt-24 mb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold">
          Don’t Want to Miss New AI Tools?
        </h2>

        <p className="mt-2 text-[var(--text-secondary)]">
          Get weekly updates on the latest and best AI tools.
        </p>

        <form className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] outline-none"
          />
          <button className="px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium">
            Subscribe
          </button>
        </form>
      </section>

    </main>
  );
}
