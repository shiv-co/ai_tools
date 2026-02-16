import ToolsClient from "./ToolsClient";
import AdBanner from "@/components/AdBanner";



// Then place ads like this:

// 🔹 After Hero
// <AdBanner slot="1234567890" />

// 🔹 Between Sections
// <AdBanner slot="9876543210" />

// 🔹 Bottom of Page
// <AdBanner slot="1122334455" />

/* =============================
   SEO METADATA (Server Only)
============================= */

export const metadata = {
  title: "Free Online PDF, Image & Text Tools | Fast & Secure Tools Hub",
  description:
    "Access free online PDF tools, image converters, compressors, text utilities, and AI-powered productivity tools. 100% browser-based, fast, and secure.",
  alternates: {
    canonical: "https://yourdomain.com/tools",
  },
  openGraph: {
    title: "Free Online Tools – PDF, Image & Text Utilities",
    description:
      "Powerful browser-based tools for PDFs, images, text and AI. No installation required.",
    url: "https://yourdomain.com/tools",
    type: "website",
  },
};

export default function Page() {
  return <ToolsClient />;
}
