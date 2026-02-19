"use client";

import { useState } from "react";
import Link from "next/link";
// import heic2any from "heic2any";

const faqs = [
  {
    q: "What is HEIC format?",
    a: "HEIC is an image format used by Apple devices to save storage space while maintaining high quality.",
  },
  {
    q: " Is this HEIC to JPG converter safe?",
    a: "Yes. All HEIC processing happens locally in your browser. Your files never leave your device.",
  },
  {
    q: "Can I convert multiple HEIC files? ",
    a: "Yes, you can convert multiple HEIC images at once.",
  },
];
export default function HeicToJpgPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleFiles = (selectedFiles) => {
    const heicFiles = Array.from(selectedFiles).filter((file) =>
      file.name.toLowerCase().endsWith(".heic"),
    );
    setFiles(heicFiles);
    setResults([]);
  };

  const convertToJpg = async () => {
    if (!files.length) return;

    setLoading(true);
    setResults([]);

    try {
      const heic2any = (await import("heic2any")).default;

      const converted = [];

      for (const file of files) {
        const outputBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });

        const blob = Array.isArray(outputBlob) ? outputBlob[0] : outputBlob;

        const url = URL.createObjectURL(blob);

        converted.push({
          name: file.name.replace(/\.heic$/i, ".jpg"),
          url,
        });
      }

      setResults(converted);
    } catch (err) {
      console.error("HEIC conversion error:", err);
      alert("Failed to convert HEIC image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 md:py-10 py-5 space-y-10">
        {/* HEADER */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-2xl md:text-4xl md:font-extrabold font-bold">
            HEIC to JPG Converter
          </h1>
          <p className="text-[var(--text-secondary)] text-xs md:text-sm">
            Convert iPhone HEIC images to JPG instantly. All processing happens
            in your browser.
          </p>
        </div>

        {/* UPLOAD */}
        <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8 text-center transition hover:border-[var(--accent)] hover:bg-[var(--accent-opacity-6)]">
          <p className="font-semibold">Upload HEIC images</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Select one or multiple .heic files
          </p>

          {files.length > 0 && (
            <p className="text-xs text-[var(--text-secondary)]">
              Selected files: {files.length}
            </p>
          )}

          <input
            type="file"
            accept=".heic,image/heic"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {/* ACTION */}
        <button
          onClick={convertToJpg}
          disabled={!files.length || loading}
          className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Converting images…" : "Convert to JPG"}
        </button>

        {/* RESULTS */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Converted Images</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4 space-y-3"
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-40 w-full rounded-md object-cover"
                  />
                  <a
                    href={item.url}
                    download={item.name}
                    className="block rounded-lg bg-[var(--accent)] px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Download JPG
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
              Files never leave your device.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">iPhone Friendly</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Designed for HEIC photos from iOS devices.
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

         {/* ================= SEO CONTENT ================= */}
        <section className="max-w-4xl mt-20 space-y-8">
          <h2 className="text-2xl font-bold">
            Convert HEIC to JPG Online – Fast & Secure
          </h2>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Our HEIC to JPG converter allows you to convert HEIC images to JPG format instantly in your browser. Your file is never uploaded to any
            server. Everything happens locally on your device.
          </p>

          <h3 className="text-xl font-semibold">How to Convert HEIC to JPG</h3>

          <ul className="list-disc pl-6 text-sm text-[var(--text-secondary)] space-y-2">
            <li>Upload your HEIC file.</li>
            <li>Click Convert.</li>
            <li>Download the converted JPG file.</li>
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
              href="/tools/compress-image"
              className="text-[var(--accent)] hover:underline"
            >
              Image Compressor
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
       

      
     <script
        id="heic-to-jpg-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
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
            name: "HEIC to JPG Converter Online",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/heic-to-jpg",
            description:
              "Convert HEIC images to JPG format online without any upload or download. Free and secure converter with no uploads.",
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
