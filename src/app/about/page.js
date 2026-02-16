import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, var(--accent-opacity-16), transparent 35%), radial-gradient(circle at 80% 0%, var(--accent-opacity-10), transparent 35%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block rounded-full border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
              About Us
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Helping People Discover the Right
              <span className="block text-[var(--accent)]">
                Tech, AI & Digital Tools
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              We build practical guides, honest comparisons, and free tools to
              help individuals and businesses make smarter technology decisions.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">

          {/* LEFT CONTENT */}
          <div className="space-y-10 article-content">

            <div className="space-y-4">
              <h2>Who We Are</h2>
              <p>
                We are an independent technology platform focused on simplifying
                complex tools and products. Our goal is to make technology
                understandable, comparable, and genuinely useful for everyone —
                from students and creators to professionals and businesses.
              </p>
              <p>
                Instead of hype, we focus on clarity. Instead of promotions, we
                focus on value. Every article, comparison, and tool is created
                with real-world use in mind.
              </p>
            </div>

            <div className="space-y-4">
              <h2>What We Do</h2>
              <ul>
                <li>Publish in-depth blogs on AI, tech, and digital tools</li>
                <li>Create honest product and software comparisons</li>
                <li>Build free online tools to improve productivity</li>
                <li>Explain technology using simple, human language</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2>How We Create Content</h2>
              <p>
                Our content is based on research, hands-on testing, and analysis
                of trusted sources such as documentation, expert reviews, and
                real user feedback.
              </p>
              <p>
                When we reference opinions from industry experts or influencers,
                we summarize insights in our own words and clearly credit the
                source. We never copy or republish third-party content.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
              <h2>Our Mission</h2>
              <p>
                To empower people with accurate information, transparent
                comparisons, and free tools — so they can choose technology with
                confidence.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE CARDS */}
          <aside className="space-y-8">

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 shadow-lg shadow-[var(--bg-opacity-5)]">
              <h3 className="text-lg font-semibold mb-3">
                What Makes Us Different
              </h3>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li>• Independent and unbiased content</li>
                <li>• No paid rankings or hidden promotions</li>
                <li>• User-first design and tools</li>
                <li>• Focus on clarity over complexity</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-gradient-to-br from-[var(--surface-opacity-5)] to-transparent p-6">
              <h3 className="text-lg font-semibold mb-2">
                Transparency & Trust
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Some links on this site may be affiliate links. This helps support
                our work at no extra cost to you. Our opinions and comparisons
                always remain independent.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Have a question, suggestion, or feedback?
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Contact Us
              </Link>
            </div>

          </aside>
        </div>
      </section>
    </main>
  );
}
