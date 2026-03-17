import ToolsClient from "./ToolsClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Online Tools Hub | AI Tech Tactics",
  description:
    "Explore free browser-based PDF, image, text, media, and AI tools designed for privacy, speed, and everyday productivity.",
  path: "/tools",
});

export default function Page() {
  return <ToolsClient />;
}
