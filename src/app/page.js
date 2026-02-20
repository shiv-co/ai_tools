import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[var(--bg)] text-[var(--text-primary)]">

      {/* ================= BACKGROUND EFFECT ================= */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--accent-opacity-10)] blur-3xl rounded-full opacity-40 animate-pulse" />
      </div>

      {/* ================= HERO ================= */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">

          <span className="px-4 py-1 rounded-full text-xs font-semibold bg-[var(--accent-opacity-10)] text-[var(--accent)] tracking-wider">
            🚀 All-in-One Online Tools Platform
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Powerful Online Tools.
            <span className="block bg-gradient-to-r from-[var(--accent)] to-blue-500 bg-clip-text text-transparent">
              Zero Installation Required.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl">
            Free PDF, Image, Text, Media and AI tools built for speed,
            privacy, and productivity. Everything works directly in your browser.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/tools"
              className="px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Explore Tools →
            </Link>

            <ThemeToggle />
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-[var(--text-secondary)]">
            <span>🔒 100% Private</span>
            <span>⚡ Instant Processing</span>
            <span>💸 Free Forever</span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED CATEGORIES ================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Our Most Popular Tool Categories
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "PDF Tools", desc: "Split, merge, reorder and convert PDFs.", link: "/tools/split-pdf" },
            { title: "Image Tools", desc: "Compress, resize and convert images.", link: "/tools/image-compressor" },
            { title: "Text Tools", desc: "Word counter and formatting tools.", link: "/tools/word-counter" },
            { title: "AI Tools", desc: "Resume builder and AI productivity tools.", link: "/tools/ai-resume-builder" }
          ].map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="group relative flex flex-col rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-opacity-60)] hover:shadow-lg hover:shadow-[var(--accent-opacity-10)] backdrop-blur"
            >
              <h3 className="text-xl font-semibold group-hover:text-[var(--accent)] transition">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                {item.desc}
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-[var(--accent)]">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[var(--surface-opacity-5)]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            Why Choose AI Tech Tactics?
          </h2>

          <div className="grid sm:grid-cols-3 gap-10">
            <div className="p-6 rounded-2xl hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg">Lightning Fast</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                All tools run instantly in your browser without server delays.
              </p>
            </div>

            <div className="p-6 rounded-2xl hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="font-semibold text-lg">Fully Private</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                Your files never leave your device. No uploads. No storage.
              </p>
            </div>

            <div className="p-6 rounded-2xl hover:shadow-lg transition">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-semibold text-lg">Built for Productivity</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                Designed to help students, creators, and professionals work smarter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold">
          Ready to Boost Your Productivity?
        </h2>

        <p className="mt-4 text-[var(--text-secondary)]">
          Start using our free tools today — no registration required.
        </p>

        <Link
          href="/tools"
          className="mt-8 inline-block px-10 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Get Started →
        </Link>
      </section>

    </main>
  );
}