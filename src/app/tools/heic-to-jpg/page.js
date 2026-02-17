"use client";

import { useState } from "react";
// import heic2any from "heic2any";

export default function HeicToJpgPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleFiles = (selectedFiles) => {
    const heicFiles = Array.from(selectedFiles).filter((file) =>
      file.name.toLowerCase().endsWith(".heic")
    );
    setFiles(heicFiles);
    setResults([]);
  };

  // const convertToJpg = async () => {
  //   if (!files.length) return;

  //   setLoading(true);
  //   setResults([]);

  //   try {
  //     const converted = [];

  //     for (const file of files) {
  //       const outputBlob = await heic2any({
  //         blob: file,
  //         toType: "image/jpeg",
  //         quality: 0.9,
  //       });

  //       const blob = Array.isArray(outputBlob)
  //         ? outputBlob[0]
  //         : outputBlob;

  //       const url = URL.createObjectURL(blob);

  //       converted.push({
  //         name: file.name.replace(/\.heic$/i, ".jpg"),
  //         url,
  //       });
  //     }

  //     setResults(converted);
  //   } catch (err) {
  //     console.error("HEIC conversion error:", err);
  //     alert("Failed to convert HEIC image. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

      const blob = Array.isArray(outputBlob)
        ? outputBlob[0]
        : outputBlob;

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
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">

        {/* HEADER */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            HEIC to JPG Converter
          </h1>
          <p className="text-[var(--text-secondary)]">
            Convert iPhone HEIC images to JPG instantly.
            All processing happens in your browser.
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
            <h2 className="text-xl font-semibold">
              Converted Images
            </h2>

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
        <section className="max-w-4xl pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
              <h3 className="font-semibold">What is HEIC format?</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                HEIC is an image format used by Apple devices to save storage
                space while maintaining high quality.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
              <h3 className="font-semibold">Is this HEIC to JPG converter safe?</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Yes. All image conversion happens locally in your browser.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
              <h3 className="font-semibold">Can I convert multiple HEIC files?</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Yes, you can convert multiple HEIC images at once.
              </p>
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
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is HEIC format?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "HEIC is an image format used by Apple devices to store photos efficiently with high quality."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is HEIC to JPG conversion safe?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all HEIC to JPG conversion happens locally in your browser and files are never uploaded."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I convert multiple HEIC files at once?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can upload and convert multiple HEIC images in one go."
                  }
                }
              ]
            }),
          }}
        />

      </section>
    </main>
  );
}
