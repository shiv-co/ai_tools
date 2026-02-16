"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FaUpload } from "react-icons/fa";
import { useEffect } from "react";


  const faqs = [
  {
    q: "Is this Merge PDF tool free?",
    a: "Yes. This PDF merger is completely free and requires no sign-up."
  },
  {
    q: "Are my PDF files uploaded?",
    a: "No. All PDF processing happens locally in your browser. Your files never leave your device."
  },
  {
    q: " Can I reorder PDFs before merging?",
    a: "Yes. You can change the order using the arrows before merging."
  },
  {
    q: "Is there any file size limit?",
    a: "  There is no fixed limit, but very large files may take longer to process."
  },
 
];


export default function MergePdfPage() {
  const [files, setFiles] = useState([]);
  const [pdfjs, setPdfjs] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadPdfJs = async () => {
      if (typeof window === "undefined") return;

      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");

      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      if (mounted) setPdfjs(pdfjsLib);
    };

    loadPdfJs();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFiles = async (selectedFiles) => {
    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf",
    );

    const result = [];

    for (const file of pdfFiles) {
      const buffer = await file.arrayBuffer();
      if (!pdfjs) return;

      const pdf = await pdfjs.getDocument({ data: buffer }).promise;

      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 0.6 });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      result.push({
        file,
        preview: canvas.toDataURL("image/jpeg", 0.8),
      });
    }

    setFiles(result);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (from, to) => {
    if (to < 0 || to >= files.length) return;
    const updated = [...files];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    setFiles(updated);
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;

    setLoading(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      const date = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `merged-pdf-${date}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Merge error:", err);
      alert("Failed to merge PDFs. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5 md:py-10 space-y-10">
        {/* HEADER */}
        <div className="max-w-3xl  space-y-2 md:space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold md:font-extrabold ">
            Merge PDF Files
          </h1>
          <p className="text-[var(--text-secondary)] text-xs md:text-sm">
            Combine multiple PDF files into one document. Files are processed
            securely in your browser.
          </p>
        </div>

        {/* UPLOAD */}
        <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8 text-center transition hover:border-[var(--accent)] hover:bg-[var(--accent-opacity-6)]">
          <FaUpload className="text-blue-600 dark:text-blue-400" />
          <p className="font-semibold">Upload PDF files</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Select multiple PDFs to merge
          </p>
          <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {/* FILE LIST */}
        {files.length > 0 && (
          <div className="space-y-4">
            <p className="font-medium">Selected PDFs ({files.length})</p>

            <div className="grid gap-4 sm:grid-cols-2">
              {files.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-3"
                >
                  <img
                    src={item.preview}
                    alt="PDF preview"
                    className="h-28 w-20 rounded-md object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <p className="truncate text-sm font-medium">
                      {item.file.name}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <button
                        onClick={() => moveFile(index, index - 1)}
                        className="text-[var(--accent)]"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveFile(index, index + 1)}
                        className="text-[var(--accent)]"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTION */}
        <button
          onClick={mergePDFs}
          disabled={files.length < 2 || loading}
          className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Merging PDFs…" : "Merge PDF Files"}
        </button>

        {/* INFO */}
        <div className="grid gap-6 sm:grid-cols-3 mt-10">
          <div className="rounded-2xl border bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Drag & Drop</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Merge PDFs visually.
            </p>
          </div>
          <div className="rounded-2xl border bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Private</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              PDFs never leave your device.
            </p>
          </div>
          <div className="rounded-2xl border bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Free</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              No limits or watermarks.
            </p>
          </div>
        </div>

        {/* FAQ */}

        <div className="space-y-6">
  <h2 className="text-2xl font-bold">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this Merge PDF tool free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, this Merge PDF tool is completely free and does not require registration.",
                },
              },
              {
                "@type": "Question",
                name: "Are my PDF files uploaded?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All PDF files are processed locally in your browser.",
                },
              },
              {
                "@type": "Question",
                name: "Can I reorder PDFs before merging?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can reorder PDF files before merging them.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a file size limit?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "There is no fixed size limit, but large PDFs may take longer to process.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
