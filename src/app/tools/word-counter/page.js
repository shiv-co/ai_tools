"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
  const FAQS = [
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
    {FAQS.map((item, index) => (
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
<section className="mt-24 space-y-10 max-w-4xl">
  <h2 className="text-2xl sm:text-3xl font-bold">
    Free Online Word Counter Tool
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Our Word Counter is a free online tool that instantly counts words,
    characters, sentences, and paragraphs in your text. Whether you are
    writing an essay, blog post, academic paper, or social media caption,
    knowing the exact word count helps you stay within limits and improve
    content quality.
  </p>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    This word counter works directly in your browser, meaning your text
    is never uploaded or stored. Everything happens locally on your device,
    ensuring full privacy and security.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    What Does This Word Counter Measure?
  </h2>

  <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
    <li>Total word count</li>
    <li>Character count (with and without spaces)</li>
    <li>Sentence count</li>
    <li>Paragraph count</li>
    <li>Reading time estimation</li>
  </ul>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    These metrics help writers, students, marketers, and professionals
    optimize their writing for different platforms and requirements.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    Why Use an Online Word Counter?
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Many platforms have strict word limits. For example, college essays,
    job applications, research abstracts, and blog posts often require
    specific word counts. Using an online word counter ensures you meet
    these requirements precisely.
  </p>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Social media platforms also limit characters. A character counter
    helps you craft posts that fit within those limits while maximizing
    engagement.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    How to Use the Word Counter Tool
  </h2>

  <ol className="list-decimal pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
    <li>Type or paste your text into the input area.</li>
    <li>The tool automatically calculates word and character counts.</li>
    <li>Review the statistics displayed instantly.</li>
    <li>Edit your text as needed to meet your target word count.</li>
  </ol>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    There is no need to click any button. The counting happens in real time.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    Who Can Benefit from This Tool?
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    This word counter is useful for:
  </p>

  <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
    <li>Students writing essays and assignments</li>
    <li>Bloggers optimizing articles for SEO</li>
    <li>Copywriters crafting advertisements</li>
    <li>Authors tracking manuscript length</li>
    <li>Social media managers writing captions</li>
  </ul>

  <h2 className="text-2xl sm:text-3xl font-bold">
    SEO & Content Optimization
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Search engines favor well-structured content with appropriate length.
    Knowing your word count helps you meet SEO guidelines and compete
    effectively in search rankings.
  </p>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Long-form content typically ranks better in competitive niches.
    A word counter ensures your article reaches optimal length without
    unnecessary repetition.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    Privacy-Focused Word Counter
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Unlike some online tools, this word counter does not store or transmit
    your text. All calculations occur in your browser. This makes it ideal
    for confidential documents and sensitive content.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    Frequently Asked Questions
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Many users ask whether online word counters are accurate. Our tool uses
    standard counting methods that match widely accepted definitions of words
    and characters.
  </p>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Another common question is whether formatting affects word count.
    Our counter analyzes raw text and provides consistent results regardless
    of styling.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    Related Tools You May Like
  </h2>

  <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed ">
    <li><Link href="/tools/text-case-converter" className="text-[var(--accent)] hover:underline">Text Case Converter</Link></li>
    <li><Link href="/tools/image-resizer" className="text-[var(--accent)] hover:underline">Image Resizer</Link></li>
    <li><Link href="/tools/image-compressor" className="text-[var(--accent)] hover:underline">Image Compressor</Link></li>
    <li><Link href="/tools/split-pdf" className="text-[var(--accent)] hover:underline">PDF Splitter</Link></li>
  </ul>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Explore more free tools designed to simplify writing, productivity,
    and file management.
  </p>
</section>


      </section>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map((item) => ({
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
      name: "Word Counter Online Tool",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      url: "https://aitechtactics.com/tools/word-counter",
      description:
        "Free online word counter to count words, characters, sentences, and paragraphs instantly.",
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



