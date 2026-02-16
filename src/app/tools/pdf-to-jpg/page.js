"use client";

import { useEffect, useState } from "react";
import JSZip from "jszip";
import { FaUpload } from "react-icons/fa";
import DragContainer from "@/components/DragContainer";

export default function PdfToJpgPage() {
  const [pdfjs, setPdfjs] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [quality, setQuality] = useState(0.8);

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
     Upload + Convert
  ============================== */

  const handlePdfUpload = async (file) => {
    if (!file || !pdfjs) return;

    setImages([]);
    setPdfName(file.name.replace(/\.pdf$/i, ""));
    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      const output = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const imgUrl = canvas.toDataURL("image/jpeg", quality);

        output.push({
          id: `page-${pageNum}`,
          page: pageNum,
          url: imgUrl,
        });
      }

      setImages(output);
    } catch (err) {
      console.error("PDF conversion error:", err);
      alert("Failed to convert PDF.");
    } finally {
      setLoading(false);
    }
  };

  /* =============================
     Download ZIP (Respects Order)
  ============================== */

  const downloadZip = async () => {
    const zip = new JSZip();

    images.forEach((img, index) => {
      const base64 = img.url.split(",")[1];
      zip.file(`${pdfName}-page-${index + 1}.jpg`, base64, { base64: true });
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${pdfName}-jpg-images.zip`;
    a.click();

    URL.revokeObjectURL(url);
  };

  /* =============================
     UI
  ============================== */

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-5xl px-4 py-10 space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-extrabold">PDF to JPG Converter</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Convert PDF pages into JPG images instantly. Drag to reorder before
            downloading.
          </p>
        </div>

        {/* UPLOAD */}
        <label className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8 text-center hover:border-[var(--accent)] hover:bg-[var(--accent-opacity-6)]">
          <FaUpload className="text-blue-600 dark:text-blue-400 text-xl" />
          <p className="font-semibold">Upload PDF file</p>
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => handlePdfUpload(e.target.files[0])}
          />
        </label>

        {/* QUALITY */}
        <div className="max-w-xs">
          <label className="text-sm font-medium">Image Quality</label>
          <select
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            <option value={0.6}>Low</option>
            <option value={0.8}>Medium</option>
            <option value={0.95}>High</option>
          </select>
        </div>

        {loading && (
          <p className="text-sm text-[var(--text-secondary)]">
            Converting pages…
          </p>
        )}

        {/* OUTPUT */}
        {images.length > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">
                Converted Pages ({images.length})
              </h2>

              <button
                onClick={downloadZip}
                className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white"
              >
                Download All as ZIP
              </button>
            </div>

            {/* DRAG CONTAINER */}
            <DragContainer
              items={images}
              setItems={setImages}
              layout="grid"
              renderItem={(img) => (
                <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-2">
                  <img
                    src={img.url}
                    alt={`Page ${img.page}`}
                    className="rounded-lg"
                  />

                  <a
                    href={img.url}
                    download={`${pdfName}-page-${img.page}.jpg`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 block text-center text-sm font-medium text-[var(--accent)] hover:underline"
                  >
                    Download Page {img.page}
                  </a>
                </div>
              )}
            />
          </>
        )}
      </section>
    </main>
  );
}
