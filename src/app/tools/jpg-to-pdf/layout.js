import ToolRouteLayout from "@/components/ToolRouteLayout";
import { buildMetadata } from "@/lib/seo";
import { getToolSeoData } from "@/lib/tool-seo-data";

const tool = getToolSeoData("jpg-to-pdf");
export const metadata = buildMetadata({ title: tool.title, description: tool.description, path: tool.path });

export default function Layout({ children }) {
  return <ToolRouteLayout slug="jpg-to-pdf">{children}</ToolRouteLayout>;
}
