"use client";

import { useState, useMemo } from "react";
  const faqs = [
  {
    q: "How does the word counter work?",
    a: "The word counter analyzes your text in real time and counts words based on spaces. It also calculates characters, sentences, paragraphs, and estimated reading time."
  },
  {
    q: "Is my text uploaded to a server?",
    a: "No. All text processing happens directly in your browser. Your content is never uploaded or stored."
  },
  {
    q: "Does this tool count characters without spaces?",
    a: "Yes. It shows both total characters and characters excluding spaces."
  },
  {
    q: "How accurate is the reading time?",
    a: "Reading time is estimated using an average speed of 200 words per minute, which is standard for most readers."
  },
  {
    q: "Is this word counter free to use?",
    a: "Yes. This tool is completely free with no sign-up, limits, or watermarks."
  }
];

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();

    const words = trimmed
      ? trimmed.split(/\s+/).filter(Boolean).length
      : 0;

    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, "").length;

    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).filter(Boolean).length
      : 0;

    const paragraphs = trimmed
      ? trimmed.split(/\n+/).filter(Boolean).length
      : 0;

    const readingTime = Math.ceil(words / 200); // avg 200 wpm

    return {
      words,
      characters,
      charactersNoSpace,
      sentences,
      paragraphs,
      readingTime,
    };
  }, [text]);




  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-14">

        {/* HEADER */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Word Counter
          </h1>
          <p className="text-[var(--text-secondary)]">
            Count words, characters, sentences, and paragraphs instantly.
            Perfect for essays, blogs, SEO, and social media.
          </p>
        </div>

        {/* INPUT AREA */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          {/* TEXTAREA */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
                rows={10}
                className="w-full rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5 text-sm leading-relaxed outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-opacity-20)]"
              />

              {text && (
                <button
                  onClick={() => setText("")}
                  className="absolute right-4 top-4 rounded-lg border px-3 py-1 text-xs font-medium hover:bg-[var(--surface-opacity-10)]"
                >
                  Clear
                </button>
              )}
            </div>

            <p className="text-xs text-[var(--text-secondary)]">
              Tip: Your text is processed locally. Nothing is stored or uploaded.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">

            <StatCard label="Words" value={stats.words} highlight />
            <StatCard label="Characters" value={stats.characters} />
            <StatCard label="Characters (no spaces)" value={stats.charactersNoSpace} />
            <StatCard label="Sentences" value={stats.sentences} />
            <StatCard label="Paragraphs" value={stats.paragraphs} />
            <StatCard label="Reading time" value={`${stats.readingTime} min`} />

          </div>
        </div>
  


        {/* INFO CARDS */}
        <div className="grid gap-6 sm:grid-cols-3">
          <InfoCard
            title="Writers & Students"
            text="Meet essay and assignment word limits easily."
          />
          <InfoCard
            title="SEO & Blogging"
            text="Optimize content length for better rankings."
          />
          <InfoCard
            title="Private & Fast"
            text="Everything runs inside your browser."
          />
        </div>

        {/* SEO TEXT */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-xl font-semibold">
            Online Word Counter Tool
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This free online word counter helps you instantly calculate the
            number of words, characters, sentences, and paragraphs in your text.
            It is useful for writers, students, bloggers, and SEO professionals
            who need accurate text statistics.
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
    </main>
  );
}

/* =============================
   Small Components
============================= */

function StatCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4 text-center transition ${
        highlight
          ? "border-[var(--accent)] shadow-lg shadow-[var(--accent-opacity-10)]"
          : ""
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold">
        {value}
      </p>
    </div>
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

