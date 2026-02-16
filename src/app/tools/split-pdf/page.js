"use client";

import { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FaUpload } from "react-icons/fa";

/* =============================
   Helpers
============================= */

const readFile = (file) =>
  new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.readAsArrayBuffer(file);
  });

const faqs = [
  {
    q: "How do I split a PDF by selecting pages?",
    a: "Upload your PDF, select the pages you want to extract, and click Split PDF. Only selected pages will be downloaded.",
  },
  {
    q: "Are my files uploaded to a server?",
    a: "No. All PDF processing happens locally in your browser. Your files never leave your device.",
  },
  {
    q: "Can I select multiple pages?",
    a: "Yes. You can select any combination of pages before splitting.",
  },
];

export default function SplitPdfPage() {
  const [pdfjs, setPdfjs] = useState(null);
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =============================
     Load PDF.js (Stable)
  ============================== */

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
    return () => (mounted = false);
  }, []);

  /* =============================
     Upload + Generate Previews
  ============================== */

  const handleUpload = async (pdfFile) => {
    if (!pdfFile || !pdfjs) return;

    setLoading(true);
    setFile(pdfFile);
    setPreviews([]);

    const buffer = await readFile(pdfFile);

    // Load with pdf-lib (for splitting)
    const doc = await PDFDocument.load(buffer);
    setPdfDoc(doc);

    // Load with pdfjs (for preview)
    const pdf = await pdfjs.getDocument({ data: buffer }).promise;

    const output = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      output.push({
        index: pageNum - 1,
        page: pageNum,
        url: canvas.toDataURL("image/jpeg", 0.8),
        selected: true,
      });
    }

    setPreviews(output);
    setLoading(false);
  };

  /* =============================
     Split Selected Pages
  ============================== */

  const splitPdf = async () => {
    if (!pdfDoc) return;

    const selectedIndexes = previews
      .filter((p) => p.selected)
      .map((p) => p.index);

    if (!selectedIndexes.length) {
      alert("Please select at least one page.");
      return;
    }

    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdfDoc, selectedIndexes);

    pages.forEach((p) => newPdf.addPage(p));

    const bytes = await newPdf.save();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `split-pdf-${Date.now()}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
  };

  /* =============================
     UI
  ============================== */

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-4xl px-4 py-5 md:py-10 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className=" text-2xl md:text-3xl font-bold md:font-extrabold">
            Split PDF by Selecting Pages
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Upload your PDF and choose which pages to extract.
          </p>
        </div>

        {/* UPLOAD */}
        {!file && (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-12 text-center hover:border-[var(--accent)]">
            <FaUpload className="text-blue-600 dark:text-blue-400 text-xl" />
            <p className="font-semibold">Upload PDF</p>
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          </label>
        )}

        {loading && (
          <p className="text-sm text-[var(--text-secondary)]">
            Generating previews…
          </p>
        )}

        {/* PREVIEW GRID */}
        {previews.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Select Pages to Extract
              </h2>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previews.map((page, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-2"
                >
                  <img
                    src={page.url}
                    alt={`Page ${page.page}`}
                    className="rounded-lg"
                  />

                  <input
                    type="checkbox"
                    checked={page.selected}
                    onChange={() =>
                      setPreviews((prev) =>
                        prev.map((p, i) =>
                          i === idx
                            ? { ...p, selected: !p.selected }
                            : p
                        )
                      )
                    }
                    className="absolute top-2 left-2 w-5 h-5 accent-[var(--accent)]"
                  />

                  <p className="text-center text-sm mt-2">
                    Page {page.page}
                  </p>
                  
                </div>
              ))}
              
            </div>
            
              <button
                onClick={splitPdf}
                className="rounded-xl bg-[var(--accent)] px-6 py-2 text-white font-semibold"
              >
                Split PDF
              </button>
          </>
        )}

        
         {/* INFO */}
        <div className="grid gap-6 sm:grid-cols-3 mt-10">
          <div className="rounded-2xl border bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Easy and Quick</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Split your PDF in seconds.
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

        {/* FAQ SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />

      </section>
    </main>
  );
}
