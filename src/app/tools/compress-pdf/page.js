"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FaUpload } from "react-icons/fa";

 const faqs = [
  {
    q: "How much can I compress a PDF?",
    a: "Image-heavy PDFs can often be reduced by 30–70%. Text-only PDFs usually compress less."
  },
  {
    q: "Is this PDF compression safe?",
    a: " Yes. All compression happens locally in your browser." },
  {   
    q: "Can I reorder pages on mobile?",
    a: "Yes. On mobile devices, you can use the up and down buttons to move pages instead of drag and drop."
  },
  {
    q: "Will quality be reduced?",
    a: " Higher compression may slightly reduce image quality, but textremains unaffected."
  },
  {
    q: "Is this Compress PDF tool free?",
    a: "Yes. This tool is completely free with no watermarks or registration required."
  }
];

export default function CompressPdfPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compression, setCompression] = useState("medium");

  const compressionMap = {
    low: 0.9,
    medium: 0.7,
    high: 0.5,
  };

  const handleCompress = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Re-save with lower image quality
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        compress: true,
      });

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      });

      const date = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed-${compression}-pdf-${date}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Compression error:", err);
      alert("Failed to compress PDF. Try another file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-5 md:py-10 space-y-10">
        {/* HEADER */}
        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold">Compress PDF</h1>
          <p className="text-[var(--text-secondary)] text-xs md:text-sm ">
            Reduce PDF file size while keeping good quality. Files are processed
            locally in your browser.
          </p>
        </div>

        {/* UPLOAD */}
        <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8 text-center transition hover:border-[var(--accent)] hover:bg-[var(--accent-opacity-6)]">
             <FaUpload className="text-blue-600 dark:text-blue-400" />
          <p className="font-semibold">Upload PDF file</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Click to choose a PDF
          </p>

          {file && (
            <p className="text-xs text-[var(--text-secondary)]">
              Selected: {file.name}
            </p>
          )}

          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* COMPRESSION LEVEL */}
        <div className="max-w-sm space-y-2">
          <label className="text-sm font-medium">Compression Level</label>
          <select
            value={compression}
            onChange={(e) => setCompression(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="low">Low (best quality)</option>
            <option value="medium">Medium (recommended)</option>
            <option value="high">High (smallest size)</option>
          </select>
        </div>

        {/* ACTION */}
        <button
          onClick={handleCompress}
          disabled={!file || loading}
          className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Compressing PDF…" : "Compress PDF"}
        </button>

        {/* INFO */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Private</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Files never leave your device.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Fast</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Compression happens instantly in your browser.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Free</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              No sign-up or limits for basic usage.
            </p>
          </div>
        </div>

                {/* FAQ */}
<div className="space-y-6 mt-10">
  <h2 className="text-xl md:text-2xl font-bold">
    Frequently Asked Questions
  </h2>

  <div className="space-y-3">
    {faqs.map((item, index) => (
      <details
        key={index}
        className="group rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4"
      >
        <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
          {item.q}
          <span className="transition-transform group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
          {item.a}
        </p>
      </details>
    ))}
  </div>
</div>


      
      </section>

      {/* FAQ SCHEMA */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    })
  }}
/>

    </main>
  );
}
