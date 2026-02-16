import Link from "next/link";

const posts = [
  {
    slug: "long-awaited-ai-technology-may-change-everything",
    title: "This Long-Awaited AI Technology May Finally Change Everything",
    excerpt:
      "A deep dive into the new generation of reasoning models, safety layers, and deployment patterns transforming how teams ship AI in production.",
    category: "AI Technology",
    readTime: "8 min read",
    date: "2026-01-18",
    displayDate: "Jan 18, 2026",
    author: "Ralph Edwards",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    tags: ["AI", "Infrastructure", "Safety"],
  },
  {
    slug: "best-free-ai-tools-for-students-2026",
    title: "Best Free AI Tools for Students in 2026 (Study Smarter, Not Harder)",
    excerpt:
      "From note-taking copilots to exam-prep tutors, these free AI tools help students learn faster and stay organised without breaking the bank.",
    category: "Students",
    readTime: "10 min read",
    date: "2026-01-15",
    displayDate: "Jan 15, 2026",
    author: "Courtney Henry",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    tags: ["Students", "Free Tools"],
  },
  {
    slug: "ai-content-stack-for-creators",
    title: "The 2026 AI Content Stack for Creators: From Idea to Upload",
    excerpt:
      "A complete workflow for YouTubers and content creators using AI for scripting, thumbnails, editing, and distribution.",
    category: "Creators",
    readTime: "12 min read",
    date: "2026-01-10",
    displayDate: "Jan 10, 2026",
    author: "Eleanor Pena",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    tags: ["Creators", "YouTube", "Workflow"],
  },
  {
    slug: "ai-playbook-for-small-businesses",
    title: "AI Playbook for Small Businesses: Automations That Actually Matter",
    excerpt:
      "Skip the hype and focus on practical AI automations that save time in marketing, support, and operations for small teams.",
    category: "Business",
    readTime: "9 min read",
    date: "2026-01-05",
    displayDate: "Jan 5, 2026",
    author: "Jacob Jones",
    image:
      "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1600&q=80",
    tags: ["Business", "Automation"],
  },
  {
    slug: "ai-coding-companions-compared",
    title: "AI Coding Companions Compared: Copilot, Cody, Codeium & More",
    excerpt:
      "How the leading AI coding assistants stack up for real-world development across languages, stacks, and team sizes.",
    category: "Developers",
    readTime: "11 min read",
    date: "2025-12-28",
    displayDate: "Dec 28, 2025",
    author: "Leslie Alexander",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    tags: ["Developers", "Code"],
  },
  {
    slug: "writing-with-ai-that-sounds-like-you",
    title: "Writing With AI That Still Sounds Like You",
    excerpt:
      "A practical guide to training AI systems on your voice, keeping outputs consistent with your brand while avoiding generic AI tone.",
    category: "Writing",
    readTime: "7 min read",
    date: "2025-12-20",
    displayDate: "Dec 20, 2025",
    author: "Arlene McCoy",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    tags: ["Writing", "Brand Voice"],
  },
];

// Newest first
const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const categories = ["All", "AI Technology", "Students", "Creators", "Business", "Developers", "Writing"];

export default function BlogIndexPage() {
  const latest = sortedPosts[0];
  const rest = sortedPosts.slice(1);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(80,105,231,0.18),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.16),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_45%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 lg:pb-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-opacity-5)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Insights, guides & playbooks for working with AI
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Deep-dive blog on{" "}
              <span className="text-[var(--accent)]">practical AI workflows</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
              Curated essays, breakdowns, and field notes on how students, creators, teams, and developers
              actually use AI tools to ship faster, learn quicker, and build better products.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                Weekly updates
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="h-2 w-2 rounded-full bg-[var(--border)]" />
                No clickbait, only real-world examples
              </div>
            </div>
          </div>

          {/* Right: Latest highlight */}
          <Link
            href={`/blog/${latest.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-opacity-5)] shadow-xl shadow-[var(--bg-opacity-5)] backdrop-blur"
          >
            <div className="relative h-52 sm:h-60 overflow-hidden">
              <img
                src={latest.image}
                alt={latest.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-opacity-10)] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  Latest from the blog
                </span>
                <span>
                  {latest.displayDate} · {latest.readTime}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold group-hover:text-[var(--accent)] transition-colors">
                {latest.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                {latest.excerpt}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-0 z-30 bg-[var(--bg)]/90 backdrop-blur border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`rounded-full border px-3 py-1 transition text-xs sm:text-sm ${
                  cat === "All"
                    ? "bg-[var(--accent)] text-white border-transparent"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-xs text-[var(--text-secondary)] hidden sm:block">
            Showing {sortedPosts.length} articles
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-opacity-5)] hover:border-[var(--accent)] transition shadow-sm hover:shadow-lg hover:shadow-[var(--accent-opacity-10)]"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/80">
                  <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur">
                    {post.category}
                  </span>
                  <span>
                    {post.displayDate} · {post.readTime}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 gap-3">
                <h3 className="text-base sm:text-lg font-semibold group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="h-6 w-6 rounded-full bg-[var(--border)] flex items-center justify-center text-[10px] font-semibold">
                      {post.author
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                    </span>
                    <span>{post.author}</span>
                  </div>
                  <span className="text-xs font-medium text-[var(--accent)] group-hover:translate-x-0.5 transition-transform">
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom SEO block */}
        <div className="mt-14 rounded-3xl border border-[var(--border)] bg-[var(--surface-opacity-5)] p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Why this AI blog?</h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base">
            Instead of generic AI news, this blog focuses on concrete workflows: how students actually pass exams
            faster with AI, how creators script and edit videos in half the time, how teams plug AI into real
            products, and how developers keep control over quality and safety. Every article is written to be
            immediately usable in your own day-to-day work.
          </p>
        </div>
      </section>
    </main>
  );
}

