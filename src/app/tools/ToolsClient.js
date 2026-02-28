"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import split_pdf      from "../../../public/icons/partition.webp";
import merge_pdf      from "../../../public/icons/merge_pdf.png";
import pdf_to_jpg     from "../../../public/icons/pdf_to_jpg.webp";
import jpg_to_pdf     from "../../../public/icons/jpg_to_pdf.webp";
import heic_to_jpg    from "../../../public/icons/heic_to_jpg.webp";
import jpg_to_png     from "../../../public/icons/jpg_to_png.webp";
import png_to_jpg     from "../../../public/icons/png_to_jpg.webp";
import webp_to_jpg    from "../../../public/icons/webp_to_jpg.webp";
import jpg_to_webp    from "../../../public/icons/jpg_to_webp.webp";
import compression    from "../../../public/icons/compression.webp";
import img_compress   from "../../../public/icons/img_compress.webp";
import image_crop     from "../../../public/icons/image_crop.webp";
import reorder_pages  from "../../../public/icons/reorder_pages.webp";
import ai_students    from "../../../public/icons/ai_students.webp";
import ai_developers  from "../../../public/icons/ai_developer.webp";
import ai_business    from "../../../public/icons/ai_business.webp";
import resize         from "../../../public/icons/resize.webp";
import case_change    from "../../../public/icons/case_change.webp";
import word_counter   from "../../../public/icons/word_counter.webp";
import mp4_to_mp3     from "../../../public/icons/mp4_to_mp3.webp";

/* ─────────────────────────────────────────────────────────────────────────────
   TOOL DATA
───────────────────────────────────────────────────────────────────────────── */
const toolGroups = [
  {
    id:          "pdf",
    title:       "PDF Tools",
    icon:        "📄",
    accent:      "#e85d4a",
    accentSoft:  "rgba(232,93,74,0.10)",
    description: "Split, merge, reorder, compress, and convert PDFs.",
    tools: [
      { title: "Split PDF",         href: "/tools/split-pdf",       icon: split_pdf,      trending: true,  description: "Extract pages by range or selection instantly." },
      { title: "Merge PDF",         href: "/tools/merge-pdf",       icon: merge_pdf,       trending: true,  description: "Combine multiple PDFs into one document." },
      { title: "Reorder PDF Pages", href: "/tools/reorder-pdf",     icon: reorder_pages,               description: "Rearrange pages visually and download." },
      { title: "Compress PDF",      href: "/tools/compress-pdf",    icon: compression,                description: "Shrink PDF size while keeping quality." },
      { title: "PDF to JPG",        href: "/tools/pdf-to-jpg",      icon: pdf_to_jpg,                  description: "Convert each page into a high-quality JPG." },
      { title: "JPG to PDF",        href: "/tools/jpg-to-pdf",      icon: jpg_to_pdf,                  description: "Turn JPG images into a PDF document." },
    ],
  },
  {
    id:          "image",
    title:       "Image Tools",
    icon:        "🖼️",
    accent:      "#5069e7",
    accentSoft:  "rgba(80,105,231,0.10)",
    description: "Compress, crop, resize and convert images.",
    tools: [
      { title: "Image Compressor", href: "/tools/image-compressor", icon: img_compress,   trending: true,  description: "Reduce file size without quality loss." },
      { title: "Image Cropper",    href: "/tools/image-cropper",    icon: image_crop,                  description: "Crop to custom sizes or social ratios." },
      { title: "Image Resizer",    href: "/tools/image-resizer",    icon: resize,                      description: "Resize by pixels, percentage, or presets." },
      { title: "HEIC to JPG",      href: "/tools/heic-to-jpg",      icon: heic_to_jpg,                 description: "Convert iPhone HEIC photos to JPG." },
      { title: "JPG to PNG",       href: "/tools/jpg-to-png",       icon: jpg_to_png,                  description: "Convert JPG images to PNG instantly." },
      { title: "PNG to JPG",       href: "/tools/png-to-jpg",       icon: png_to_jpg,                  description: "Turn PNG files into compressed JPGs." },
      { title: "WebP to JPG",      href: "/tools/webp-to-jpg",      icon: webp_to_jpg,                 description: "Convert WebP images to JPG format." },
      { title: "JPG to WebP",      href: "/tools/jpg-to-webp",      icon: jpg_to_webp,                 description: "Convert JPGs to lightweight WebP." },
    ],
  },
  {
    id:          "text",
    title:       "Text Tools",
    icon:        "✍️",
    accent:      "#10b981",
    accentSoft:  "rgba(16,185,129,0.10)",
    description: "Analyze and format text for writing and SEO.",
    tools: [
      { title: "Word Counter",         href: "/tools/word-counter",         icon: word_counter, trending: true, description: "Count words, characters, sentences, and reading time." },
      { title: "Text Case Converter",  href: "/tools/text-case-converter",  icon: case_change,             description: "UPPERCASE, lowercase, Title Case, Sentence case." },
    ],
  },
  {
    id:          "media",
    title:       "Media Tools",
    icon:        "🎵",
    accent:      "#f59e0b",
    accentSoft:  "rgba(245,158,11,0.10)",
    description: "Extract and convert media directly in your browser.",
    tools: [
      { title: "MP4 to MP3", href: "/tools/mp4-to-mp3", icon: mp4_to_mp3, description: "Extract high-quality MP3 audio from MP4 videos." },
    ],
  },
  {
    id:          "ai",
    title:       "AI Tools",
    icon:        "🤖",
    accent:      "#8b5cf6",
    accentSoft:  "rgba(139,92,246,0.10)",
    description: "AI-powered productivity and writing tools.",
    tools: [
      { title: "AI Tools for Students",   href: "/tools/ai-tools-for-students",   icon: ai_students,   description: "Assignments, notes, and exam preparation." },
      { title: "AI Tools for Developers", href: "/tools/ai-tools-for-developers", icon: ai_developers, description: "Boost coding productivity with AI helpers." },
      { title: "AI Tools for Business",   href: "/tools/ai-tools-for-business",   icon: ai_business,   description: "Marketing, emails, and productivity." },
    ],
  },
];

