"use client";

import { useEffect, useState } from "react";
import JSZip from "jszip";
import { FaUpload } from "react-icons/fa";
import DragContainer from "@/components/DragContainer";
import Link from "next/link";

const FAQS = [
  {
    q: "How do I convert PDF to JPG?",
    a: "Upload your PDF file, choose image quality, and click convert. Each page will be converted into a JPG image instantly.",
  },
  {
    q: "Is PDF to JPG conversion safe?",
    a: "Yes. All processing happens locally in your browser. Your PDF files are never uploaded.",
  },
  {
    q: "Can I convert multiple pages?",
    a: "Yes. Every page in your PDF is automatically converted into a separate JPG image.",
  },
  {
    q: "Will image quality be preserved?",
    a: "Yes. You can choose different quality levels to balance file size and clarity.",
  },
  {
    q: "Can I download all JPG images at once?",
    a: "Yes. You can download all converted pages together as a ZIP file.",
  },
];

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
      <section className="mx-auto max-w-4xl px-4 py-10 space-y-10">
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

      <section className="mt-24 space-y-10 mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold">
          Convert PDF to JPG Online – Free & Secure PDF Image Converter
        </h2>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Converting PDF files into JPG images is one of the most common
          document tasks today. Whether you need to share a specific page as an
          image, upload it to social media, or insert it into a presentation,
          converting PDF to JPG makes the process simple and efficient.
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Our free PDF to JPG converter allows you to extract each page of your
          PDF file as a high-quality JPG image directly in your browser. No
          software installation, no registration, and no uploads required.
        </p>

        <h3 className="text-xl font-semibold">How to Convert PDF to JPG?</h3>

        <ol className="list-decimal pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
          <li>Click the upload button and select your PDF file.</li>
          <li>Wait for the PDF to JPG conversion process to complete.</li>
          <li>Download your JPG images instantly.</li>
        </ol>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          The process takes only seconds depending on the size of your PDF
          file.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold">
          Why Convert PDF to JPG?
        </h2>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          PDF is a document format that preserves text and images in their original
          layout. However, sometimes you need to convert PDF pages into image
          formats like JPG for easier sharing or editing.
        </p>

        <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
          <li>Extract images from PDFs</li>
          <li>Save PDF pages as high-quality JPG images</li>
          <li>Convert scanned documents into editable image formats</li>
          <li>Create image-based presentations from PDFs</li>
          <li>Share specific PDF pages as images without uploading</li>
        </ul>

        <h2 className="text-2xl sm:text-3xl font-bold">
          100% Private PDF to JPG Conversion
        </h2>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Many online converters upload your PDFs to remote servers. This can
          pose privacy risks, especially if your content contains sensitive
          information.
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Our converter processes everything locally in your browser. Your files
          are never uploaded, stored, or shared. This ensures complete privacy
          and faster performance.
        </p>


        <p className="text-[var(--text-secondary)] leading-relaxed">
          The JPG format is widely supported across devices including
          smartphones, tablets, laptops, and digital cameras.
          It provides excellent image quality while keeping file size small.
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Our tool preserves high-quality images during conversion, ensuring
          clear output suitable for presentations, sharing, and professional usage.
          professional usage.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold">
          No Installation Required
        </h2>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          You do not need to download or install any software. The PDF to JPG
          converter works directly in your browser on:
        </p>

        <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
          <li>Windows</li>
          <li>macOS</li>
          <li>Linux</li>
          <li>Android</li>
          <li>iOS</li>
        </ul>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Simply open the tool, upload your file, and download the JPG images.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold">
          Frequently Asked Use Cases
        </h2>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Students often convert recorded lectures into JPG images for offline
          viewing. Content creators extract background images from their
          PDFs. Professionals convert scanned documents into editable image formats.
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          PDF to JPG conversion is one of the most commonly searched
          document-to-image tasks online, making it an essential productivity tool.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold">
          Related Tools You May Like
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Link
            className="text-[var(--accent)] hover:underline cursor-pointer"
            href="/tools/merge-pdf"
          >
            Merge PDF files
          </Link>
          <Link
            className="text-[var(--accent)] hover:underline cursor-pointer"
            href="/tools/compress-pdf"
          >
            Compress PDF documents
          </Link>
          <Link
            className="text-[var(--accent)] hover:underline cursor-pointer"
            href="/tools/jpg-to-pdf"
          >
            Convert JPG to PDF
          </Link>
          <Link
            className="text-[var(--accent)] hover:underline cursor-pointer"
            href="/tools/image-compressor"
          >
            Image Compressor
          </Link>
        </div>

        <p className="text-[var(--text-secondary)] leading-relaxed pb-4">
          Explore more free browser-based tools designed to improve your
          workflow and productivity.
        </p>
      </section>

      <div className="space-y-6 max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {FAQS.map((item, index) => (
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "PDF to JPG Converter",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/pdf-to-jpg",
            description:
              "Free online PDF to JPG converter. Extract PDF pages as high-quality JPG images instantly.",
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
