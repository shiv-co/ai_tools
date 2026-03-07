import { blogs } from "@/app/blog/data/blogs";
import BlogIndexClient from "./BlogIndexClient";

const ALL = "All";

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
