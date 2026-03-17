import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { comparisons } from "@/lib/comparisons-data";

export const metadata = buildMetadata({
  title: "Tech Comparisons | AI Tech Tactics",
  description:
    "Read practical AI and tech comparisons to evaluate features, integrations, workflow fit, and everyday usability.",
  path: "/comparisons",
});

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
