import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Tools for Creators | AI Tech Tactics",
  description:
    "Explore AI tools for creators, including writing, editing, thumbnails, video, and content ideation tools.",
  path: "/tools/ai-tools-for-creators",
});

export default function Layout({ children }) {
  return children;
}
