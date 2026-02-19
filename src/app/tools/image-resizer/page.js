"use client";

import { useState } from "react";
import Link from "next/link";     

/* ===== Presets ===== */
const PRESETS = {
  instagram_post: { label: "Instagram Post (1:1)", w: 1080, h: 1080 },
  instagram_story: { label: "Instagram Story (9:16)", w: 1080, h: 1920 },
  youtube_thumb: { label: "YouTube Thumbnail (16:9)", w: 1280, h: 720 },
  youtube_banner: { label: "YouTube Banner (16:9)", w: 2560, h: 1440 },
  facebook_post: { label: "Facebook Post (1.91:1)", w: 1200, h: 630 },
};

const FAQS = [
  {
    q: "Is this image resizer free to use?",
    a: "Yes. This image resizer is completely free. There are no limits, watermarks, or sign-ups required.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. All image resizing happens locally in your browser. Your images never leave your device.",
  },
  {
    q: "Can I resize images by percentage?",
    a: "Yes. You can resize images using a percentage slider or enter an exact percentage value manually.",
  },
  {
    q: "Which image formats are supported?",
    a: "This tool supports JPG, PNG, and WebP image formats.",
  },
  {
    q: "Can I resize images for Instagram or YouTube?",
    a: "Yes. Built-in presets are available for Instagram posts, stories, YouTube thumbnails, banners, and more.",
  },
  {
    q: "Does resizing reduce image quality?",
    a: "Resizing may slightly affect quality depending on the size change, but the tool uses high-quality scaling to preserve clarity.",
  },
];

/* ===== Unit conversion (DPI = 96) ===== */
const toPx = (value, unit) => {
  const dpi = 96;
  if (unit === "cm") return Math.round((value * dpi) / 2.54);
  if (unit === "mm") return Math.round((value * dpi) / 25.4);
  if (unit === "inch") return Math.round(value * dpi);
  return value;
};

