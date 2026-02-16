import Link from "next/link";

export default function ComparisonPage() {
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
          <div className="max-w-4xl space-y-6">
            <span className="inline-block rounded-full border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
              Comparison
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              ChatGPT vs Google Gemini
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              A detailed comparison based on features, performance, pricing,
              real-world usage, and expert analysis to help you choose the right tool.
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
              <span>Updated: Jan 2026</span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span>AI Tools</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">

          {/* ================= LEFT CONTENT ================= */}
          <article className="space-y-10 article-content">

            {/* INTRO */}
            <div>
              <h2>Overview</h2>
              <p>
                ChatGPT and Google Gemini are two of the most powerful AI assistants
                available today. While both are capable of generating text,
                answering questions, and assisting with productivity, their
                strengths and limitations differ significantly.
              </p>
            </div>

            {/* COMPARISON TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)]">
              <table className="min-w-full text-sm">
                <thead className="bg-[var(--surface-opacity-10)]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-left font-semibold">ChatGPT</th>
                    <th className="px-4 py-3 text-left font-semibold">Gemini</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-opacity-70)]">
                  <tr>
                    <td className="px-4 py-3">Primary Strength</td>
                    <td className="px-4 py-3">Conversational reasoning</td>
                    <td className="px-4 py-3">Search + multimodal integration</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Best Use Case</td>
                    <td className="px-4 py-3">Writing, coding, ideas</td>
                    <td className="px-4 py-3">Research, factual queries</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Pricing</td>
                    <td className="px-4 py-3">Free & Paid</td>
                    <td className="px-4 py-3">Free & Paid</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PROS / CONS */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
                <h3 className="text-lg font-semibold text-[var(--accent)]">
                  ChatGPT – Pros
                </h3>
                <ul className="mt-3 space-y-2 text-[var(--text-secondary)]">
                  <li>• Strong natural conversation</li>
                  <li>• Excellent for creative tasks</li>
                  <li>• Developer-friendly</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
                <h3 className="text-lg font-semibold text-[var(--text-secondary)]">
                  Gemini – Pros
                </h3>
                <ul className="mt-3 space-y-2 text-[var(--text-secondary)]">
                  <li>• Tight Google ecosystem integration</li>
                  <li>• Strong factual grounding</li>
                  <li>• Multimodal support</li>
                </ul>
              </div>
            </div>

            {/* VERDICT */}
            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-gradient-to-br from-[var(--surface-opacity-5)] to-transparent p-6">
              <h2>Final Verdict</h2>
              <p>
                If you prioritize creativity, writing, and conversation,
                ChatGPT is the better choice. If research, real-time information,
                and Google services matter more, Gemini may suit you better.
              </p>
            </div>

            {/* DISCLAIMER */}
            <p className="text-xs text-[var(--text-secondary)]">
              This comparison is based on publicly available information,
              hands-on testing, and expert analysis. Features and pricing may
              change over time.
            </p>
          </article>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside className="space-y-10 lg:sticky lg:top-24">

            {/* YOU MAY LIKE */}
            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
              <h3 className="text-lg font-semibold mb-4">You May Like</h3>
              <div className="space-y-3">
                <Link href="/comparisons/chatgpt-vs-claude" className="block hover:text-[var(--accent)]">
                  → ChatGPT vs Claude
                </Link>
                <Link href="/comparisons/gemini-vs-copilot" className="block hover:text-[var(--accent)]">
                  → Gemini vs Copilot
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Want a side-by-side interactive comparison?
              </p>
              <Link
                href="/compare"
                className="mt-4 inline-block rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Try Comparison Tool
              </Link>
            </div>

          </aside>
        </div>
      </section>
    </main>
  );
}
