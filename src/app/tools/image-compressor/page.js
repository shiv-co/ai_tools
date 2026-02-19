"use client";

import { useState } from "react";
import JSZip from "jszip";
import Link from "next/link";

/* =============================
   FAQ DATA
============================= */
const FAQS = [
  {
    q: "Is this image compressor free to use?",
    a: "Yes. This image compressor is completely free with no limits or watermarks.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. All compression happens locally in your browser. Your images never leave your device.",
  },
  {
    q: "Which image formats are supported?",
    a: "This tool supports JPG, PNG, and WebP image formats.",
  },
  {
    q: "Why is PNG compression limited?",
    a: "PNG is a lossless format and already optimized. For better size reduction, convert PNG to WebP or JPG.",
  },
  {
    q: "Can I compress multiple images at once?",
    a: "Yes. You can upload and compress multiple images together and download them as a ZIP file.",
  },
];

export default function ImageCompressorPage() {
  const [previews, setPreviews] = useState([]);
  const [results, setResults] = useState([]);
  const [quality, setQuality] = useState(75);
  const [loading, setLoading] = useState(false);

  /* =============================
     Handle upload + preview
  ============================== */
  const handleFiles = (selectedFiles) => {
    const filesArr = Array.from(selectedFiles);

    const previewData = filesArr.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
    }));

    setPreviews(previewData);
    setResults([]);
  };

  /* =============================
     Compression logic
  ============================== */
  const compressImages = async () => {
    if (!previews.length) return;
    setLoading(true);

    const compressed = [];

    for (const item of previews) {
      const img = new Image();
      img.src = item.url;
      await new Promise((res) => (img.onload = res));

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);

      const mime =
        item.type === "image/webp"
          ? "image/webp"
          : item.type === "image/png"
          ? "image/png"
          : "image/jpeg";

      const output = canvas.toDataURL(mime, quality / 100);

      compressed.push({
        name: item.file.name,
        originalUrl: item.url,
        compressedUrl: output,
        originalSize: item.size,
        newSize: Math.round((output.length * 3) / 4),
      });
    }

    setResults(compressed);
    setLoading(false);
  };

  /* =============================
     ZIP DOWNLOAD
  ============================== */

  const downloadZip = async () => {
    const zip = new JSZip();

    results.forEach((img) => {
      const base64 = img.compressedUrl.split(",")[1];
      zip.file(`compressed-${img.name}`, base64, { base64: true });
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed-images.zip";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* HEADER */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Image Compressor
          </h1>
          <p className="text-[var(--text-secondary)]">
            Compress JPG, PNG, and WebP images online.
            All processing happens locally in your browser.
          </p>
        </div>

        {/* UPLOAD */}
        <label className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8 text-center hover:border-[var(--accent)]">
          <p className="font-semibold">Upload images</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Select one or multiple images
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {/* ORIGINAL PREVIEW */}
        {previews.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Original Images</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {previews.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-3"
                >
                  <img
                    src={item.url}
                    className="h-40 w-full rounded object-cover"
                    alt="Original preview"
                  />
                  <p className="mt-2 text-xs text-center text-[var(--text-secondary)]">
                    {(item.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QUALITY CONTROL */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Compression level
          </label>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min="30"
              max="95"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="flex-1 accent-[var(--accent)]"
            />

            <div className="relative w-24">
              <input
                type="number"
                min="30"
                max="95"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full rounded-lg border px-3 py-2 pr-7 text-center"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)]">
                %
              </span>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)]">
            Recommended: 70–80%. PNG compression is limited due to lossless format.
          </p>
        </div>

        {/* ACTION */}
        <button
          onClick={compressImages}
          disabled={!previews.length || loading}
          className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Compressing images…" : "Compress Images"}
        </button>

        {/* RESULTS */}
        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-xl font-semibold">Compressed Images</h2>
              <button
                onClick={downloadZip}
                className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
              >
                Download ZIP
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((img, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <img
                      src={img.originalUrl}
                      className="h-32 w-full rounded object-cover"
                      alt="Original"
                    />
                    <img
                      src={img.compressedUrl}
                      className="h-32 w-full rounded object-cover"
                      alt="Compressed"
                    />
                  </div>

                  <div className="text-xs text-[var(--text-secondary)]">
                    <p>Original: {(img.originalSize / 1024).toFixed(1)} KB</p>
                    <p>Compressed: {(img.newSize / 1024).toFixed(1)} KB</p>
                  </div>

                  <a
                    href={img.compressedUrl}
                    download={`compressed-${img.name}`}
                    className="block rounded-lg bg-[var(--accent)] px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {/* INFO CARDS */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Private</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Files never leave your device. All compression happens locally in your browser.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Supports JPG,PNG,WebP</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              JPG:lossy compression,PNG: limited compression, WebP: modern optimized format
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Free</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              No sign-up, no limits for basic use.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <section className="pt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((item, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold list-none">
                  {item.q}
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mt-20 space-y-8">
          <h2 className="text-2xl font-bold">
            Compress Images Online  Fast & Secure
          </h2>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Our Image Compressor allows you to compress JPG, PNG, and WebP images instantly in your browser. Your file is never uploaded to any
            server. Everything happens locally on your device.
          </p>

          <h3 className="text-xl font-semibold">How to Compress Images</h3>

          <ul className="list-disc pl-6 text-sm text-[var(--text-secondary)] space-y-2">
            <li>Upload your image file (JPG, PNG, WebP).</li>
            <li>Select compression level.</li>
            <li>Download the compressed image.</li>
          </ul>
        </section>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-4">Related Images Tools</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/tools/png-to-jpg"
              className="text-[var(--accent)] hover:underline"
            >
              PNG to JPG Converter
            </Link>
            <Link
              href="/tools/jpg-to-webp"
              className="text-[var(--accent)] hover:underline"
            >
              JPG to WebP Converter
            </Link>
            <Link
              href="/tools/image-resizer"
              className="text-[var(--accent)] hover:underline"
            >
              Image Resizer
            </Link>
          </div>
        </section>
      </section>

    
      
      {/* FAQ SCHEMA (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />

       {/* SOFTWARE APPLICATION SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Image Compressor Online Tool",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/image-compressor",
            description:
              "Compress images online for free. Reduce JPG, PNG, and WebP file size instantly without losing quality. Secure, fast, and works directly in your browser.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />

    </main>
  );
}
