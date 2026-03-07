"use client";

import dynamic from "next/dynamic";
import ToolLoadingSkeleton from "@/components/ToolLoadingSkeleton";

const MergePdfClient = dynamic(() => import("./MergePdfClient"), {
  ssr: false,
  loading: () => <ToolLoadingSkeleton />,
});

export default function Page() {
  return <MergePdfClient />;
}
