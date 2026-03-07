"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { FaUpload } from "react-icons/fa";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";

const FAQS = [
  {
    q: "How do I convert JPG to PDF?",
    a: "Upload your JPG images, arrange them if needed, and click Convert. Your PDF will be generated instantly.",
  },
  {
    q: "Can I combine multiple JPG images into one PDF?",
    a: "Yes. You can upload multiple JPG files and merge them into a single PDF document.",
  },
  {
    q: "Is JPG to PDF conversion safe?",
    a: "Yes. All processing happens locally in your browser. Your images are never uploaded.",
  },
  {
    q: "Will image quality be reduced?",
    a: "No. Images are preserved in high quality while being converted into PDF format.",
  },
  {
    q: "Is this JPG to PDF tool free?",
    a: "Yes. It is completely free with no watermark or sign-up required.",
  },
];

function SortableItem({ file }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move rounded-lg border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-2 text-sm"
    >
      {file.name}
    </li>
  );
}

export default function JpgToPdfPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // NEW OPTIONS
  const [pageSize, setPageSize] = useState("a4");
  const [margin, setMargin] = useState(10);
  const [compress, setCompress] = useState(true);

  const handleFiles = (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    setImages(valid);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImages((items) => {
      const oldIndex = items.findIndex((i) => i.name === active.id);
      const newIndex = items.findIndex((i) => i.name === over.id);
      const updated = [...items];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);
      return updated;
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setLoading(true);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: pageSize,
    });

    for (let i = 0; i < images.length; i++) {
      const imgData = await readFile(images[i]);
      const imgProps = pdf.getImageProperties(imgData);

      const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const pageHeight = (imgProps.height * pageWidth) / imgProps.width;

      if (i !== 0) pdf.addPage();

      pdf.addImage(
        imgData,
        "JPEG",
        margin,
        margin,
        pageWidth,
        pageHeight,
        undefined,
        compress ? "FAST" : "NONE",
      );
    }

    const filename = `images-to-pdf-${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, "-")}.pdf`;

    pdf.save(filename);
    setLoading(false);
  };

  const readFile = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 md:py-20 py-5 space-y-10">
        {/* HEADER */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold md:font-extrabold">
            JPG to PDF Converter
          </h1>
          <p className="text-[var(--text-secondary)]">
            Convert, reorder, and customize JPG images into a single PDF.
          </p>
        </div>

        {/* UPLOAD */}
        <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)]   p-8 text-center transition hover:border-[var(--accent)] hover:bg-[var(--accent-opacity-6)]">
          {/* Upload Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-10 w-10 text-blue-600 dark:text-blue-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5v-9m0 0l-3 3m3-3l3 3M4.5 15.75v1.5A2.25 2.25 0 006.75 19.5h10.5A2.25 2.25 0 0019.5 17.25v-1.5"
            />
          </svg>

          <p className="text-base font-semibold">Upload JPG Images</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click to upload or drag & drop files
          </p>

          {images.length > 0 && (
            <p className="mt-2 text-xs text-gray-500">
              {images.length} image{images.length > 1 ? "s" : ""} selected
            </p>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className="absolute inset-0 hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {/* IMAGE PREVIEWS */}
        {images.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium">
              Selected Images ({images.length})
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((file, index) => {
                const previewUrl = URL.createObjectURL(file);

                return (
                  <div
                    key={index}
                    className="relative rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-2"
                  >
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 rounded-full bg-black/70 text-white w-6 h-6 text-xs flex items-center justify-center hover:bg-black"
                      aria-label="Remove image"
                    >
                      ✕
                    </button>

                    {/* Image */}
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="h-28 w-full rounded-lg object-cover"
                    />

                    {/* Filename */}
                    <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
                      {file.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* OPTIONS */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm font-medium">Page Size</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            >
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Margin (mm)</label>
            <input
              type="number"
              value={margin}
              min={0}
              max={30}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="flex items-end gap-2">
            <input
              type="checkbox"
              checked={compress}
              onChange={() => setCompress(!compress)}
            />
            <label className="text-sm font-medium">Compress Images</label>
          </div>
        </div>

        {/* REORDER LIST */}
        {images.length > 0 && (
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={images.map((i) => i.name)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="space-y-2">
                {images.map((file) => (
                  <SortableItem key={file.name} file={file} />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}

        {/* ACTION */}
        <button
          onClick={generatePDF}
          disabled={loading || images.length === 0}
          className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Creating PDF..." : "Convert to PDF"}
        </button>

        <section className="max-w-4xl mt-20 space-y-8">
          <h2 className="text-2xl font-bold">
            Convert JPG to PDF Online – Free Image to PDF Converter
          </h2>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Need to convert JPG images into a PDF file? Our free JPG to PDF
            converter allows you to quickly combine one or multiple images into
            a high-quality PDF document directly in your browser.
            No installation. No upload. No watermark. 100% secure
          </p>

          <h3 className="text-xl font-semibold">How This JPG to PDF Converter Works</h3>

          <ul className="list-disc pl-6 text-sm text-[var(--text-secondary)] space-y-2">
            <li>Upload your JPG images.</li>
            <li>Drag and drop images to reorder them.</li>
            <li>Click Convert to PDF.</li>
          </ul>
        </section>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-4">Related PDF Tools</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/tools/merge-pdf"
              className="text-[var(--accent)] hover:underline"
            >
              Merge PDF Files
            </Link>
            <Link
              href="/tools/compress-pdf"
              className="text-[var(--accent)] hover:underline"
            >
              Compress PDF Online
            </Link>
            <Link
              href="/tools/split-pdf"
              className="text-[var(--accent)] hover:underline"
            >
              Split PDF Pages
            </Link>
          </div>
        </section>

        {/* ================= FAQ ================= */}

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
      </section>

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
            name: "JPG to PDF Converter",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/jpg-to-pdf",
            description:
              "Free online JPG to PDF converter. Combine images into a single PDF instantly and securely.",
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
