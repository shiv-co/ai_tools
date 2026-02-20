"use client";
import Link from "next/link";
import Image from 'next/image';
import split_pdf from "../../../public/icons/partition.webp";
import merge_pdf from "../../../public/icons/merge_pdf.png";
import pdf_to_jpg from "../../../public/icons/pdf_to_jpg.webp";
import jpg_to_pdf from "../../../public/icons/jpg_to_pdf.webp";
import heic_to_jpg from "../../../public/icons/heic_to_jpg.webp";
import jpg_to_png from "../../../public/icons/jpg_to_png.webp";
import png_to_jpg from "../../../public/icons/png_to_jpg.webp";
import webp_to_jpg from "../../../public/icons/webp_to_jpg.webp";
import jpg_to_webp from "../../../public/icons/jpg_to_webp.webp";
import compression from "../../../public/icons/compression.webp";
import img_compress from "../../../public/icons/img_compress.webp";
import image_crop from "../../../public/icons/image_crop.webp";
import reorder_pages from "../../../public/icons/reorder_pages.webp";
import ai_resume from "../../../public/icons/ai_resume.webp";
import ai_students from "../../../public/icons/ai_students.webp";
import ai_developers from "../../../public/icons/ai_developer.webp";
import ai_business from "../../../public/icons/ai_business.webp";
import resize from "../../../public/icons/resize.webp";
import case_change from "../../../public/icons/case_change.webp";
import word_counter from "../../../public/icons/word_counter.webp";
import mp4_to_mp3 from "../../../public/icons/mp4_to_mp3.webp";
import { useState, useEffect } from "react";
/* =============================
   TOOL GROUPS
============================= */

const toolGroups = [
  {
    title: "PDF Tools",
    icon: "📄",
    description:
      "Split, merge, reorder, compress, and convert PDF files easily.",
    highlight: true,
    tools: [
      {
        title: "Split PDF",
        href: "/tools/split-pdf",
        icon: split_pdf,
        trending: true,
        description: "Extract specific pages from a PDF by range or selection instantly."
      },
      {
        title: "Merge PDF",
        href: "/tools/merge-pdf",
        trending: true,
        icon: merge_pdf,
        description: "Combine multiple PDF files into one document in seconds."
      },
      {
        title: "Reorder PDF Pages",
        href: "/tools/reorder-pdf",
        icon: reorder_pages,
        description: "Change page order visually and download the updated PDF."
      },
      {
        title: "Compress PDF",
        href: "/tools/compress-pdf",
        icon: compression,
        description: "Reduce PDF file size while maintaining quality."
      },
      {
        title: "PDF to JPG",
        href: "/tools/pdf-to-jpg",
        icon: pdf_to_jpg,
        description: "Convert each PDF page into high-quality JPG images."
      },
      {
        title: "JPG to PDF",
        href: "/tools/jpg-to-pdf",
        icon: jpg_to_pdf,
        description: "Turn JPG images into a downloadable PDF document."
      },
    ],
  },
  {
    title: "Image Tools",
    icon: "🖼️",
    description:
      "Compress, crop, resize, and convert images online.",
    tools: [
      {
        title: "Image Compressor",
        href: "/tools/image-compressor",
        icon: img_compress,
        trending: true,
        description: "Reduce image size without noticeable quality loss."
      },
      {
        title: "Image Cropper",
        href: "/tools/image-cropper",
        icon: image_crop,
        description: "Crop images to custom sizes or social media ratios."
      },
      {
        title: "Image Resizer",
        href: "/tools/image-resizer",
        icon: resize,
        description: "Resize images by pixels, percentage, or presets."
      },
      {
        title: "HEIC to JPG",
        href: "/tools/heic-to-jpg",
        icon: heic_to_jpg,
        description: "Convert HEIC photos into universally supported JPG format."
      },
      {
        title: "JPG to PNG",
        href: "/tools/jpg-to-png",
        icon: jpg_to_png,
        description: "Convert JPG images into PNG format instantly."
      },
      {
        title: "PNG to JPG",
        href: "/tools/png-to-jpg",
        icon: png_to_jpg,
        description: "Turn PNG images into compressed JPG files."
      },
      {
        title: "WebP to JPG",
        href: "/tools/webp-to-jpg",
        icon: webp_to_jpg,
        description: "Convert WebP images into JPG format easily."
      },
      {
        title: "JPG to WebP",
        href: "/tools/jpg-to-webp",
        icon: jpg_to_webp,
        description: "Convert JPG images into lightweight WebP format."
      },
    ],
  },
  {
    title: "Text Tools",
    icon: "✍️",
    description:
      "Analyze and format text for writing and SEO.",
    tools: [
      {
        title: "Word Counter",
        href: "/tools/word-counter",
        trending: true,
        icon: word_counter,
        description: "Count words, characters, sentences, and reading time."
      },
      {
        title: "Text Case Converter",
        href: "/tools/text-case-converter",
        icon: case_change,
        description: "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case."
      },
    ],
  },
  {
    title: "Media Tools",
    icon: "🎵",
    description:
      "Extract and convert media formats directly in your browser.",
    tools: [
      {
        title: "MP4 to MP3",
        href: "/tools/mp4-to-mp3",
        icon: mp4_to_mp3,
        description: "Extract high-quality MP3 audio from MP4 videos."
      }
    ],
  },
  {
    title: "AI Tools",
    icon: "🤖",
    description:
      "AI-powered productivity and writing tools.",
    tools: [
      // {
      //   title: "AI Resume Builder",
      //   href: "/tools/ai-resume-builder",
      //   icon: ai_resume,
      //   description: "Create professional, ATS-friendly resumes with AI."
      // },
      {
        title: "AI Tools for Students",
        href: "/tools/ai-tools-for-students",
        icon: ai_students,
        description: "AI tools for assignments, notes, and exam preparation."
      },
      {
        title: "AI Tools for Developers",
        href: "/tools/ai-tools-for-developers",
        icon: ai_developers,
        description: "Boost coding productivity with AI-powered helpers."
      },
      {
        title: "AI Tools for Business",
        href: "/tools/ai-tools-for-business",
        icon: ai_business,
        description: "AI tools for marketing, emails, and productivity."
      },
    ],
  },
];


