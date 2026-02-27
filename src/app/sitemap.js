// app/sitemap.js

import { blogs } from "@/data/blogs"; // adjust path if needed

export default function sitemap() {
  const baseUrl = "https://aitechtactics.com";

  /* ================= STATIC PAGES ================= */

  const staticRoutes = [
    "",
    "/tools",
    "/blog",
    "/comparisons",
    "/about",
    "/contact",
    "/privacy-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  /* ================= TOOL PAGES ================= */

  const toolRoutes = [
    "/tools/split-pdf",
    "/tools/merge-pdf",
    "/tools/reorder-pdf",
    "/tools/compress-pdf",
    "/tools/pdf-to-jpg",
    "/tools/jpg-to-pdf",
    "/tools/image-compressor",
    "/tools/image-cropper",
    "/tools/image-resizer",
    "/tools/heic-to-jpg",
    "/tools/jpg-to-png",
    "/tools/png-to-jpg",
    "/tools/jpg-to-webp",
    "/tools/webp-to-jpg",
    "/tools/word-counter",
    "/tools/text-case-converter",
    "/tools/mp4-to-mp3",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  /* ================= BLOG POSTS (DYNAMIC) ================= */

  const blogRoutes = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}