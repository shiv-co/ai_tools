"use client";

import dynamic from "next/dynamic";
import ToolLoadingSkeleton from "@/components/ToolLoadingSkeleton";

const ImageResizerClient = dynamic(() => import("./ImageResizerClient"), {
  ssr: false,
  loading: () => <ToolLoadingSkeleton />,
});

export default function Page() {
  return <ImageResizerClient />;
}
