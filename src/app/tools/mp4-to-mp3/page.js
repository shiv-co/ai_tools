"use client";

import dynamic from "next/dynamic";
import ToolLoadingSkeleton from "@/components/ToolLoadingSkeleton";

const Mp4ToMp3Client = dynamic(() => import("./Mp4ToMp3Client"), {
  ssr: false,
  loading: () => <ToolLoadingSkeleton />,
});

export default function Page() {
  return <Mp4ToMp3Client />;
}
