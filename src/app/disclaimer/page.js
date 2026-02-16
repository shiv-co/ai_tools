export default function DisclaimerPage() {
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
              Disclaimer
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Important Information & Disclosures
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              This page explains the limitations of the information provided on
              our website and clarifies our responsibilities.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-8">

          {/* CARD 1 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              1. General Information
            </h2>
            <p className="text-[var(--text-secondary)]">
              All information provided on this website is for general
              informational purposes only. While we strive to keep content
              accurate and up to date, we make no guarantees regarding
              completeness, reliability, or accuracy.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              2. No Professional Advice
            </h2>
            <p className="text-[var(--text-secondary)]">
              The content on this website should not be considered professional,
              legal, financial, or technical advice. Always consult a qualified
              professional before making decisions based on information found on
              this site.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              3. External Links Disclaimer
            </h2>
            <p className="text-[var(--text-secondary)]">
              Our website may contain links to third-party websites, tools, or
              services. We do not control or guarantee the accuracy, relevance,
              or reliability of information on external websites.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              4. Affiliate & Advertising Disclosure
            </h2>
            <p className="text-[var(--text-secondary)] mb-3">
              Some links on this website may be affiliate links. This means we
              may earn a commission if you make a purchase through those links,
              at no additional cost to you.
            </p>
            <p className="text-[var(--text-secondary)]">
              We may also display advertisements through services such as Google
              AdSense. Advertising partners may use cookies or similar
              technologies to display relevant ads.
            </p>
          </div>

          {/* CARD 5 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              5. Reviews & Comparisons Disclaimer
            </h2>
            <p className="text-[var(--text-secondary)]">
              Reviews, comparisons, and opinions expressed on this website are
              based on research, publicly available information, and personal
              analysis. Individual experiences may vary, and we encourage users
              to verify details independently before making decisions.
            </p>
          </div>

          {/* CARD 6 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              6. Free Tools Disclaimer
            </h2>
            <p className="text-[var(--text-secondary)]">
              Any free tools or utilities provided on this website are offered
              “as is” without warranties of any kind. We do not guarantee
              uninterrupted availability, accuracy of results, or suitability
              for specific purposes.
            </p>
          </div>

          {/* CARD 7 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-gradient-to-br from-[var(--surface-opacity-5)] to-transparent p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-[var(--text-secondary)]">
              Under no circumstances shall we be held liable for any direct,
              indirect, incidental, or consequential damages resulting from the
              use of this website, its content, or its tools.
            </p>
          </div>

          {/* CARD 8 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              8. Consent
            </h2>
            <p className="text-[var(--text-secondary)]">
              By using this website, you acknowledge that you have read,
              understood, and agreed to this Disclaimer.
            </p>
          </div>

          {/* CARD 9 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              9. Contact Information
            </h2>
            <p className="text-[var(--text-secondary)]">
              If you have any questions regarding this Disclaimer, please contact
              us through our Contact page.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
