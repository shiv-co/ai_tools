"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { FaUpload } from "react-icons/fa";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    const valid = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
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
      const pageHeight =
        (imgProps.height * pageWidth) / imgProps.width;

      if (i !== 0) pdf.addPage();

      pdf.addImage(
        imgData,
        "JPEG",
        margin,
        margin,
        pageWidth,
        pageHeight,
        undefined,
        compress ? "FAST" : "NONE"
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

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this JPG to PDF converter free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, this JPG to PDF converter is completely free and requires no sign-up."
          }
        },
        {
          "@type": "Question",
          "name": "Are my images uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. All images are processed locally in your browser and are never uploaded."
          }
        },
        {
          "@type": "Question",
          "name": "Can I upload multiple JPG images?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can upload multiple JPG images and combine them into one PDF."
          }
        },
        {
          "@type": "Question",
          "name": "Does this tool work on mobile devices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the JPG to PDF converter works on mobile devices, though performance depends on device capability."
          }
        }
      ]
    }),
  }}
/>



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

  <p className="text-base font-semibold">
    Upload JPG Images
  </p>

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
            <img src={previewUrl} alt={file.name} className="h-28 w-full rounded-lg object-cover"/>

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
            <label className="text-sm font-medium">
              Margin (mm)
            </label>
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
            <label className="text-sm font-medium">
              Compress Images
            </label>
          </div>
        </div>

        {/* REORDER LIST */}
        {images.length > 0 && (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
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

        {/* ================= FAQ ================= */}
<section className="mt-24 max-w-4xl">
  <h2 className="text-2xl sm:text-3xl font-bold mb-6">
    Frequently Asked Questions
  </h2>

  <div className="space-y-4">
    <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
      <h3 className="font-semibold">
        Is this JPG to PDF converter free?
      </h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Yes. This tool is completely free and does not require sign-up.
      </p>
    </div>

    <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
      <h3 className="font-semibold">
        Are my images uploaded to a server?
      </h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        No. All images are processed locally in your browser. Nothing is uploaded.
      </p>
    </div>

    <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
      <h3 className="font-semibold">
        Can I upload multiple JPG images?
      </h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Yes. You can upload multiple images and combine them into one PDF.
      </p>
    </div>

    <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
      <h3 className="font-semibold">
        Will this work on mobile devices?
      </h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Yes, though very large images may take longer on low-end devices.
      </p>
    </div>
  </div>
</section>


      </section>
    </main>
  );
}
