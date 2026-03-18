import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import SeoToolPage from "@/components/SeoToolPage";
import ToolLoadingSkeleton from "@/components/ToolLoadingSkeleton";
import { buildMetadata } from "@/lib/seo";
import { getAllProgrammaticSlugs, getProgrammaticDescriptorBySlug } from "@/lib/programmatic-page-utils";

const ImageCompressorClient = dynamic(
  () => import("@/app/tools/image-compressor/ImageCompressorClient"),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);
const ImageResizerClient = dynamic(
  () => import("@/app/tools/image-resizer/ImageResizerClient"),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);
const PdfToJpgClient = dynamic(
  () => import("@/app/tools/pdf-to-jpg/PdfToJpgClient"),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);
const JpgToPdfClient = dynamic(
  () => import("@/app/tools/jpg-to-pdf/JpgToPdfClient"),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);
const ImageConverterCore = dynamic(() => import("@/components/ImageConverterCore"), {
  ssr: false,
  loading: () => <ToolLoadingSkeleton />,
});

function renderTool(descriptor) {
  switch (descriptor.toolType) {
    case "image-compressor":
      return <ImageCompressorClient />;
    case "image-resizer":
      return <ImageResizerClient />;
    case "pdf-to-jpg":
      return <PdfToJpgClient />;
    case "jpg-to-pdf":
      return <JpgToPdfClient />;
    case "image-converter":
      return (
        <ImageConverterCore
          from={descriptor.inputFormat}
          to={descriptor.outputFormat}
          title={descriptor.toolName}
          description={descriptor.metaDescription}
        />
      );
    default:
      return null;
  }
}

export async function generateStaticParams() {
  return getAllProgrammaticSlugs().map((slug) => ({ programmaticSlug: slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const descriptor = getProgrammaticDescriptorBySlug(resolvedParams.programmaticSlug);
  if (!descriptor) return {};

  return buildMetadata({
    title: descriptor.metaTitle,
    description: descriptor.metaDescription,
    path: descriptor.canonicalPath,
  });
}

export default async function ProgrammaticSeoPage({ params }) {
  const resolvedParams = await params;
  const descriptor = getProgrammaticDescriptorBySlug(resolvedParams.programmaticSlug);
  if (!descriptor) return notFound();

  const tool = renderTool(descriptor);
  if (!tool) return notFound();

  return <SeoToolPage descriptor={descriptor}>{tool}</SeoToolPage>;
}
