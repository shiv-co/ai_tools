"use client";

import { useState } from "react";

export default function ImageConverterCore({
  from,
  to,
  title,
  description,
}) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.9);

  /* =============================
     Handle Upload
  ============================== */
  const handleFiles = (selected) => {
    const fileArr = Array.from(selected);

    const previewData = fileArr.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      size: file.size,
    }));

    setFiles(fileArr);
    setPreviews(previewData);
    setResults([]);
  };

  /* =============================
     Convert
  ============================== */
  const convertImages = async () => {
    if (!files.length) return;
    setLoading(true);

    const converted = [];

    for (const file of files) {
      const img = new Image();
      const url = URL.createObjectURL(file);

      await new Promise((res) => {
        img.onload = res;
        img.src = url;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // JPG needs white background
      if (to === "jpg" || to === "jpeg") {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const mime =
        to === "png"
          ? "image/png"
          : to === "webp"
          ? "image/webp"
          : "image/jpeg";

      const output = canvas.toDataURL(mime, quality);

      converted.push({
        name: file.name.replace(/\.\w+$/, `.${to}`),
        url: output,
      });

      URL.revokeObjectURL(url);
    }

    setResults(converted);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-5 md:py-10 space-y-10">

        {/* HEADER */}
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl md:text-4xl font-bold md:font-extrabold">{title}</h1>
          <p className="text-[var(--text-secondary)] text-xs md:text-sm">{description}</p>
        </div>

        {/* UPLOAD */}
        <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8 text-center transition hover:border-[var(--accent)] hover:bg-[var(--accent-opacity-6)]">
          <p className="font-semibold">Upload {from.toUpperCase()} images</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Select one or multiple images
          </p>
          <input
            type="file"
            accept={`image/${from}`}
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
              {previews.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-3"
                >
                  <img
                    src={item.url}
                    alt="Original preview"
                    className="h-40 w-full rounded object-cover"
                  />
                  <p className="mt-2 text-xs text-[var(--text-secondary)] text-center">
                    {(item.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QUALITY */}
        {(to === "jpg" || to === "jpeg" || to === "webp") && (
          <div className="max-w-xs">
            <label className="text-sm font-medium">Output quality</label>
            <select
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            >
              <option value={1}>Best</option>
              <option value={0.9}>High</option>
              <option value={0.8}>Medium</option>
              <option value={0.7}>Small size</option>
            </select>
          </div>
        )}

        {/* ACTION */}
        <button
          onClick={convertImages}
          disabled={!files.length || loading}
          className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Converting…" : `Convert to ${to.toUpperCase()}`}
        </button>

        {/* RESULTS */}
        {results.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-semibold">Converted Images</h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4 space-y-3"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="h-40 w-full rounded-md object-cover"
                  />
                  <a
                    href={img.url}
                    download={img.name}
                    className="block rounded-lg bg-[var(--accent)] px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </main>
  );
}
