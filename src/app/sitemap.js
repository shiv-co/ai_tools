import { blogs } from "@/app/blog/data/blogs";
import { comparisons } from "@/lib/comparisons-data";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/tools",
  "/blog",
  "/comparisons",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/tools/ai-tools-by-category",
  "/tools/ai-tools-by-usecase",
  "/tools/ai-tools-for-business",
  "/tools/ai-tools-for-creators",
  "/tools/ai-tools-for-developers",
  "/tools/ai-tools-for-students",
  "/tools/ai-writing-tools",
];

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
];

export default function sitemap() {
  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "/" ? 1 : 0.8,
    })),
    ...toolRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    })),
    ...blogs.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.dateISO || post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...comparisons.map((item) => ({
      url: absoluteUrl(`/comparisons/${item.slug}`),
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
