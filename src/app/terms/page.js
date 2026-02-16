export default function TermsPage() {
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
              Terms & Conditions
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Terms of Use
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              These Terms & Conditions govern your use of our website, content,
              tools, and services. Please read them carefully.
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
              1. Acceptance of Terms
            </h2>
            <p className="text-[var(--text-secondary)]">
              By accessing or using this website, you agree to be bound by these
              Terms & Conditions. If you do not agree with any part of these
              terms, please discontinue use of the website.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              2. Use of Website
            </h2>
            <p className="text-[var(--text-secondary)] mb-3">
              You agree to use this website only for lawful purposes and in a way
              that does not infringe the rights of others or restrict their use
              of the website.
            </p>
            <p className="text-[var(--text-secondary)]">
              Unauthorized use of this website may result in termination of
              access.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              3. Content Accuracy
            </h2>
            <p className="text-[var(--text-secondary)]">
              While we strive to provide accurate and up-to-date information, we
              do not guarantee the completeness, reliability, or accuracy of any
              content published on this website.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              4. Intellectual Property
            </h2>
            <p className="text-[var(--text-secondary)]">
              All content on this website, including text, graphics, logos, and
              design elements, is the intellectual property of the website owner
              unless otherwise stated and may not be copied or reproduced without
              prior permission.
            </p>
          </div>

          {/* CARD 5 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              5. Tools & Utilities
            </h2>
            <p className="text-[var(--text-secondary)]">
              Any free tools or utilities provided on this website are offered on
              an “as is” basis. We do not guarantee the accuracy, reliability, or
              availability of these tools and reserve the right to modify or
              discontinue them at any time.
            </p>
          </div>

          {/* CARD 6 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              6. External Links
            </h2>
            <p className="text-[var(--text-secondary)]">
              This website may contain links to external websites or services.
              We are not responsible for the content, policies, or practices of
              any third-party websites.
            </p>
          </div>

          {/* CARD 7 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              7. Advertising & Affiliates
            </h2>
            <p className="text-[var(--text-secondary)]">
              This website may display advertisements and affiliate links,
              including those provided by Google AdSense. We may earn a
              commission from qualifying actions at no additional cost to you.
            </p>
          </div>

          {/* CARD 8 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-gradient-to-br from-[var(--surface-opacity-5)] to-transparent p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              8. Limitation of Liability
            </h2>
            <p className="text-[var(--text-secondary)]">
              We shall not be liable for any direct, indirect, incidental, or
              consequential damages arising out of your use of this website or
              reliance on its content or tools.
            </p>
          </div>

          {/* CARD 9 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              9. Changes to These Terms
            </h2>
            <p className="text-[var(--text-secondary)]">
              We reserve the right to update or modify these Terms & Conditions at
              any time. Changes will be effective immediately upon posting on
              this page.
            </p>
          </div>

          {/* CARD 10 */}
          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-3">
              10. Contact Information
            </h2>
            <p className="text-[var(--text-secondary)]">
              If you have any questions regarding these Terms & Conditions,
              please contact us through our Contact page.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
