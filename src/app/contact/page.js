import Link from "next/link";

export default function ContactPage() {
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
              Contact Us
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Get in Touch With Us
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              Have a question, suggestion, feedback, or collaboration request?
              We’d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">

          {/* CONTACT FORM */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8 shadow-xl shadow-[var(--bg-opacity-5)]">
            <h2 className="text-2xl font-semibold mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[var(--border-opacity-80)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent-opacity-60)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-[var(--border-opacity-80)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent-opacity-60)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-xl border border-[var(--border-opacity-80)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent-opacity-60)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full rounded-xl border border-[var(--border-opacity-80)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent-opacity-60)]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT INFO PANEL */}
          <aside className="space-y-8">

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
              <h3 className="text-lg font-semibold mb-3">
                What Can You Contact Us For?
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                <li>• General questions about our content</li>
                <li>• Suggestions for new tools or features</li>
                <li>• Reporting issues or inaccuracies</li>
                <li>• Collaboration or partnership inquiries</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-gradient-to-br from-[var(--surface-opacity-5)] to-transparent p-6">
              <h3 className="text-lg font-semibold mb-2">
                Transparency Notice
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                We do not offer customer support for third-party products listed
                on this site. For product-specific issues, please contact the
                respective provider directly.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6">
              <h3 className="text-lg font-semibold mb-2">
                Important Pages
              </h3>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="/about" className="hover:text-[var(--accent)]">
                  About Us
                </Link>
                <Link href="/privacy-policy" className="hover:text-[var(--accent)]">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-[var(--accent)]">
                  Terms & Conditions
                </Link>
                <Link href="/disclaimer" className="hover:text-[var(--accent)]">
                  Disclaimer
                </Link>
              </div>
            </div>

          </aside>
        </div>
      </section>
    </main>
  );
}
