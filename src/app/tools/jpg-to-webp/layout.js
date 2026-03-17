import ToolRouteLayout from "@/components/ToolRouteLayout";
import { buildMetadata } from "@/lib/seo";
import { getToolSeoData } from "@/lib/tool-seo-data";

const tool = getToolSeoData("jpg-to-webp");
export const metadata = buildMetadata({ title: tool.title, description: tool.description, path: tool.path });

export default function Layout({ children }) {
  return <ToolRouteLayout slug="jpg-to-webp">{children}</ToolRouteLayout>;
}