/* =============================
   PAGE
============================= */

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentTools")) || [];
    setRecent(stored);
  }, []);

  const handleRecentUpdate = (tool) => {
    const existing =
      JSON.parse(localStorage.getItem("recentTools")) || [];

    const updated = [
      tool,
      ...existing.filter((t) => t.href !== tool.href),
    ].slice(0, 6);

    localStorage.setItem("recentTools", JSON.stringify(updated));
    setRecent(updated);
  };

  /* =============================
     FLATTEN ALL TOOLS
  ============================= */

  const flatTools = toolGroups.flatMap((group) =>
    group.tools.map((tool) => ({
      ...tool,
      category: group.title,
    }))
  );

  const filteredTools = flatTools.filter((tool) => {
    const matchesSearch = tool.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeTab === "All" || tool.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  const trendingTools = flatTools.filter((tool) => tool.trending);

  const showTrending = search === "" && activeTab === "All";

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 10% 10%, var(--accent-opacity-20), transparent 35%), radial-gradient(circle at 90% 0%, var(--accent-opacity-10), transparent 40%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Powerful Tools. <span className="text-[var(--accent)]">Zero Installation.</span>
          </h1>

          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Search and access browser-based tools instantly.
          </p>

          {/* SEARCH */}
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-5 py-3 text-sm focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          {/* FILTER TABS */}
          <div className="flex flex-wrap justify-center gap-3">
            {["All", ...toolGroups.map((g) => g.title)].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition 
                ${
                  activeTab === tab
                    ? "bg-[var(--accent)] text-white shadow-md"
                    : "border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] hover:border-[var(--accent)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      {showTrending && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
          <h2 className="text-2xl font-bold">🔥 Trending Tools</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingTools.map((tool) => (
              <ToolCard
                key={tool.href}
                tool={tool}
                onClick={() => handleRecentUpdate(tool)}
                highlight
              />
            ))}
          </div>
        </section>
      )}

      {/* RECENT */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
          <h2 className="text-2xl font-bold">🕘 Recently Used</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((tool) => (
              <ToolCard
                key={tool.href}
                tool={tool}
                onClick={() => handleRecentUpdate(tool)}
              />
            ))}
          </div>
        </section>
      )}

      {/* FILTERED RESULTS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24 space-y-6">
        <h2 className="text-2xl font-bold">
          {activeTab === "All" ? "All Tools" : activeTab}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.href}
              tool={tool}
              onClick={() => handleRecentUpdate(tool)}
            />
          ))}
        </div>
      </section>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Free Online Tools",
      "itemListElement": flatTools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": tool.title,
        // In a real implementation, you would replace 'yourdomain.com' with your actual domain name
        "url": `https://aitechtactics.com${tool.href}`,   
      })),
    }),
  }}
/>


    </main>
  );
}

/* =============================
   TOOL CARD
============================= */

// function ToolCard({ tool, onClick, highlight }) {
//   return (
//     <Link
//       href={tool.href}
//       onClick={onClick}
//       className={`group rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-xl
//       ${
//         highlight
//           ? "border-[var(--accent)] bg-[var(--accent-opacity-6)]"
//           : "border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)]"
//       }`}

//     >
//       <Image src={tool.icon} alt={`${tool.title} icon`} className="w-14 h-14 mb-4" />
//       <h3 className="font-semibold text-lg group-hover:text-[var(--accent)]">
//         {tool.title}
//       </h3>

//       <span className="mt-4 inline-block text-sm font-medium text-[var(--accent)]">
//         Launch →
//       </span>
//     </Link>
//   );
// }

function ToolCard({ tool, onClick, highlight }) {
  return (
    <Link
      href={tool.href}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300
      hover:-translate-y-2 hover:shadow-2xl
      ${
        highlight
          ? "border-[var(--accent)] bg-[var(--accent-opacity-6)]"
          : "border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)]"
      }`}
    >
      {/* Animated gradient glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, var(--accent-opacity-20), transparent 60%)",
        }}
      />

      {/* Shine effect */}
      <div className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Icon */}
        <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--surface-opacity-10)] backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-[var(--accent-opacity-10)]">
          {tool.icon ? (
            <Image
              src={tool.icon}
              alt={`${tool.title} icon`}
              width={40}
              height={40}
              className="object-contain"
            />
          ) : (
            <span className="text-xl font-bold text-[var(--accent)]">
              {tool.title.charAt(0)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold tracking-tight transition duration-300 group-hover:text-[var(--accent)]">
          {tool.title}
        </h3>

        {/* Description if exists */}
        {tool.description && (
          <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">
            {tool.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--accent)] transition group-hover:translate-x-1">
            Launch Tool →
          </span>

          <span className="text-xs uppercase tracking-widest text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition duration-300">
            Free
          </span>
        </div>
      </div>
    </Link>
  );
}