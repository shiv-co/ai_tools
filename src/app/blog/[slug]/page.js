

import Link from "next/link";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons";
import { blogs } from "@/app/blog/data/blogs";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { notFound } from "next/navigation";
import SeoJsonLd from "@/components/SeoJsonLd";
import { articleSchema, buildMetadata } from "@/lib/seo";

const siteUrl = "https://aitechtactics.com";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);
  if (!blog) return {};
  return buildMetadata({
    title: `${blog.title} | AI Tech Tactics Blog`,
    description: blog.description,
    path: `/blog/${blog.slug}`,
    type: "article",
    image: blog.image,
  });
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);
  if (!blog) return notFound();

  const currentIndex = blogs.findIndex((b) => b.slug === blog.slug);
  const prevPost = blogs[currentIndex - 1] || null;
  const nextPost = blogs[currentIndex + 1] || null;
  const relatedReads = blogs.filter((b) => b.slug !== blog.slug).slice(0, 4);

  return (
    <>

      <main className="blog-root min-h-screen">
        <ReadingProgressBar />

        {/* ── HERO ─────────────────────────────── */}
        <section className="blog-hero">
          <div className="blog-hero-inner">
            <span className="blog-category-pill">
              ◆ {blog.category}
            </span>
            <h1 className="blog-title">{blog.title}</h1>
            <p className="blog-desc">{blog.description}</p>

            <div className="blog-meta-row">
              <Image
                src="/images/author.png"
                alt={blog.author}
                width={48}
                height={48}
                className="blog-author-avatar"
              />
              <div className="blog-meta-text">
                By <strong>{blog.author}</strong>
                <br />
                {blog.date}
              </div>
              <div className="blog-meta-badges">
                <span className="meta-badge">⏱ {blog.readTime}</span>
                {blog.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="meta-badge">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Hero image anchored at bottom of hero */}
          <div className="blog-hero-image-wrap">
            <Image
              src={blog.image}
              alt={blog.title}
              width={1200}
              height={630}
              className="h-auto w-full"
              priority
            />
            <div className="blog-hero-image-overlay" />
          </div>
        </section>

        {/* ── BODY LAYOUT ──────────────────────── */}
        <div className="blog-layout">

          {/* ARTICLE */}
          <div>
            <article className="blog-article-card">
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Bottom CTA */}
              <div className="article-bottom-cta">
                <h3>⚡ Try Our Free Tools</h3>
                <p>
                  {blog.ctaText ||
                    "No signup. No installs. Everything runs in your browser."}
                </p>
                <div className="cta-btn-group">
                  <Link href="/tools" className="cta-btn-primary">
                    Explore Free Tools →
                  </Link>
                  <Link href="/blog" className="cta-btn-secondary">
                    More Articles
                  </Link>
                </div>
              </div>

              {/* Share */}
              <div className="share-strip">
                <span className="share-label">Share this post</span>
                <ShareButtons url={`${siteUrl}/blog/${blog.slug}`} />
              </div>

              {/* Prev / Next */}
              {(prevPost || nextPost) && (
                <nav className="prev-next" aria-label="Post navigation">
                  {prevPost ? (
                    <Link href={`/blog/${prevPost.slug}`} className="prev-next-card">
                      <div className="prev-next-dir">← Previous</div>
                      <div className="prev-next-title">{prevPost.title}</div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link href={`/blog/${nextPost.slug}`} className="prev-next-card right">
                      <div className="prev-next-dir">Next →</div>
                      <div className="prev-next-title">{nextPost.title}</div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </nav>
              )}
            </article>
          </div>

          {/* SIDEBAR (desktop) */}
          <aside className="blog-sidebar">

            {/* Tool CTA */}
            <div className="sidebar-tool-cta">
              <h4>⚡ Free AI Tools</h4>
              <p>Convert, compress, and optimize images instantly in your browser.</p>
              <Link href="/tools" className="sidebar-cta-btn">
                Open Free Tools →
              </Link>
              <div className="sidebar-cta-badge">🔒 100% Private · No Signup</div>
            </div>

            {/* Table of Contents */}
            {blog.toc?.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-title">📋 In This Article</div>
                <ul className="toc-list">
                  {blog.toc.map((item) => (
                    <li key={item.id} className="toc-item">
                      <a href={`#${item.id}`} className="toc-link">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Articles */}
            {relatedReads.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-title">📚 Related Articles</div>
                {relatedReads.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="related-item"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={160}
                      height={90}
                      className="related-item-img"
                      loading="lazy"
                    />
                    <div>
                      <div className="related-item-text">{item.title}</div>
                      <div className="related-item-cat">{item.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-title">🏷 Tags</div>
                <div className="tag-cloud">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="tag-chip">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>

        {/* ── SCHEMA ───────────────────────────── */}
        <SeoJsonLd
          data={articleSchema({
            title: blog.title,
            description: blog.description,
            path: `/blog/${blog.slug}`,
            image: blog.image,
            datePublished: blog.dateISO || blog.date,
            dateModified: blog.dateModifiedISO || blog.dateISO || blog.date,
            author: blog.author,
            keywords: blog.tags?.join(", "),
          })}
        />
      </main>
    </>
  );
}
