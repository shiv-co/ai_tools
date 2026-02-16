export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Your Privacy, Explained Simply
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              We respect your privacy. This page explains what information we
              collect, why we collect it, and how it is used — in plain language.
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
              1. Information We Collect
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We collect only the information needed to run and improve our
              website.
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>• Information you provide (such as name or email via forms)</li>
              <li>• Basic usage data (browser type, pages visited, time spent)</li>
            </ul>
          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Your information helps us improve our platform and respond to you.
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>• Improve website functionality and content quality</li>
              <li>• Respond to messages and feedback</li>
              <li>• Monitor website performance and security</li>
            </ul>
          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              3. Cookies & Tracking Technologies
            </h2>
            <p className="text-[var(--text-secondary)]">
              We use cookies to understand how visitors interact with the site
              and to improve user experience. You can disable cookies at any time
              through your browser settings.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              4. Google AdSense & Advertising
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We display ads using Google AdSense. Google may use cookies to show
              ads based on your visits to this and other websites.
            </p>
            <p className="text-[var(--text-secondary)]">
              You can manage or opt out of personalized ads through Google’s ad
              settings.
            </p>
          </div>

          {/* CARD 5 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              5. Third-Party Services
            </h2>
            <p className="text-[var(--text-secondary)]">
              Our website may link to third-party websites or tools. We are not
              responsible for the privacy practices of those external sites.
              Please review their policies separately.
            </p>
          </div>

          {/* CARD 6 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              6. Children’s Privacy
            </h2>
            <p className="text-[var(--text-secondary)]">
              We do not knowingly collect personal information from children under
              the age of 13. If you believe a child has shared information with
              us, please contact us so we can remove it.
            </p>
          </div>

          {/* CARD 7 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-gradient-to-br from-[var(--surface-opacity-5)] to-transparent p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              7. Your Consent
            </h2>
            <p className="text-[var(--text-secondary)]">
              By using our website, you agree to this Privacy Policy and consent
              to the collection and use of information as described here.
            </p>
          </div>

          {/* CARD 8 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              8. Updates to This Policy
            </h2>
            <p className="text-[var(--text-secondary)]">
              We may update this Privacy Policy occasionally. Any changes will be
              posted on this page with immediate effect.
            </p>
          </div>

          {/* CARD 9 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              9. Contact Us
            </h2>
            <p className="text-[var(--text-secondary)]">
              If you have any questions about this Privacy Policy or how we handle
              data, please reach out through our Contact page.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
