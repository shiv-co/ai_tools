import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Tools by Use Case | AI Tech Tactics",
  description:
    "Find AI tools by use case for writing, research, coding, image generation, and business workflows.",
  path: "/tools/ai-tools-by-usecase",
});

export default function Layout({ children }) {
  return children;
}
