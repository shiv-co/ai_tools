"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a text case converter?",
    a: "A text case converter changes the capitalization of your text into formats like uppercase, lowercase, title case, or sentence case."
  },
  {
    q: "How does this text case converter work?",
    a: "Simply paste or type your text, then click the desired case option. The conversion happens instantly in your browser."
  },
  {
    q: "Is my text uploaded or saved anywhere?",
    a: "No. All text processing happens locally in your browser. Your content is never uploaded or stored."
  },
  {
    q: "What is the difference between title case and sentence case?",
    a: "Title case capitalizes the first letter of each word, while sentence case capitalizes only the first letter of each sentence."
  },
  {
    q: "Is this text case converter free to use?",
    a: "Yes. This tool is completely free with no limits, registration, or watermarks."
  }
];


export default function TextCaseConverterPage() {
  const [text, setText] = useState("");

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());

  const toTitle = () => {
    setText(
      text
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    );
  };

  const toSentence = () => {
    setText(
      text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) =>
          char.toUpperCase()
        )
    );
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    alert("Text copied!");
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-14">

        {/* HEADER */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Text Case Converter
          </h1>
          <p className="text-[var(--text-secondary)]">
            Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly.
            Perfect for writing, coding, SEO, and social media.
          </p>
        </div>

        {/* MAIN AREA */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          {/* TEXT INPUT */}
          <div className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              rows={10}
              className="w-full rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5 text-sm leading-relaxed outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-opacity-20)]"
            />

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setText("")}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-opacity-10)]"
              >
                Clear
              </button>

              <button
                onClick={copyText}
                disabled={!text}
                className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Copy Text
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-1">

            <ActionButton label="UPPERCASE" onClick={toUpper} />
            <ActionButton label="lowercase" onClick={toLower} />
            <ActionButton label="Title Case" onClick={toTitle} />
            <ActionButton label="Sentence case" onClick={toSentence} />

          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid gap-6 sm:grid-cols-3">
          <InfoCard
            title="Writers & Students"
            text="Format essays, assignments, and notes quickly."
          />
          <InfoCard
            title="Developers"
            text="Fix casing issues in variable names or strings."
          />
          <InfoCard
            title="SEO & Social Media"
            text="Optimize titles and captions instantly."
          />
        </div>

        {/* SEO CONTENT */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-xl font-semibold">
            Free Online Text Case Converter
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This free text case converter allows you to instantly change your text
            to uppercase, lowercase, title case, or sentence case. It works entirely
            in your browser and does not store or upload your content.
          </p>
        </div>

        {/* FAQ */}
<div className="space-y-6">
  <h2 className="text-2xl font-bold">
    Frequently Asked Questions
  </h2>

  <div className="space-y-3">
    {faqs.map((item, index) => (
      <details
        key={index}
        className="group rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4"
      >
        <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
          {item.q}
          <span className="transition-transform group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
          {item.a}
        </p>
      </details>
    ))}
  </div>
</div>


      </section>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    })
  }}
/>

 <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Text Case Converter Online",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/text-case-converter",
            description:
              "Convert text to uppercase, lowercase, title case, or sentence case instantly in your browser.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />

    </main>
  );
}

/* =============================
   Small Components
============================= */

function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-4 text-center font-semibold transition hover:border-[var(--accent)] hover:bg-[var(--accent-opacity-10)]"
    >
      {label}
    </button>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        {text}
      </p>
    </div>
  );
}



