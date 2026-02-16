"use client";

import { useEffect } from "react";

export default function AdBanner({
  slot,
  format = "auto",
  className = "",
  style = {},
}) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  // DEV PLACEHOLDER (remove after approval)
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    return (
      <div
        className={`my-12 flex justify-center ${className}`}
        style={{ minHeight: "90px", ...style }}
      >
        <div className="w-full max-w-4xl h-[90px] rounded-lg border border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] flex items-center justify-center text-sm text-[var(--text-secondary)]">
          Ad Placeholder ({slot})
        </div>
      </div>
    );
  }

  return (
    <div className={`my-12 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        // Replace with your actual AdSense client ID and slot ID
        data-ad-client="ca-pub-XXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
