import Link from "next/link";
import { notFound } from "next/navigation";

import SeoJsonLd from "@/components/SeoJsonLd";
import { buildMetadata, articleSchema, faqSchema } from "@/lib/seo";
import { comparisons, getComparisonBySlug } from "@/lib/comparisons-data";

const comparisonFaqs = [
  {
    q: "How should I choose between two AI tools?",
    a: "Start with workflow fit, integrations, and the tasks you perform most often. Raw features matter less than how well the tool matches your actual daily work.",
  },
  {
    q: "Do comparison pages include hands-on use cases?",
    a: "Yes. Each comparison focuses on common work patterns, not just feature lists, so readers can make a practical choice faster.",
  },
];

export async function generateStaticParams() {
  return comparisons.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const comparison = getComparisonBySlug(resolvedParams.slug);
  if (!comparison) return {};

  return buildMetadata({
    title: `${comparison.title} - Full Comparison`,
    description: comparison.description,
    path: `/comparisons/${comparison.slug}`,
    type: "article",
  });
}

export default async function ComparisonPage({ params }) {
  const resolvedParams = await params;
  const comparison = getComparisonBySlug(resolvedParams.slug);
  if (!comparison) return notFound();

  const relatedComparisons = comparisons.filter((item) => item.slug !== comparison.slug);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="relative overflow-hidden">
        <div className="hero-orb-background pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl space-y-6">
            <span className="inline-block rounded-full border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
              Comparison
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              {comparison.title}
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              {comparison.description}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
              <span>Updated: {comparison.updated}</span>
              <span>•</span>
              <span>{comparison.readTime}</span>
              <span>•</span>
              <span>{comparison.category}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <article className="space-y-10 article-content">
            <div>
              <h2>Overview</h2>
              <p>{comparison.overview}</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)]">
              <table className="min-w-full text-sm">
                <thead className="bg-[var(--surface-opacity-10)]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-left font-semibold">{comparison.title.split(" vs ")[0]}</th>
                    <th className="px-4 py-3 text-left font-semibold">{comparison.title.split(" vs ")[1]}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-opacity-70)]">
                  {comparison.table.map(([feature, first, second]) => (
                    <tr key={feature}>
                      <td className="px-4 py-3">{feature}</td>
                      <td className="px-4 py-3">{first}</td>
                      <td className="px-4 py-3">{second}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
                <h3 className="text-lg font-semibold text-[var(--accent)]">
                  {comparison.title.split(" vs ")[0]} strengths
                </h3>
                <ul className="mt-3 space-y-2 text-[var(--text-secondary)]">
                  {comparison.prosA.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
                <h3 className="text-lg font-semibold text-[var(--text-secondary)]">
                  {comparison.title.split(" vs ")[1]} strengths
                </h3>
                <ul className="mt-3 space-y-2 text-[var(--text-secondary)]">
                  {comparison.prosB.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-gradient-to-br from-[var(--surface-opacity-5)] to-transparent p-6">
              <h2>Final Verdict</h2>
              <p>{comparison.verdict}</p>
            </div>

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
              <h2>Helpful Next Steps</h2>
              <p className="text-[var(--text-secondary)]">
                After reading a comparison, the next useful step is usually trying a practical tool
                or reading a related guide. These links connect the comparison content to working
                tools and deeper blog content across the site.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {comparison.relatedTools.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2>Frequently Asked Questions</h2>
              {comparisonFaqs.map((item) => (
                <details
                  key={item.q}
                  className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4"
                >
                  <summary className="cursor-pointer font-medium list-none">{item.q}</summary>
                  <p className="mt-3 text-[var(--text-secondary)]">{item.a}</p>
                </details>
              ))}
            </div>

            <p className="text-xs text-[var(--text-secondary)]">
              This comparison is based on public information and practical workflow analysis. Product
              capabilities may change over time.
            </p>
          </article>

          <aside className="space-y-10 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
              <h3 className="text-lg font-semibold mb-4">More Comparisons</h3>
              <div className="space-y-3">
                {relatedComparisons.map((item) => (
                  <Link key={item.slug} href={`/comparisons/${item.slug}`} className="block hover:text-[var(--accent)]">
                    → {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Need a practical browser-based tool after comparing products?
              </p>
              <Link
                href="/tools"
                className="mt-4 inline-block rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Explore free tools
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <SeoJsonLd
        data={articleSchema({
          title: comparison.title,
          description: comparison.description,
          path: `/comparisons/${comparison.slug}`,
          datePublished: "2026-01-01",
          dateModified: "2026-01-01",
          author: "AI Tech Tactics Team",
          keywords: comparison.category,
        })}
      />
      <SeoJsonLd data={faqSchema(comparisonFaqs)} />
    </main>
  );
}
