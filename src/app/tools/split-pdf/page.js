"use client";

import dynamic from "next/dynamic";
import ToolLoadingSkeleton from "@/components/ToolLoadingSkeleton";

const SplitPdfClient = dynamic(() => import("./SplitPdfClient"), {
  ssr: false,
  loading: () => <ToolLoadingSkeleton />,
});

export default function Page() {
  return <SplitPdfClient />;
}