export default function ImageResizerPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const [mode, setMode] = useState("percentage"); // percentage | size | preset
  const [percentage, setPercentage] = useState(100);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("px");

  const [preset, setPreset] = useState("");
  const [crop, setCrop] = useState(false);

  /* ===== Load image ===== */
  const handleFile = (file) => {
    setFile(file);
    setResult(null);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  /* ===== Core logic ===== */
  const processImage = async () => {
    if (!file) return;

    const img = new Image();
    img.src = preview;

    await new Promise((res) => (img.onload = res));

    let targetW = img.width;
    let targetH = img.height;

    /* ---- Resize logic ---- */
    if (mode === "percentage") {
      targetW = Math.round(img.width * (percentage / 100));
      targetH = Math.round(img.height * (percentage / 100));
    }

    if (mode === "size") {
      if (width) targetW = toPx(Number(width), unit);
      if (height) targetH = toPx(Number(height), unit);
    }

    if (mode === "preset" && preset) {
      targetW = PRESETS[preset].w;
      targetH = PRESETS[preset].h;
    }

    /* ---- Crop logic (center crop) ---- */
    let sx = 0,
      sy = 0,
      sw = img.width,
      sh = img.height;

    if (crop) {
      const targetRatio = targetW / targetH;
      const imgRatio = img.width / img.height;

      if (imgRatio > targetRatio) {
        sw = img.height * targetRatio;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / targetRatio;
        sy = (img.height - sh) / 2;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);

    const output = canvas.toDataURL(file.type || "image/jpeg", 0.92);
    setResult(output);
  };

 


  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-5xl px-4 py-5 md:py-10 space-y-5 md:space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl md:text-4xl font-bold md:font-extrabold">Image Resizer</h1>
          <p className="text-[var(--text-secondary)] md:mt-2 text-sm md:text-base">
            Resize images by percentage, exact size, or social presets.
          </p>
        </div>

        {/* UPLOAD */}
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] p-8 text-center hover:border-[var(--accent)]">
          <p className="font-semibold">Upload image</p>
          <p className="text-sm text-[var(--text-secondary)]">JPG, PNG, WebP</p>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </label>

        {/* PREVIEW */}
        {preview && (
          <div className="rounded-xl border p-2 ">
            <p className="md:mb-2 text-sm font-medium text-center pb-1">Preview</p>
            <img src={preview} className=" max-h-36 md:max-h-52 w-full rounded object-contain" />
          </div>
        )}

        {/* MODE SELECT */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          {["percentage", "size", "preset"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-lg border px-2 md:px-3 py-1 ${
                mode === m ? "bg-[var(--accent)] text-white" : ""
              }`}
            >
              {m === "percentage" ? "Percentage" : m === "size" ? "Size" : "Presets"}
            </button>
          ))}
        </div>

        {/* CONTROLS */}
        {mode === "percentage" && (
<div className="space-y-3">
  <label className="text-sm font-medium">
    Resize percentage
  </label>

  {/* Slider + Input Row */}
  <div className="flex items-center gap-3">
    {/* Slider */}
    <input
      type="range"
      min="10"
      max="200"
      step="1"
      value={percentage}
      onChange={(e) => setPercentage(Number(e.target.value))}
      className="flex-1 accent-[var(--accent)]"
    />

    {/* Percentage Input */}
    <div className="relative w-24 shrink-0">
      <input
        type="number"
        min="10"
        max="500"
        value={percentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
        className="w-full rounded-lg border px-3 py-2 pr-7 text-center"
      />
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)]">
        %
      </span>
    </div>
  </div>

  <p className="text-xs text-[var(--text-secondary)]">
    Tip: 50% halves the image size, 200% doubles it.
  </p>
</div>

)}


        {mode === "size" && (
          <div className="grid grid-cols-3 gap-2">
            <input type="number" placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)} className="rounded border px-2 py-2" />
            <input type="number" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} className="rounded border px-2 py-2" />
            <select value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded border px-2 py-2">
              <option value="px">px</option>
              <option value="cm">cm</option>
              <option value="mm">mm</option>
              <option value="inch">inch</option>
            </select>
          </div>
        )}

        {mode === "preset" && (
          <select value={preset} onChange={(e) => setPreset(e.target.value)} className="w-full rounded border px-3 py-2">
            <option value="">Select preset</option>
            {Object.entries(PRESETS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        )}

        {/* CROP */}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={crop} onChange={() => setCrop(!crop)} />
          Crop to fit
        </label>

        {/* ACTION */}
        <button onClick={processImage} className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white">
          Resize Image
        </button>

        {/* RESULT */}
        {result && (
          <div className="space-y-3">
            <img src={result} className="max-h-64 w-full rounded object-contain" />
            <a href={result} download="resized-image.jpg" className="block rounded-lg bg-[var(--accent)] px-4 py-2 text-center text-white">
              Download Image
            </a>
          </div>
        )}

          <div className="grid gap-6 sm:grid-cols-3 pt-10">
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Fast</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Resize images instantly in your browser.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Private</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Images never leave your device.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
            <h3 className="font-semibold">Free</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              No signup or watermark.
            </p>
          </div>
        </div>
      
      
{/* FAQ SECTION */}
<section className="mx-auto max-w-5xl px-4 pb-20 space-y-6">
  <h2 className="text-2xl sm:text-3xl font-bold">
    Frequently Asked Questions
  </h2>

  <div className="space-y-3">
    {FAQS.map((item, index) => (
      <details
        key={index}
        className="group rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
          <span>{item.q}</span>

          {/* Arrow */}
          <span className="transition-transform duration-300 group-open:rotate-180">
            ▼
          </span>
        </summary>

        <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
          {item.a}
        </p>
      </details>
    ))}
  </div>
</section>
 <section className="max-w-4xl mt-20 space-y-8">
          <h2 className="text-2xl font-bold">
            Resize Images Online  Fast & Secure
          </h2>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Our Image Resizer allows you to resize JPG, PNG, and WebP images instantly in your browser. Your file is never uploaded to any
            server. Everything happens locally on your device.
          </p>

          <h3 className="text-xl font-semibold">How to Resize Images</h3>

          <ul className="list-disc pl-6 text-sm text-[var(--text-secondary)] space-y-2">
            <li>Upload your image file (JPG, PNG, WebP).</li>
            <li>Select new dimensions (pixels, percentage, cm or inches).</li>
            <li>Download the resized image.</li>
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
              href="/tools/jpg-to-webp"
              className="text-[var(--accent)] hover:underline"
            >
              JPG to WebP Converter
            </Link>
            <Link
              href="/tools/image-comppressor"
              className="text-[var(--accent)] hover:underline"
            >
              Image Compressor
            </Link>
          </div>
        </section>



      </section>

       <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
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
            name: "Image Resizer Online Tool",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/image-resizer",
            description:
              "Resize images online for free. Change image dimensions by pixels, percentage, cm or inches. Fast, secure and works directly in your browser.",
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
