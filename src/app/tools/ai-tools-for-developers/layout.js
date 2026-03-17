import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Tools for Developers | AI Tech Tactics",
  description:
    "Explore AI tools for developers covering coding, debugging, documentation, and software productivity.",
  path: "/tools/ai-tools-for-developers",
});

export default function Layout({ children }) {
  return children;
}
