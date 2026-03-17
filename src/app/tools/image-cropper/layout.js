import ToolRouteLayout from "@/components/ToolRouteLayout";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildMetadata, faqSchema, softwareSchema } from "@/lib/seo";
import { getToolSeoData } from "@/lib/tool-seo-data";

const tool = getToolSeoData("image-cropper");
export const metadata = buildMetadata({ title: tool.title, description: tool.description, path: tool.path });

export default function Layout({ children }) {
  return (
    <>
      <ToolRouteLayout slug="image-cropper">{children}</ToolRouteLayout>
      <SeoJsonLd data={softwareSchema({ name: tool.name, description: tool.description, path: tool.path })} />
      <SeoJsonLd data={faqSchema(tool.faqs)} />
    </>
  );
}
