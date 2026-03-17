import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Writing Tools | AI Tech Tactics",
  description:
    "Compare AI writing tools for blogs, copywriting, email, resumes, and content production workflows.",
  path: "/tools/ai-writing-tools",
});

export default function Layout({ children }) {
  return children;
}
