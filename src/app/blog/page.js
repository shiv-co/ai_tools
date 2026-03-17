import { blogs } from "@/app/blog/data/blogs";
import BlogIndexClient from "./BlogIndexClient";
import { buildMetadata } from "@/lib/seo";

const ALL = "All";

export const metadata = buildMetadata({
  title: "AI Tech Tactics Blog | Guides and Tutorials",
  description:
    "Read AI Tech Tactics blog posts on image formats, SEO, file conversion, browser tools, and practical digital workflows.",
  path: "/blog",
});

/** Server component: compute blog data once and pass to client. Reduces client JS (no blogs.js in bundle). */
export default function BlogIndexPage() {
  const sorted = [...blogs].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );
  const categories = [ALL, ...Array.from(new Set(blogs.map((b) => b.category)))];

  return (
    <BlogIndexClient initialBlogs={sorted} categories={categories} />
  );
}