const flatTools = toolGroups.flatMap((g) =>
  g.tools.map((t) => ({ ...t, category: g.title, groupId: g.id, accent: g.accent, accentSoft: g.accentSoft }))
);

const trendingTools = flatTools.filter((t) => t.trending);

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function ToolsPage() {
  const [search,     setSearch]     = useState("");
  const [activeTab,  setActiveTab]  = useState("All");
  const [recent,     setRecent]     = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentTools")) || [];
      setRecent(stored);
    } catch {}
  }, []);

  const handleToolClick = (tool) => {
    try {
      const existing = JSON.parse(localStorage.getItem("recentTools")) || [];
      const updated  = [tool, ...existing.filter((t) => t.href !== tool.href)].slice(0, 6);
      localStorage.setItem("recentTools", JSON.stringify(updated));
      setRecent(updated);
    } catch {}
  };

  // ── Derived state ─────────────────────────────────────────
  const isSearching   = search.trim().length > 0;
  const isFiltering   = activeTab !== "All";
  const showDefault   = !isSearching && !isFiltering;  // show trending + groups
  const showRecent    = showDefault && recent.length > 0;

  const filteredTools = flatTools.filter((tool) => {
    const q           = search.toLowerCase();
    const matchSearch = !isSearching || tool.title.toLowerCase().includes(q) || tool.description?.toLowerCase().includes(q);
    const matchCat    = !isFiltering || tool.category === activeTab;
    return matchSearch && matchCat;
  });

  const tabs = ["All", ...toolGroups.map((g) => g.title)];

  // total tool count
  const totalTools = flatTools.length;

  return (
    <>
      <style>{`
        /* ── Fonts ──────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        .tp-root {
          --tp-ff-head: 'Syne', sans-serif;
          --tp-ff-body: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text-primary);
          font-family: var(--tp-ff-body);
        }

        /* ── HERO ───────────────────────────────────────── */
        .tp-hero {
          position: relative;
          overflow: hidden;
          padding: 72px 24px 60px;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        .tp-hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 70% at 15% 0%, rgba(80,105,231,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 85% 0%, rgba(139,92,246,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 100%, rgba(16,185,129,0.07) 0%, transparent 60%);
        }
        /* subtle grid pattern */
        .tp-hero-grid {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
          background-image: linear-gradient(var(--text-primary) 1px, transparent 1px),
                            linear-gradient(90deg, var(--text-primary) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .tp-hero-inner {
          position: relative;
          max-width: 700px;
          margin: 0 auto;
        }
        .tp-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--tp-ff-head);
          font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          color: var(--accent);
          background: var(--accent-opacity-10, rgba(80,105,231,0.10));
          border: 1px solid var(--accent-opacity-20, rgba(80,105,231,0.20));
          padding: 5px 14px; border-radius: 999px;
          margin-bottom: 22px;
        }
        .tp-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          animation: tp-pulse 2s ease-in-out infinite;
        }
        @keyframes tp-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .tp-hero-title {
          font-family: var(--tp-ff-head);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .tp-hero-title span { color: var(--accent); }
        .tp-hero-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 32px;
        }

        /* ── SEARCH ─────────────────────────────────────── */
        .tp-search-wrap {
          position: relative;
          max-width: 520px;
          margin: 0 auto 24px;
        }
        .tp-search-icon {
          position: absolute; left: 18px; top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          pointer-events: none;
        }
        .tp-search-clear {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: var(--border);
          border: none; cursor: pointer;
          width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary);
          transition: background 0.15s;
        }
        .tp-search-clear:hover { background: var(--accent); color: #fff; }
        .tp-search-input {
          width: 100%;
          font-family: var(--tp-ff-body);
          font-size: 0.95rem;
          background: var(--surface);
          border: 1.5px solid var(--border);
          color: var(--text-primary);
          border-radius: 14px;
          padding: 14px 44px 14px 50px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .tp-search-input::placeholder { color: var(--text-secondary); }
        .tp-search-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-opacity-16, rgba(80,105,231,0.16));
        }

        /* ── HERO STATS ─────────────────────────────────── */
        .tp-hero-stats {
          display: flex; gap: 24px;
          justify-content: center; flex-wrap: wrap;
          margin-top: 28px;
        }
        .tp-stat {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.8rem; color: var(--text-secondary);
        }
        .tp-stat-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
        }
        .tp-stat strong { color: var(--text-primary); font-weight: 700; }

        /* ── FILTER TABS ────────────────────────────────── */
        .tp-tabs-bar {
          position: sticky; top: 0; z-index: 40;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .tp-tabs-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 10px 24px;
          display: flex; align-items: center; gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tp-tabs-inner::-webkit-scrollbar { display: none; }
        .tp-tab {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--tp-ff-head);
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          padding: 7px 16px; border-radius: 999px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tp-tab:hover { border-color: var(--accent); color: var(--accent); }
        .tp-tab.active {
          background: var(--accent); border-color: var(--accent);
          color: #fff;
          box-shadow: 0 3px 12px var(--accent-opacity-20, rgba(80,105,231,0.20));
        }
        .tp-tab-count {
          background: rgba(255,255,255,0.22);
          padding: 1px 6px; border-radius: 999px;
          font-size: 0.6rem;
        }
        .tp-tab:not(.active) .tp-tab-count { background: var(--border); }

        /* ── BODY ───────────────────────────────────────── */
        .tp-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }

        /* ── SECTION HEADERS ────────────────────────────── */
        .tp-section-head {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 20px;
        }
        .tp-section-icon {
          font-size: 1.1rem; line-height: 1;
        }
        .tp-section-title {
          font-family: var(--tp-ff-head);
          font-size: 1.05rem; font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }
        .tp-section-line { flex: 1; height: 1px; background: var(--border); }
        .tp-section-count {
          font-family: var(--tp-ff-head);
          font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-secondary);
        }

        /* ── TRENDING ROW ───────────────────────────────── */
        .tp-trending-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }

        /* ── GROUP SECTION ──────────────────────────────── */
        .tp-group { margin-bottom: 52px; }
        .tp-group-header {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 18px; padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
        }
        .tp-group-icon-wrap {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0;
        }
        .tp-group-meta { flex: 1; }
        .tp-group-name {
          font-family: var(--tp-ff-head);
          font-size: 1rem; font-weight: 800;
          color: var(--text-primary); letter-spacing: -0.01em;
        }
        .tp-group-desc {
          font-size: 0.78rem; color: var(--text-secondary); margin-top: 1px;
        }
        .tp-group-badge {
          font-family: var(--tp-ff-head);
          font-size: 0.62rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 4px 10px; border-radius: 999px;
          flex-shrink: 0;
        }
        .tp-tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        /* ── TOOL CARD ──────────────────────────────────── */
        .tp-card {
          position: relative; overflow: hidden;
          border-radius: 16px;
          border: 1.5px solid var(--border);
          background: var(--surface);
          padding: 20px;
          text-decoration: none;
          display: flex; flex-direction: column; gap: 12px;
          transition: border-color 0.2s, transform 0.18s, box-shadow 0.2s;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
        }
        .tp-card::before {
          content: '';
          position: absolute; inset: 0;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .tp-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 36px rgba(0,0,0,0.10);
        }
        .tp-card:hover::before { opacity: 1; }

        /* Trending card variant */
        .tp-card.trending {
          border-color: var(--accent-opacity-20, rgba(80,105,231,0.20));
          background: var(--surface);
        }

        .tp-card-shine {
          position: absolute; inset: 0; z-index: 0;
          translate: -100% 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%);
          transition: translate 0.55s;
          pointer-events: none;
        }
        .tp-card:hover .tp-card-shine { translate: 100% 0; }

        .tp-card-top {
          position: relative; z-index: 1;
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 10px;
        }
        .tp-card-icon {
          width: 52px; height: 52px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: var(--surface);
          border: 1px solid var(--border);
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .tp-card:hover .tp-card-icon { transform: scale(1.08) rotate(-2deg); }

        .tp-trending-pill {
          font-family: var(--tp-ff-head);
          font-size: 0.58rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          padding: 3px 8px; border-radius: 999px;
          background: rgba(255,107,0,0.12);
          color: #ff6b00;
          border: 1px solid rgba(255,107,0,0.20);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .tp-card-body { position: relative; z-index: 1; flex: 1; }
        .tp-card-title {
          font-family: var(--tp-ff-head);
          font-size: 0.92rem; font-weight: 700;
          color: var(--text-primary); line-height: 1.3;
          margin-bottom: 5px;
          transition: color 0.18s;
        }
        .tp-card:hover .tp-card-title { color: var(--accent); }
        .tp-card-desc {
          font-size: 0.78rem; color: var(--text-secondary);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tp-card-footer {
          position: relative; z-index: 1;
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .tp-card-cta {
          font-family: var(--tp-ff-head);
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--accent);
          display: flex; align-items: center; gap: 4px;
          transition: gap 0.18s;
        }
        .tp-card:hover .tp-card-cta { gap: 8px; }
        .tp-card-free {
          font-family: var(--tp-ff-head);
          font-size: 0.6rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #10b981;
          background: rgba(16,185,129,0.10);
          border: 1px solid rgba(16,185,129,0.20);
          padding: 2px 8px; border-radius: 999px;
        }

        /* ── TRENDING card (compact horizontal on mobile) ── */
        .tp-trending-card {
          flex-direction: row; align-items: center;
          gap: 14px; padding: 16px 18px;
        }
        .tp-trending-card .tp-card-icon {
          width: 44px; height: 44px; flex-shrink: 0;
        }
        .tp-trending-card .tp-card-body { flex: 1; min-width: 0; }
        .tp-trending-card .tp-card-footer { display: none; }
        .tp-trending-card .tp-card-top { flex-direction: column; align-items: flex-start; gap: 6px; }

        /* ── SEARCH RESULTS ─────────────────────────────── */
        .tp-search-results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .tp-search-info {
          font-family: var(--tp-ff-head);
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .tp-search-info span { color: var(--accent); }

        /* ── EMPTY STATE ────────────────────────────────── */
        .tp-empty {
          text-align: center; padding: 80px 24px;
          color: var(--text-secondary);
        }
        .tp-empty-icon { font-size: 3.5rem; display: block; margin-bottom: 16px; }
        .tp-empty h3 {
          font-family: var(--tp-ff-head);
          font-size: 1.15rem; font-weight: 700;
          color: var(--text-primary); margin-bottom: 8px;
        }
        .tp-empty p { font-size: 0.88rem; }

        /* ── RECENT ─────────────────────────────────────── */
        .tp-recent-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
          margin-bottom: 48px;
        }
        .tp-recent-chip {
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          padding: 14px 10px; border-radius: 14px;
          border: 1.5px solid var(--border);
          background: var(--surface);
          text-decoration: none;
          transition: border-color 0.18s, transform 0.15s;
          text-align: center;
        }
        .tp-recent-chip:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .tp-recent-chip-label {
          font-family: var(--tp-ff-head);
          font-size: 0.68rem; font-weight: 700;
          color: var(--text-primary); line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── BOTTOM CTA ─────────────────────────────────── */
        .tp-bottom-cta {
          margin-top: 56px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 52px 48px;
          text-align: center;
        }
        .tp-bottom-cta-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 80% at 0% 50%, rgba(80,105,231,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 50% 70% at 100% 50%, rgba(139,92,246,0.08) 0%, transparent 55%);
        }
        .tp-bottom-cta h2 {
          font-family: var(--tp-ff-head);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800; letter-spacing: -0.03em;
          color: var(--text-primary); margin-bottom: 12px;
          position: relative;
        }
        .tp-bottom-cta h2 span { color: var(--accent); }
        .tp-bottom-cta p {
          font-size: 0.95rem; color: var(--text-secondary);
          line-height: 1.7; max-width: 500px; margin: 0 auto 28px;
          position: relative;
        }
        .tp-bottom-cta-btns {
          display: flex; gap: 12px; justify-content: center;
          flex-wrap: wrap; position: relative;
        }
        .tp-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--tp-ff-head);
          font-size: 0.82rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          background: var(--accent); color: #fff;
          padding: 13px 28px; border-radius: 10px;
          text-decoration: none;
          transition: opacity 0.18s, transform 0.15s;
          box-shadow: 0 4px 18px var(--accent-opacity-20, rgba(80,105,231,0.20));
        }
        .tp-cta-primary:hover { opacity: 0.88; transform: translateY(-2px); }
        .tp-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--tp-ff-head);
          font-size: 0.82rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          background: transparent;
          border: 1.5px solid var(--border);
          color: var(--text-secondary);
          padding: 13px 24px; border-radius: 10px;
          text-decoration: none;
          transition: border-color 0.18s, color 0.18s;
        }
        .tp-cta-secondary:hover { border-color: var(--accent); color: var(--accent); }

        /* ── RESPONSIVE ─────────────────────────────────── */
        @media (max-width: 1024px) {
          .tp-trending-grid { grid-template-columns: repeat(2, 1fr); }
          .tp-tools-grid { grid-template-columns: repeat(2, 1fr); }
          .tp-search-results-grid { grid-template-columns: repeat(2, 1fr); }
          .tp-recent-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .tp-hero { padding: 52px 16px 44px; }
          .tp-tabs-inner { padding: 10px 16px; }
          .tp-body { padding: 28px 16px 60px; }
          .tp-trending-grid { grid-template-columns: 1fr 1fr; }
          .tp-tools-grid { grid-template-columns: 1fr 1fr; }
          .tp-search-results-grid { grid-template-columns: 1fr 1fr; }
          .tp-bottom-cta { padding: 36px 24px; }
        }
        @media (max-width: 540px) {
          .tp-hero-title { font-size: 2rem; }
          .tp-trending-grid { grid-template-columns: 1fr; }
          .tp-tools-grid { grid-template-columns: 1fr; }
          .tp-search-results-grid { grid-template-columns: 1fr; }
          .tp-recent-grid { grid-template-columns: repeat(3, 1fr); }
          .tp-trending-card { flex-direction: row; }
          .tp-tab { font-size: 0.65rem; padding: 6px 12px; }
        }
      `}</style>

      <main className="tp-root">

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="tp-hero">
          <div className="tp-hero-bg" />
          <div className="tp-hero-grid" />
          <div className="tp-hero-inner">

            <div className="tp-hero-badge">
              <span className="tp-badge-dot" />
              {totalTools} Free Browser Tools — No Install Needed
            </div>

            <h1 className="tp-hero-title">
              Powerful tools.<br />
              <span>Zero installation.</span>
            </h1>

            <p className="tp-hero-desc">
              PDF, image, text, media and AI tools — all free, all private,
              everything runs directly in your browser.
            </p>

            {/* Search */}
            <div className="tp-search-wrap">
              <svg className="tp-search-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="9" cy="9" r="6" /><path d="M15 15l3 3" strokeLinecap="round" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                className="tp-search-input"
                placeholder="Search tools — e.g. compress, convert, crop…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {isSearching && (
                <button className="tp-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l10 10M11 1L1 11" />
                  </svg>
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="tp-hero-stats">
              <div className="tp-stat">
                <span className="tp-stat-dot" />
                <span><strong>{totalTools}</strong> Free tools</span>
              </div>
              <div className="tp-stat">
                <span className="tp-stat-dot" style={{ background: "#10b981" }} />
                <span><strong>100%</strong> Private</span>
              </div>
              <div className="tp-stat">
                <span className="tp-stat-dot" style={{ background: "#8b5cf6" }} />
                <span><strong>Zero</strong> Installation</span>
              </div>
              <div className="tp-stat">
                <span className="tp-stat-dot" style={{ background: "#f59e0b" }} />
                <span><strong>No</strong> Account needed</span>
              </div>
            </div>

          </div>
        </section>

        {/* ── FILTER TABS ───────────────────────────────────── */}
        <div className="tp-tabs-bar">
          <div className="tp-tabs-inner">
            {tabs.map((tab) => {
              const count = tab === "All"
                ? flatTools.length
                : toolGroups.find((g) => g.title === tab)?.tools.length ?? 0;
              return (
                <button
                  key={tab}
                  type="button"
                  className={`tp-tab${activeTab === tab ? " active" : ""}`}
                  onClick={() => { setActiveTab(tab); setSearch(""); }}
                >
                  {tab === "All" ? "⚡ All" : `${toolGroups.find(g=>g.title===tab)?.icon ?? ""} ${tab}`}
                  <span className="tp-tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── BODY ──────────────────────────────────────────── */}
        <div className="tp-body">

          {/* ── SEARCH / FILTER RESULTS MODE ────────────────── */}
          {(isSearching || isFiltering) && (
            <>
              {filteredTools.length === 0 ? (
                <div className="tp-empty">
                  <span className="tp-empty-icon">🔍</span>
                  <h3>No tools found</h3>
                  <p>Try a different keyword or browse all tools below.</p>
                </div>
              ) : (
                <>
                  <p className="tp-search-info">
                    {isSearching
                      ? <><span>{filteredTools.length}</span> result{filteredTools.length !== 1 ? "s" : ""} for "<span>{search}</span>"</>
                      : <><span>{filteredTools.length}</span> tools in <span>{activeTab}</span></>
                    }
                  </p>
                  <div className="tp-search-results-grid">
                    {filteredTools.map((tool) => (
                      <ToolCard key={tool.href} tool={tool} onClick={() => handleToolClick(tool)} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ── DEFAULT MODE ─────────────────────────────────── */}
          {showDefault && (
            <>
              {/* Recently used */}
              {showRecent && (
                <section style={{ marginBottom: "48px" }}>
                  <div className="tp-section-head">
                    <span className="tp-section-icon">🕘</span>
                    <span className="tp-section-title">Recently Used</span>
                    <div className="tp-section-line" />
                    <span className="tp-section-count">{recent.length} tools</span>
                  </div>
                  <div className="tp-recent-grid">
                    {recent.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => handleToolClick(tool)}
                        className="tp-recent-chip"
                      >
                        {tool.icon && (
                          <Image src={tool.icon} alt={tool.title} width={44} height={44} style={{ objectFit: "contain" }} />
                        )}
                        <span className="tp-recent-chip-label">{tool.title}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Trending tools */}
              <section style={{ marginBottom: "48px" }}>
                <div className="tp-section-head">
                  <span className="tp-section-icon">🔥</span>
                  <span className="tp-section-title">Trending Right Now</span>
                  <div className="tp-section-line" />
                  <span className="tp-section-count">{trendingTools.length} popular</span>
                </div>
                <div className="tp-trending-grid">
                  {trendingTools.map((tool) => (
                    <TrendingCard key={tool.href} tool={tool} onClick={() => handleToolClick(tool)} />
                  ))}
                </div>
              </section>

              {/* Tool groups */}
              {toolGroups.map((group) => (
                <section key={group.id} className="tp-group">
                  <div className="tp-group-header">
                    <div
                      className="tp-group-icon-wrap"
                      style={{ background: group.accentSoft }}
                    >
                      {group.icon}
                    </div>
                    <div className="tp-group-meta">
                      <div className="tp-group-name">{group.title}</div>
                      <div className="tp-group-desc">{group.description}</div>
                    </div>
                    <span
                      className="tp-group-badge"
                      style={{ background: group.accentSoft, color: group.accent }}
                    >
                      {group.tools.length} tools
                    </span>
                  </div>

                  <div className="tp-tools-grid">
                    {group.tools.map((tool) => (
                      <ToolCard
                        key={tool.href}
                        tool={{ ...tool, accent: group.accent, accentSoft: group.accentSoft }}
                        onClick={() => handleToolClick(tool)}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}

          {/* ── BOTTOM CTA ────────────────────────────────────── */}
          <div className="tp-bottom-cta">
            <div className="tp-bottom-cta-bg" />
            <h2>All tools are <span>100% free</span>.<br />No signup. No limits.</h2>
            <p>
              Every tool runs entirely in your browser. Your files never leave your device —
              no server uploads, no data collection, no account required.
            </p>
            <div className="tp-bottom-cta-btns">
              <Link href="/blog" className="tp-cta-primary">
                Read the Blog
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link href="/comparisons" className="tp-cta-secondary">
                Tool Comparisons →
              </Link>
            </div>
          </div>

        </div>

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Free Online Tools",
              itemListElement: flatTools.map((tool, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: tool.title,
                url: `https://aitechtactics.com${tool.href}`,
              })),
            }),
          }}
        />
      </main>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TOOL CARD
───────────────────────────────────────────────────────────────────────────── */
function ToolCard({ tool, onClick }) {
  const accent     = tool.accent     || "var(--accent)";
  const accentSoft = tool.accentSoft || "var(--accent-opacity-10, rgba(80,105,231,0.10))";

  return (
    <Link href={tool.href} onClick={onClick} className="tp-card">
      <div className="tp-card-shine" />

      <div className="tp-card-top">
        <div className="tp-card-icon" style={{ borderColor: "var(--border)" }}>
          {tool.icon
            ? <Image src={tool.icon} alt={tool.title} width={32} height={32} style={{ objectFit: "contain" }} />
            : <span style={{ fontSize: "1.1rem", fontWeight: 700, color: accent }}>{tool.title[0]}</span>
          }
        </div>
        {tool.trending && <span className="tp-trending-pill">🔥 Trending</span>}
      </div>

      <div className="tp-card-body">
        <div className="tp-card-title">{tool.title}</div>
        {tool.description && <div className="tp-card-desc">{tool.description}</div>}
      </div>

      <div className="tp-card-footer">
        <span className="tp-card-cta" style={{ color: accent }}>
          Launch
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
        <span className="tp-card-free">Free</span>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TRENDING CARD (horizontal compact)
───────────────────────────────────────────────────────────────────────────── */
function TrendingCard({ tool, onClick }) {
  const accent     = tool.accent     || "var(--accent)";
  const accentSoft = tool.accentSoft || "var(--accent-opacity-10, rgba(80,105,231,0.10))";

  return (
    <Link href={tool.href} onClick={onClick} className="tp-card tp-trending-card">
      <div className="tp-card-shine" />

      <div className="tp-card-icon" style={{ background: accentSoft, border: "none", flexShrink: 0 }}>
        {tool.icon
          ? <Image src={tool.icon} alt={tool.title} width={28} height={28} style={{ objectFit: "contain" }} />
          : <span style={{ fontSize: "1rem", fontWeight: 700, color: accent }}>{tool.title[0]}</span>
        }
      </div>

      <div className="tp-card-body" style={{ minWidth: 0 }}>
        <div className="tp-card-title" style={{ fontSize: "0.88rem" }}>{tool.title}</div>
        <div className="tp-card-desc" style={{ fontSize: "0.74rem", WebkitLineClamp: 1 }}>{tool.description}</div>
        <div style={{
          marginTop: "8px",
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "'Syne', sans-serif",
          fontSize: "0.65rem", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.08em",
          color: accent,
        }}>
          Launch →
          <span className="tp-card-free" style={{ marginLeft: "4px" }}>Free</span>
        </div>
      </div>
    </Link>
  );
}