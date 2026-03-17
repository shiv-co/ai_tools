import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Tools by Category | AI Tech Tactics",
  description:
    "Browse AI tools by category to compare chatbots, creative apps, productivity tools, and more.",
  path: "/tools/ai-tools-by-category",
});

export default function Layout({ children }) {
  return children;
}
