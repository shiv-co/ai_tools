import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Tools for Students | AI Tech Tactics",
  description:
    "Discover AI tools for students for notes, assignments, exam prep, resumes, and academic productivity.",
  path: "/tools/ai-tools-for-students",
});

export default function Layout({ children }) {
  return children;
}
