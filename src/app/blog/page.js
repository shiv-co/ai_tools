"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { blogs } from "@/app/blog/data/blogs";

// ── Derive categories from live blog data ───────────────────────────────────
const ALL = "All";
const uniqueCategories = [ALL, ...Array.from(new Set(blogs.map((b) => b.category)))];

// ── Sort newest first ────────────────────────────────────────────────────────
const sorted = [...blogs].sort(
  (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
);

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return sorted.filter((post) => {
      const matchCat =
        activeCategory === ALL || post.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags?.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <>
      <style>{`
        /* ── Fonts ─────────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        /* ── Blog index root ────────────────────────────────── */
        .bi-root {
          --bi-ff-display: 'Instrument Serif', serif;
          --bi-ff-head:    'Syne', sans-serif;
          --bi-ff-body:    'DM Sans', sans-serif;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text-primary);
          font-family: var(--bi-ff-body);
        }

        /* ── MASTHEAD ────────────────────────────────────────── */
        .bi-masthead {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
          padding: 64px 24px 52px;
        }
        .bi-masthead-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 80% at -10% 50%, rgba(80,105,231,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 110% 20%, rgba(16,185,129,0.07) 0%, transparent 55%);
        }
        .bi-masthead-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }
        .bi-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--bi-ff-head);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent);
          margin-bottom: 20px;
        }
        .bi-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        .bi-masthead-title {
          font-family: var(--bi-ff-display);
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          max-width: 780px;
          margin-bottom: 20px;
        }
        .bi-masthead-title em {
          font-style: italic;
          color: var(--accent);
        }
        .bi-masthead-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .bi-stats-row {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }
        .bi-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .bi-stat-num {
          font-family: var(--bi-ff-head);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }
        .bi-stat-label {
          font-size: 0.72rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .bi-masthead-divider {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--accent) 30%,
            var(--border) 60%,
            transparent 100%
          );
        }

        /* ── FILTER BAR ──────────────────────────────────────── */
        .bi-filter-bar {
          position: sticky;
          top: 0;
          z-index: 40;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .bi-filter-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .bi-filter-cats {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          align-items: center;
        }
        .bi-cat-btn {
          font-family: var(--bi-ff-head);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
        }
        .bi-cat-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .bi-cat-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .bi-search-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .bi-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 14px; height: 14px;
          color: var(--text-secondary);
          pointer-events: none;
        }
        .bi-search-input {
          font-family: var(--bi-ff-body);
          font-size: 0.82rem;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-primary);
          border-radius: 8px;
          padding: 7px 14px 7px 34px;
          width: 200px;
          outline: none;
          transition: border-color 0.18s, width 0.25s;
        }
        .bi-search-input::placeholder { color: var(--text-secondary); }
        .bi-search-input:focus {
          border-color: var(--accent);
          width: 240px;
        }
        .bi-result-count {
          font-size: 0.72rem;
          color: var(--text-secondary);
          font-family: var(--bi-ff-head);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          white-space: nowrap;
        }

        /* ── MAIN LAYOUT ─────────────────────────────────────── */
        .bi-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }

        /* ── FEATURED POST ───────────────────────────────────── */
        .bi-featured {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 56px;
          text-decoration: none;
          background: var(--surface);
          transition: box-shadow 0.25s, transform 0.2s;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
        }
        .bi-featured:hover {
          box-shadow: 0 12px 48px rgba(80,105,231,0.14);
          transform: translateY(-3px);
        }
        .bi-featured-img-wrap {
          position: relative;
          overflow: hidden;
          min-height: 380px;
        }
        .bi-featured-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s ease;
        }
        .bi-featured:hover .bi-featured-img-wrap img {
          transform: scale(1.04);
        }
        .bi-featured-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%);
        }
        .bi-featured-badge {
          position: absolute;
          top: 20px; left: 20px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--bi-ff-head);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          background: var(--accent);
          color: #fff;
          padding: 5px 12px;
          border-radius: 999px;
        }
        .bi-featured-content {
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }
        .bi-featured-cat {
          font-family: var(--bi-ff-head);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
        }
        .bi-featured-title {
          font-family: var(--bi-ff-display);
          font-size: clamp(1.5rem, 2.5vw, 2.1rem);
          font-weight: 400;
          line-height: 1.25;
          letter-spacing: -0.015em;
          color: var(--text-primary);
        }
        .bi-featured-title em { font-style: italic; color: var(--accent); }
        .bi-featured-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bi-featured-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .bi-featured-author-av {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          font-family: var(--bi-ff-head);
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bi-featured-meta-text {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .bi-featured-meta-text strong {
          color: var(--text-primary);
          font-weight: 600;
          display: block;
        }
        .bi-featured-tags {
          margin-left: auto;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .bi-tag {
          font-family: var(--bi-ff-head);
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 3px 10px;
          border-radius: 999px;
          background: var(--accent-opacity-10, rgba(80,105,231,0.10));
          color: var(--accent);
          border: 1px solid var(--accent-opacity-20, rgba(80,105,231,0.20));
        }
        .bi-read-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--bi-ff-head);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent);
          transition: gap 0.18s;
        }
        .bi-featured:hover .bi-read-link { gap: 10px; }

        /* ── SECTION DIVIDER ─────────────────────────────────── */
        .bi-section-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }
        .bi-section-label {
          font-family: var(--bi-ff-head);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-secondary);
          white-space: nowrap;
        }
        .bi-section-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .bi-section-count {
          font-family: var(--bi-ff-head);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        /* ── POST GRID ───────────────────────────────────────── */
        .bi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* ── POST CARD ───────────────────────────────────────── */
        .bi-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          background: var(--surface);
          text-decoration: none;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.18s;
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }
        .bi-card:hover {
          border-color: var(--accent);
          box-shadow: 0 8px 32px rgba(80,105,231,0.13);
          transform: translateY(-4px);
        }
        .bi-card-img-wrap {
          position: relative;
          height: 188px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .bi-card-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .bi-card:hover .bi-card-img-wrap img { transform: scale(1.06); }
        .bi-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.42) 0%, transparent 55%);
        }
        .bi-card-cat-badge {
          position: absolute;
          bottom: 12px; left: 12px;
          font-family: var(--bi-ff-head);
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #fff;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          padding: 4px 10px;
          border-radius: 999px;
        }
        .bi-card-readtime {
          position: absolute;
          bottom: 12px; right: 12px;
          font-family: var(--bi-ff-head);
          font-size: 0.6rem;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .bi-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px 20px 16px;
          gap: 10px;
        }
        .bi-card-title {
          font-family: var(--bi-ff-head);
          font-size: 0.98rem;
          font-weight: 700;
          line-height: 1.4;
          color: var(--text-primary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.18s;
        }
        .bi-card:hover .bi-card-title { color: var(--accent); }
        .bi-card-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bi-card-footer {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .bi-card-author {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .bi-card-av {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: var(--accent-opacity-18, rgba(80,105,231,0.18));
          color: var(--accent);
          font-family: var(--bi-ff-head);
          font-size: 0.6rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bi-card-author-name {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .bi-card-date {
          font-size: 0.72rem;
          color: var(--text-secondary);
          font-family: var(--bi-ff-head);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        /* ── EMPTY STATE ─────────────────────────────────────── */
        .bi-empty {
          text-align: center;
          padding: 80px 24px;
          color: var(--text-secondary);
        }
        .bi-empty-icon {
          font-size: 3rem;
          margin-bottom: 16px;
          display: block;
        }
        .bi-empty h3 {
          font-family: var(--bi-ff-head);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        /* ── BOTTOM CTA STRIP ────────────────────────────────── */
        .bi-bottom-cta {
          margin-top: 64px;
          border-radius: 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 48px 40px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .bi-bottom-cta::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(80,105,231,0.10) 0%, transparent 65%);
          pointer-events: none;
        }
        .bi-bottom-cta-label {
          font-family: var(--bi-ff-head);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
          margin-bottom: 10px;
        }
        .bi-bottom-cta h2 {
          font-family: var(--bi-ff-display);
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 400;
          color: var(--text-primary);
          margin-bottom: 10px;
          line-height: 1.25;
        }
        .bi-bottom-cta h2 em { font-style: italic; color: var(--accent); }
        .bi-bottom-cta p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 520px;
        }
        .bi-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--bi-ff-head);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: var(--accent);
          color: #fff;
          padding: 14px 28px;
          border-radius: 10px;
          text-decoration: none;
          transition: opacity 0.18s, transform 0.15s;
          white-space: nowrap;
          box-shadow: 0 4px 18px rgba(80,105,231,0.30);
          flex-shrink: 0;
        }
        .bi-cta-btn:hover { opacity: 0.88; transform: translateY(-2px); }

        /* ── RESPONSIVE ──────────────────────────────────────── */
        @media (max-width: 1024px) {
          .bi-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .bi-masthead { padding: 48px 16px 40px; }
          .bi-filter-inner { padding: 10px 16px; gap: 8px; }
          .bi-search-input { width: 160px; }
          .bi-search-input:focus { width: 180px; }
          .bi-body { padding: 32px 16px 60px; }

          .bi-featured {
            grid-template-columns: 1fr;
          }
          .bi-featured-img-wrap { min-height: 220px; }
          .bi-featured-content { padding: 24px 22px; }
          .bi-featured-title { font-size: 1.4rem; }

          .bi-grid { grid-template-columns: 1fr; gap: 16px; }

          .bi-bottom-cta {
            grid-template-columns: 1fr;
            padding: 32px 24px;
            text-align: center;
          }
          .bi-bottom-cta::before { display: none; }
          .bi-cta-btn { width: 100%; justify-content: center; }
          .bi-bottom-cta p { max-width: 100%; }
        }

        @media (max-width: 480px) {
          .bi-masthead-title { font-size: 2.4rem; }
          .bi-filter-cats { gap: 5px; }
          .bi-cat-btn { padding: 5px 10px; font-size: 0.66rem; }
          .bi-result-count { display: none; }
          .bi-search-wrap { width: 100%; }
          .bi-search-input { width: 100% !important; }
          .bi-filter-inner { flex-direction: column; align-items: stretch; }
        }
      `}</style>

      <main className="bi-root">

        {/* ── MASTHEAD ──────────────────────────────────────────── */}
        <section className="bi-masthead">
          <div className="bi-masthead-bg" />
          <div className="bi-masthead-inner">
            <div className="bi-eyebrow">
              <span className="bi-eyebrow-dot" />
              AI Tech Tactics · The Blog
            </div>

            <h1 className="bi-masthead-title">
              Tools, tactics &amp; <em>deep dives</em><br />
              for the AI-native workflow
            </h1>

            <p className="bi-masthead-desc">
              Practical guides on image optimization, PDF tools, productivity,
              and everything in between — written for people who actually ship things.
            </p>

            <div className="bi-stats-row">
              <div className="bi-stat">
                <span className="bi-stat-num">{blogs.length}</span>
                <span className="bi-stat-label">Articles</span>
              </div>
              <div className="bi-stat">
                <span className="bi-stat-num">{uniqueCategories.length - 1}</span>
                <span className="bi-stat-label">Categories</span>
              </div>
              <div className="bi-stat">
                <span className="bi-stat-num">Free</span>
                <span className="bi-stat-label">Always</span>
              </div>
            </div>
          </div>
          <div className="bi-masthead-divider" />
        </section>

        {/* ── FILTER BAR ────────────────────────────────────────── */}
        <div className="bi-filter-bar">
          <div className="bi-filter-inner">
            <div className="bi-filter-cats">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`bi-cat-btn${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <span className="bi-result-count">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </span>
              <div className="bi-search-wrap">
                <svg className="bi-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="9" cy="9" r="6" />
                  <path d="M15 15l3 3" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  className="bi-search-input"
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ──────────────────────────────────────────────── */}
        <div className="bi-body">

          {filtered.length === 0 ? (
            <div className="bi-empty">
              <span className="bi-empty-icon">🔍</span>
              <h3>No articles found</h3>
              <p>Try a different category or clear your search.</p>
            </div>
          ) : (
            <>
              {/* ── FEATURED ──────────────────────────────────── */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="bi-featured">
                  <div className="bi-featured-img-wrap">
                    <img src={featured.image} alt={featured.title} />
                    <div className="bi-featured-img-overlay" />
                    <span className="bi-featured-badge">
                      ◆ Featured
                    </span>
                  </div>

                  <div className="bi-featured-content">
                    <span className="bi-featured-cat">{featured.category}</span>

                    <h2 className="bi-featured-title">{featured.title}</h2>

                    <p className="bi-featured-desc">{featured.description}</p>

                    {featured.tags?.length > 0 && (
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {featured.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="bi-tag">#{tag}</span>
                        ))}
                      </div>
                    )}

                    <span className="bi-read-link">
                      Read article
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>

                    <div className="bi-featured-meta">
                      <div className="bi-featured-author-av">
                        {featured.author.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="bi-featured-meta-text">
                        <strong>{featured.author}</strong>
                        {featured.date} · {featured.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* ── REST GRID ──────────────────────────────────── */}
              {rest.length > 0 && (
                <>
                  <div className="bi-section-head">
                    <span className="bi-section-label">All Articles</span>
                    <div className="bi-section-line" />
                    <span className="bi-section-count">{rest.length} more</span>
                  </div>

                  <div className="bi-grid">
                    {rest.map((post) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="bi-card">
                        <div className="bi-card-img-wrap">
                          <img src={post.image} alt={post.title} />
                          <div className="bi-card-img-overlay" />
                          <span className="bi-card-cat-badge">{post.category}</span>
                          <span className="bi-card-readtime">{post.readTime}</span>
                        </div>

                        <div className="bi-card-body">
                          <h3 className="bi-card-title">{post.title}</h3>
                          <p className="bi-card-desc">{post.description}</p>

                          <div className="bi-card-footer">
                            <div className="bi-card-author">
                              <div className="bi-card-av">
                                {post.author.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <span className="bi-card-author-name">{post.author}</span>
                            </div>
                            <span className="bi-card-date">{post.date}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ── BOTTOM CTA ─────────────────────────────────────── */}
          <div className="bi-bottom-cta">
            <div>
              <div className="bi-bottom-cta-label">⚡ Free Tools</div>
              <h2>Stop reading.<br /><em>Start optimizing.</em></h2>
              <p>
                Every guide on this blog links to a free browser-based tool —
                image converters, PDF compressors, file optimizers. No installs,
                no accounts, no upload to any server. Your files stay on your device.
              </p>
            </div>
            <Link href="/tools" className="bi-cta-btn">
              Explore Free Tools
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}