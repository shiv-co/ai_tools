"use client";

import { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FaUpload } from "react-icons/fa";

const faqs = [
  {
    q: "How do I reorder pages in a PDF?",
    a: "Upload your PDF, drag and drop pages to rearrange them, then download the reordered PDF instantly.",
  },
  {
    q: "Is my PDF uploaded to a server?",
    a: "No. All PDF processing happens locally in your browser. Your files never leave your device.",
  },
  {
    q: "Can I reorder pages on mobile?",
    a: "Yes. On mobile devices, you can use the up and down buttons to move pages instead of drag and drop.",
  },
  {
    q: "Is there any file size limit?",
    a: "There is no hard limit. As long as your browser can handle the PDF, you can reorder it.",
  },
  {
    q: "Is this Reorder PDF tool free?",
    a: "Yes. This tool is completely free with no watermarks or registration required.",
  },
];

/* =============================
   He
============================= */

const readFile = (file) =>
  new Promise((res) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.readAsArrayBuffer(file);
  });

const moveItem = (arr, from, to) => {
  const updated = [...arr];
  const [item] = updated.splice(from, 1);
  updated.splice(to, 0, item);
  return updated;
};

export default function ReorderPdfPage() {
  const [pdfjs, setPdfjs] = useState(null);
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =============================
     Load PDF.js (Stable Legacy)
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
    setPages([]);

    const buffer = await readFile(pdfFile);

    // Load for editing
    const doc = await PDFDocument.load(buffer);
    setPdfDoc(doc);

    // Load for preview
    const pdf = await pdfjs.getDocument({ data: buffer }).promise;

    const previewPages = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.2 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      previewPages.push({
        index: pageNum - 1,
        preview: canvas.toDataURL("image/jpeg", 0.8),
      });
    }

    setPages(previewPages);
    setLoading(false);
  };

  /* =============================
     Drag & Drop
  ============================== */

  const onDragStart = (index) => setDragIndex(index);

  const onDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    setPages((prev) => moveItem(prev, dragIndex, index));
    setDragIndex(null);
  };

  /* =============================
     Mobile helpers
  ============================== */

  const moveUp = (index) => {
    if (index === 0) return;
    setPages((prev) => moveItem(prev, index, index - 1));
  };

  const moveDown = (index) => {
    if (index === pages.length - 1) return;
    setPages((prev) => moveItem(prev, index, index + 1));
  };

  /* =============================
     Save reordered PDF
  ============================== */

  const savePdf = async () => {
    if (!pdfDoc) return;

    const newPdf = await PDFDocument.create();

    const pageOrder = pages.map((p) => p.index);
    const copiedPages = await newPdf.copyPages(pdfDoc, pageOrder);

    copiedPages.forEach((p) => newPdf.addPage(p));

    const bytes = await newPdf.save();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `reordered-pdf-${Date.now()}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
  };

  /* =============================
     UI
  ============================== */

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-4xl px-4 py-5 md:py-10 space-y-10">
        <div>
          <h1 className="text-xl md:text-3xl font-bold md:font-extrabold">Reorder PDF Pages</h1>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-2">
            Drag pages visually to rearrange your PDF.
          </p>
        </div>
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
        {loading && <p>Generating previews…</p>}
        {pages.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {pages.map((page, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => onDragStart(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(index)}
                  className="relative rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-3 cursor-move hover:shadow-lg transition"
                >
                  <img
                    src={page.preview}
                    alt={`Page ${page.index + 1}`}
                    className="rounded-lg w-full"
                  />

                  <p className="text-center text-sm mt-2 font-medium">
                    Page {page.index + 1}
                  </p>

                  {/* Mobile controls */}
                  <div className="flex justify-center gap-2 mt-2 sm:hidden">
                    <button
                      onClick={() => moveUp(index)}
                      className="rounded border px-2"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      className="rounded border px-2"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={savePdf}
                className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white"
              >
                Download Reordered PDF
              </button>

              <button
                onClick={() => {
                  setFile(null);
                  setPages([]);
                  setPdfDoc(null);
                }}
                className="rounded-xl border px-6 py-3 font-semibold"
              >
                Reset
              </button>
            </div>
          </>
        )}
        {/* INFO */}
        <div className="grid gap-6 sm:grid-cols-3 mt-10">
          <div className="rounded-2xl border bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Drag & Drop</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Reorder pages visually.
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
      <script
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
    </main>
  );
}
