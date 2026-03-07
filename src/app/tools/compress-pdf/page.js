"use client";

import dynamic from "next/dynamic";
import ToolLoadingSkeleton from "@/components/ToolLoadingSkeleton";

const CompressPdfClient = dynamic(() => import("./CompressPdfClient"), {
  ssr: false,
  loading: () => <ToolLoadingSkeleton />,
});

export default function Page() {
  return <CompressPdfClient />;
}
