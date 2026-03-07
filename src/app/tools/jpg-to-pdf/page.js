"use client";

import dynamic from "next/dynamic";
import ToolLoadingSkeleton from "@/components/ToolLoadingSkeleton";

const JpgToPdfClient = dynamic(() => import("./JpgToPdfClient"), {
  ssr: false,
  loading: () => <ToolLoadingSkeleton />,
});

export default function Page() {
  return <JpgToPdfClient />;
}
