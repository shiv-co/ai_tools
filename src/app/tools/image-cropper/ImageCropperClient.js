"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

/* ─────────────────────────────────────────────────────────────────────────────
   ASPECT RATIO PRESETS
───────────────────────────────────────────────────────────────────────────── */
const ASPECTS = [
  { label: "Free",  value: null,              icon: "⊹" },
  { label: "1 : 1", value: 1,                 icon: "⬜" },
  { label: "4 : 3", value: 4 / 3,             icon: "▬" },
  { label: "16 : 9",value: 16 / 9,            icon: "▬" },
  { label: "3 : 2", value: 3 / 2,             icon: "▬" },
  { label: "9 : 16",value: 9 / 16,            icon: "▯" },
  { label: "2 : 3", value: 2 / 3,             icon: "▯" },
];

const FORMATS = [
  { label: "JPG",  value: "image/jpeg", ext: "jpg"  },
  { label: "PNG",  value: "image/png",  ext: "png"  },
  { label: "WebP", value: "image/webp", ext: "webp" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   HELPER — get canvas with crop + rotation + flip applied
   Uses the actual rendered <img> size (from imgRef) to compute pixel scale.
───────────────────────────────────────────────────────────────────────────── */
function buildCanvas(imgEl, completedCrop, rotation, flipH, flipV) {
  if (!imgEl || !completedCrop?.width || !completedCrop?.height) return null;

  // Actual scale between rendered size and natural size
  const scaleX = imgEl.naturalWidth  / imgEl.width;
  const scaleY = imgEl.naturalHeight / imgEl.height;

  const cropW = completedCrop.width  * scaleX;
  const cropH = completedCrop.height * scaleY;

  // Normalise rotation to 0–359
  const deg = ((rotation % 360) + 360) % 360;
  const rad = (deg * Math.PI) / 180;
  const swap = deg === 90 || deg === 270;

  const canvas = document.createElement("canvas");
  canvas.width  = swap ? cropH : cropW;
  canvas.height = swap ? cropW : cropH;

  const ctx = canvas.getContext("2d");

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.drawImage(
    imgEl,
    completedCrop.x * scaleX,
    completedCrop.y * scaleY,
    cropW,
    cropH,
    -cropW / 2,
    -cropH / 2,
    cropW,
    cropH
  );

  return canvas;
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function ImageCropperPage() {
  const [imageSrc,      setImageSrc]      = useState(null);
  const [fileName,      setFileName]      = useState("image");
  const [crop,          setCrop]          = useState({ unit: "%", width: 60, height: 60, x: 20, y: 20 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect,        setAspect]        = useState(null);
  const [rotation,      setRotation]      = useState(0);
  const [flipH,         setFlipH]         = useState(false);
  const [flipV,         setFlipV]         = useState(false);
  const [quality,       setQuality]       = useState(92);
  const [format,        setFormat]        = useState(FORMATS[0]);
  const [preview,       setPreview]       = useState(null);   // data-url for result preview
  const [cropInfo,      setCropInfo]      = useState(null);   // { w, h } natural px
  const [isDragging,    setIsDragging]    = useState(false);
  const [activeAspect,  setActiveAspect]  = useState(null);   // label string

  const imgRef      = useRef(null);
  const fileInputRef = useRef(null);

  /* ── cleanup object URLs ───────────────────────────────── */
  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  /* ── load file ─────────────────────────────────────────── */
  const loadFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (imageSrc?.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
    setFileName(file.name.replace(/\.[^.]+$/, "") || "image");
    setImageSrc(URL.createObjectURL(file));
    // reset state
    setCompletedCrop(null);
    setPreview(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setAspect(null);
    setActiveAspect(null);
    setCrop({ unit: "%", width: 60, height: 60, x: 20, y: 20 });
  };

  /* ── image onLoad: set initial crop + info ─────────────── */
  const onImageLoad = useCallback((e) => {
    const { naturalWidth: nw, naturalHeight: nh } = e.currentTarget;
    setCropInfo({ w: nw, h: nh });
    setCrop({ unit: "%", width: 60, height: 60, x: 20, y: 20 });
  }, []);

  /* ── update cropInfo when crop changes ─────────────────── */
  const handleCropComplete = useCallback((c) => {
    setCompletedCrop(c);
    if (imgRef.current && c.width && c.height) {
      const scaleX = imgRef.current.naturalWidth  / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      setCropInfo({
        w: Math.round(c.width  * scaleX),
        h: Math.round(c.height * scaleY),
      });
    }
  }, []);

  /* ── aspect ratio select ───────────────────────────────── */
  const handleAspect = (preset) => {
    setAspect(preset.value);
    setActiveAspect(preset.label);
    if (preset.value) {
      setCrop({ unit: "%", width: 60, x: 20, y: 20 });
    } else {
      setCrop({ unit: "%", width: 60, height: 60, x: 20, y: 20 });
    }
  };

  /* ── rotate ────────────────────────────────────────────── */
  const rotate = (dir) => {
    setRotation((r) => r + (dir === "cw" ? 90 : -90));
    setPreview(null);
  };

  /* ── crop & download ───────────────────────────────────── */
  const handleCropAndDownload = () => {
    const canvas = buildCanvas(imgRef.current, completedCrop, rotation, flipH, flipV);
    if (!canvas) return;

    const q = format.value === "image/png" ? 1 : quality / 100;
    const dataUrl = canvas.toDataURL(format.value, q);
    setPreview(dataUrl);

    // Trigger download immediately
    const a = document.createElement("a");
    a.href     = dataUrl;
    a.download = `${fileName}-cropped.${format.ext}`;
    a.click();
  };

  /* ── drag & drop ───────────────────────────────────────── */
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  /* ─────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        .ic-root {
          --ic-ff-head: 'Syne', sans-serif;
          --ic-ff-body: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text-primary);
          font-family: var(--ic-ff-body);
        }

        /* ── PAGE LAYOUT ──────────────────────────────── */
        .ic-page {
          max-width: 1080px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }

        /* ── HEADER ───────────────────────────────────── */
        .ic-header { margin-bottom: 36px; }
        .ic-breadcrumb {
          font-size: 0.72rem;
          color: var(--text-secondary);
          margin-bottom: 10px;
          font-family: var(--ic-ff-head);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .ic-breadcrumb a { color: var(--accent); text-decoration: none; }
        .ic-title {
          font-family: var(--ic-ff-head);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .ic-title span { color: var(--accent); }
        .ic-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ── UPLOAD ZONE ──────────────────────────────── */
        .ic-upload {
          border: 2px dashed var(--border);
          border-radius: 20px;
          padding: 56px 24px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 14px; cursor: pointer;
          background: var(--surface);
          transition: border-color 0.2s, background 0.2s;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .ic-upload::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 60% at 50% 0%, var(--accent-opacity-6, rgba(80,105,231,0.06)) 0%, transparent 70%);
        }
        .ic-upload:hover, .ic-upload.dragging {
          border-color: var(--accent);
          background: var(--accent-opacity-6, rgba(80,105,231,0.06));
        }
        .ic-upload-icon {
          width: 64px; height: 64px; border-radius: 16px;
          background: var(--accent-opacity-10, rgba(80,105,231,0.10));
          border: 1px solid var(--accent-opacity-20, rgba(80,105,231,0.20));
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
        }
        .ic-upload-title {
          font-family: var(--ic-ff-head);
          font-size: 1.05rem; font-weight: 700;
          color: var(--text-primary);
        }
        .ic-upload-sub {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .ic-upload-btn {
          font-family: var(--ic-ff-head);
          font-size: 0.78rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          background: var(--accent); color: #fff;
          padding: 10px 24px; border-radius: 8px;
          border: none; cursor: pointer;
          transition: opacity 0.18s;
        }
        .ic-upload-btn:hover { opacity: 0.85; }

        /* ── EDITOR LAYOUT ────────────────────────────── */
        .ic-editor {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 20px;
          align-items: start;
        }

        /* ── CANVAS AREA ──────────────────────────────── */
        .ic-canvas-card {
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          background: var(--surface);
        }
        .ic-canvas-top {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
        }
        .ic-canvas-label {
          font-family: var(--ic-ff-head);
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--text-secondary);
        }
        .ic-crop-dims {
          font-family: var(--ic-ff-head);
          font-size: 0.72rem; font-weight: 700;
          color: var(--accent);
          background: var(--accent-opacity-10, rgba(80,105,231,0.10));
          border: 1px solid var(--accent-opacity-20, rgba(80,105,231,0.20));
          padding: 3px 10px; border-radius: 999px;
        }
        .ic-canvas-body {
          position: relative;
          min-height: 400px;
          max-height: 520px;
          background: #0a0a0a;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        /* Override ReactCrop to fill available space */
        .ic-canvas-body .ReactCrop {
          max-height: 520px;
          display: flex; align-items: center; justify-content: center;
        }
        .ic-canvas-body .ReactCrop img {
          max-height: 520px;
          max-width: 100%;
          object-fit: contain;
          display: block;
        }

        /* ── SIDEBAR ──────────────────────────────────── */
        .ic-sidebar {
          display: flex; flex-direction: column; gap: 14px;
        }
        .ic-panel {
          border: 1px solid var(--border);
          border-radius: 16px;
          background: var(--surface);
          overflow: hidden;
        }
        .ic-panel-head {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          font-family: var(--ic-ff-head);
          font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--text-secondary);
          display: flex; align-items: center; gap: 7px;
        }
        .ic-panel-head-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
        }
        .ic-panel-body { padding: 14px; }

        /* ── ASPECT GRID ──────────────────────────────── */
        .ic-aspect-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }
        .ic-aspect-btn {
          font-family: var(--ic-ff-head);
          font-size: 0.62rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          padding: 8px 4px; border-radius: 8px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
          text-align: center;
          line-height: 1.3;
        }
        .ic-aspect-btn:hover { border-color: var(--accent); color: var(--accent); }
        .ic-aspect-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .ic-aspect-icon {
          display: block; font-size: 0.9rem; margin-bottom: 3px;
        }

        /* ── TRANSFORM BUTTONS ────────────────────────── */
        .ic-transform-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
        }
        .ic-tr-btn {
          display: flex; align-items: center; justify-content: center;
          gap: 6px;
          font-family: var(--ic-ff-head);
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          padding: 10px 8px; border-radius: 10px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .ic-tr-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-opacity-6, rgba(80,105,231,0.06)); }
        .ic-tr-btn.active-flip {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-opacity-10, rgba(80,105,231,0.10));
        }
        .ic-rotation-badge {
          text-align: center;
          font-family: var(--ic-ff-head);
          font-size: 0.68rem; font-weight: 700;
          color: var(--text-secondary);
          margin-top: 8px;
          padding: 6px;
          border-radius: 8px;
          background: var(--bg);
          border: 1px solid var(--border);
        }

        /* ── FORMAT BTNS ──────────────────────────────── */
        .ic-format-row {
          display: flex; gap: 6px;
        }
        .ic-fmt-btn {
          flex: 1;
          font-family: var(--ic-ff-head);
          font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          padding: 9px 6px; border-radius: 8px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
          text-align: center;
        }
        .ic-fmt-btn:hover { border-color: var(--accent); color: var(--accent); }
        .ic-fmt-btn.active {
          background: var(--accent); border-color: var(--accent); color: #fff;
        }

        /* ── QUALITY SLIDER ───────────────────────────── */
        .ic-quality-row {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .ic-quality-label {
          font-family: var(--ic-ff-head);
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-secondary);
        }
        .ic-quality-val {
          font-family: var(--ic-ff-head);
          font-size: 0.78rem; font-weight: 700;
          color: var(--accent);
        }
        .ic-slider {
          width: 100%;
          accent-color: var(--accent);
          cursor: pointer;
        }
        .ic-quality-hint {
          font-size: 0.7rem; color: var(--text-secondary);
          margin-top: 6px; line-height: 1.5;
        }

        /* ── ACTION BUTTONS ───────────────────────────── */
        .ic-actions { display: flex; flex-direction: column; gap: 8px; }
        .ic-btn-primary {
          width: 100%;
          font-family: var(--ic-ff-head);
          font-size: 0.82rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          background: var(--accent); color: #fff;
          padding: 13px 20px; border-radius: 10px;
          border: none; cursor: pointer;
          transition: opacity 0.18s, transform 0.15s;
          box-shadow: 0 4px 16px var(--accent-opacity-20, rgba(80,105,231,0.20));
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .ic-btn-primary:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .ic-btn-primary:disabled {
          opacity: 0.4; cursor: not-allowed; transform: none;
          box-shadow: none;
        }
        .ic-btn-secondary {
          width: 100%;
          font-family: var(--ic-ff-head);
          font-size: 0.78rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          background: transparent;
          border: 1.5px solid var(--border);
          color: var(--text-secondary);
          padding: 10px 20px; border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.18s, color 0.18s;
        }
        .ic-btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

        /* ── RESULT PREVIEW ───────────────────────────── */
        .ic-result {
          margin-top: 20px;
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          background: var(--surface);
        }
        .ic-result-head {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .ic-result-label {
          font-family: var(--ic-ff-head);
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--text-secondary);
          display: flex; align-items: center; gap: 7px;
        }
        .ic-result-ok {
          width: 8px; height: 8px; border-radius: 50%; background: #10b981;
        }
        .ic-result-body {
          padding: 16px;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .ic-result-body img {
          max-width: 100%; border-radius: 10px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        }
        .ic-download-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ic-ff-head);
          font-size: 0.78rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          background: #10b981; color: #fff;
          padding: 11px 24px; border-radius: 10px;
          text-decoration: none;
          transition: opacity 0.18s;
        }
        .ic-download-btn:hover { opacity: 0.88; }

        /* ── TIPS ─────────────────────────────────────── */
        .ic-tips {
          margin-top: 20px;
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .ic-tip {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 16px;
          background: var(--surface);
        }
        .ic-tip-icon { font-size: 1.2rem; margin-bottom: 8px; display: block; }
        .ic-tip-title {
          font-family: var(--ic-ff-head);
          font-size: 0.78rem; font-weight: 700;
          color: var(--text-primary); margin-bottom: 4px;
        }
        .ic-tip-desc { font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5; }

        /* ── RESPONSIVE ───────────────────────────────── */
        @media (max-width: 900px) {
          .ic-editor {
            grid-template-columns: 1fr;
          }
          .ic-sidebar { flex-direction: row; flex-wrap: wrap; }
          .ic-sidebar .ic-panel { flex: 1; min-width: 220px; }
          .ic-tips { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .ic-page { padding: 28px 16px 60px; }
          .ic-canvas-body { min-height: 280px; max-height: 380px; }
          .ic-sidebar { flex-direction: column; }
          .ic-sidebar .ic-panel { min-width: unset; }
          .ic-tips { grid-template-columns: 1fr; }
          .ic-aspect-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>

      <main className="ic-root">
        <div className="ic-page">

          {/* ── HEADER ──────────────────────────────────── */}
          <div className="ic-header">
            <div className="ic-breadcrumb">
              <a href="/tools">Tools</a> › Image Cropper
            </div>
            <h1 className="ic-title">
              Image <span>Crop</span> & Transform
            </h1>
            <p className="ic-subtitle">
              Crop, rotate, and flip images with precision — download instantly in JPG, PNG, or WebP.
              100% private, runs in your browser.
            </p>
          </div>

          {/* ── UPLOAD ──────────────────────────────────── */}
          {!imageSrc && (
            <div
              className={`ic-upload${isDragging ? " dragging" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
            >
              <div className="ic-upload-icon">🖼️</div>
              <div>
                <div className="ic-upload-title">Drop your image here</div>
                <div className="ic-upload-sub">or click to browse — JPG, PNG, WebP, HEIC, GIF supported</div>
              </div>
              <button type="button" className="ic-upload-btn" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                Choose Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                style={{ display: "none" }}
                onChange={(e) => loadFile(e.target.files?.[0])}
              />
            </div>
          )}

          {/* ── EDITOR ──────────────────────────────────── */}
          {imageSrc && (
            <>
              <div className="ic-editor">

                {/* Canvas */}
                <div className="ic-canvas-card">
                  <div className="ic-canvas-top">
                    <span className="ic-canvas-label">📐 Crop Area</span>
                    {cropInfo && (
                      <span className="ic-crop-dims">
                        {cropInfo.w} × {cropInfo.h} px
                      </span>
                    )}
                  </div>
                  <div className="ic-canvas-body">
                    <ReactCrop
                      crop={crop}
                      aspect={aspect ?? undefined}
                      keepSelection
                      onChange={(c) => setCrop(c)}
                      onComplete={handleCropComplete}
                    >
                      <img
                        ref={imgRef}
                        src={imageSrc}
                        alt="Image crop preview"
                        width={640}
                        height={480}
                        loading="lazy"
                        onLoad={onImageLoad}
                        style={{
                          transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                          transition: "transform 0.25s ease",
                          maxHeight: "520px",
                          maxWidth: "100%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </ReactCrop>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="ic-sidebar">

                  {/* Aspect ratio */}
                  <div className="ic-panel">
                    <div className="ic-panel-head">
                      <span className="ic-panel-head-dot" />
                      Aspect Ratio
                    </div>
                    <div className="ic-panel-body">
                      <div className="ic-aspect-grid">
                        {ASPECTS.map((a) => (
                          <button
                            key={a.label}
                            type="button"
                            className={`ic-aspect-btn${activeAspect === a.label ? " active" : ""}`}
                            onClick={() => handleAspect(a)}
                          >
                            <span className="ic-aspect-icon">{a.icon}</span>
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Transform */}
                  <div className="ic-panel">
                    <div className="ic-panel-head">
                      <span className="ic-panel-head-dot" />
                      Rotate & Flip
                    </div>
                    <div className="ic-panel-body">
                      <div className="ic-transform-grid">
                        <button type="button" className="ic-tr-btn" onClick={() => rotate("ccw")}>
                          ↺ CCW
                        </button>
                        <button type="button" className="ic-tr-btn" onClick={() => rotate("cw")}>
                          ↻ CW
                        </button>
                        <button
                          type="button"
                          className={`ic-tr-btn${flipH ? " active-flip" : ""}`}
                          onClick={() => { setFlipH((f) => !f); setPreview(null); }}
                        >
                          ↔ Flip H
                        </button>
                        <button
                          type="button"
                          className={`ic-tr-btn${flipV ? " active-flip" : ""}`}
                          onClick={() => { setFlipV((f) => !f); setPreview(null); }}
                        >
                          ↕ Flip V
                        </button>
                      </div>
                      <div className="ic-rotation-badge">
                        {((rotation % 360) + 360) % 360}° rotation
                        {flipH && " · H-flipped"}
                        {flipV && " · V-flipped"}
                      </div>
                    </div>
                  </div>

                  {/* Output format */}
                  <div className="ic-panel">
                    <div className="ic-panel-head">
                      <span className="ic-panel-head-dot" />
                      Output Format
                    </div>
                    <div className="ic-panel-body">
                      <div className="ic-format-row" style={{ marginBottom: "14px" }}>
                        {FORMATS.map((f) => (
                          <button
                            key={f.value}
                            type="button"
                            className={`ic-fmt-btn${format.value === f.value ? " active" : ""}`}
                            onClick={() => setFormat(f)}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>

                      {format.value !== "image/png" && (
                        <>
                          <div className="ic-quality-row">
                            <span className="ic-quality-label">Quality</span>
                            <span className="ic-quality-val">{quality}%</span>
                          </div>
                          <input
                            type="range"
                            min={50} max={100} step={1}
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            className="ic-slider"
                          />
                          <div className="ic-quality-hint">
                            {quality >= 90 ? "🟢 Best quality, larger file" :
                             quality >= 75 ? "🟡 Balanced — recommended" :
                                            "🔴 Smaller file, some loss"}
                          </div>
                        </>
                      )}
                      {format.value === "image/png" && (
                        <div className="ic-quality-hint">
                          🟢 PNG uses lossless compression — no quality setting needed.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ic-panel">
                    <div className="ic-panel-head">
                      <span className="ic-panel-head-dot" />
                      Actions
                    </div>
                    <div className="ic-panel-body">
                      <div className="ic-actions">
                        <button
                          type="button"
                          className="ic-btn-primary"
                          onClick={handleCropAndDownload}
                          disabled={!completedCrop?.width || !completedCrop?.height}
                        >
                          ✂️ Crop & Download
                        </button>
                        <button
                          type="button"
                          className="ic-btn-secondary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          🔄 Change Image
                        </button>
                        <button
                          type="button"
                          className="ic-btn-secondary"
                          onClick={() => {
                            setImageSrc(null);
                            setPreview(null);
                            setRotation(0);
                            setFlipH(false);
                            setFlipV(false);
                            setAspect(null);
                            setActiveAspect(null);
                            setCrop({ unit: "%", width: 60, height: 60, x: 20, y: 20 });
                          }}
                        >
                          ✕ Start Over
                        </button>
                      </div>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => loadFile(e.target.files?.[0])}
                  />
                </div>
              </div>

              {/* ── RESULT PREVIEW ────────────────────── */}
              {preview && (
                <div className="ic-result">
                  <div className="ic-result-head">
                    <span className="ic-result-label">
                      <span className="ic-result-ok" />
                      Cropped Image — Ready to Download
                    </span>
                  </div>
                  <div className="ic-result-body">
                    <img src={preview} alt="Cropped result" width={640} height={480} loading="lazy" />
                    <a
                      href={preview}
                      download={`${fileName}-cropped.${format.ext}`}
                      className="ic-download-btn"
                    >
                      ⬇ Download {format.label}
                    </a>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── TIPS ──────────────────────────────────── */}
          <div className="ic-tips" style={{ marginTop: imageSrc ? "20px" : "40px" }}>
            <div className="ic-tip">
              <span className="ic-tip-icon">🔒</span>
              <div className="ic-tip-title">100% Private</div>
              <div className="ic-tip-desc">Everything runs in your browser. Your image never leaves your device.</div>
            </div>
            <div className="ic-tip">
              <span className="ic-tip-icon">⚡</span>
              <div className="ic-tip-title">Instant Processing</div>
              <div className="ic-tip-desc">No upload wait time. Crop and download in under a second.</div>
            </div>
            <div className="ic-tip">
              <span className="ic-tip-icon">🎨</span>
              <div className="ic-tip-title">3 Output Formats</div>
              <div className="ic-tip-desc">Export as JPG, PNG, or WebP with adjustable quality settings.</div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
