import Link from "next/link";

const comparisons = [
  {
    title: "ChatGPT vs Google Gemini",
    slug: "chatgpt-vs-gemini",
    description:
      "A detailed comparison of two leading AI assistants based on features, pricing, and real-world usage.",
  },
  {
    title: "ChatGPT vs Claude",
    slug: "chatgpt-vs-claude",
    description:
      "Which AI model is better for writing, reasoning, and long conversations?",
  },
  {
    title: "Gemini vs Microsoft Copilot",
    slug: "gemini-vs-copilot",
    description:
      "Comparing Google Gemini and Microsoft Copilot for productivity and research tasks.",
  },
];

export default function ComparisonsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              Tech & AI Comparisons
            </h1>
            <p className="text-[var(--text-secondary)]">
              Honest, research-backed comparisons to help you choose the right
              tools and technology.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {comparisons.map(item => (
              <Link
                key={item.slug}
                href={`/comparisons/${item.slug}`}
                className="group rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 transition hover:-translate-y-1 hover:border-[var(--accent-opacity-60)] hover:shadow-lg hover:shadow-[var(--accent-opacity-10)]"
              >
                <h2 className="text-lg font-semibold group-hover:text-[var(--accent)]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {item.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-[var(--accent)]">
                  Read comparison →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
