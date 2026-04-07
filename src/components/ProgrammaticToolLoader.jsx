"use client";

import dynamic from "next/dynamic";

import ToolLoadingSkeleton from "@/components/ToolLoadingSkeleton";

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

const ImageConverterCore = dynamic(
  () => import("@/components/ImageConverterCore"),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

export default function ProgrammaticToolLoader({ descriptor }) {
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
