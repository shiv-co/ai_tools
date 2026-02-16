"use client";

import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ImageCropperPage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 60,
    height: 60,
    x: 20,
    y: 20,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // NEW: rotate / flip states
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  /* =============================
     Image load
  ============================== */
  const onImageLoad = () => {
    setCrop({
      unit: "%",
      width: 60,
      height: 60,
      x: 20,
      y: 20,
    });
  };

  /* =============================
     Aspect change (fixed)
  ============================== */
  const handleAspectChange = (value) => {
    if (value === "free") {
      setAspect(null);
      setCrop({ unit: "%", width: 60, height: 60, x: 20, y: 20 });
    } else {
      const ratio = Number(value);
      setAspect(ratio);
      setCrop({ unit: "%", width: 60, x: 20, y: 20, aspect: ratio });
    }
  };

  /* =============================
     Crop + Rotate + Flip logic
  ============================== */
  const getCroppedImage = async () => {
    if (!completedCrop || !imageSrc) return;

    const image = new Image();
    image.src = imageSrc;
    await new Promise((r) => (image.onload = r));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    const angle = (rotation * Math.PI) / 180;

    // Adjust canvas size for rotation
    if (rotation % 180 !== 0) {
      canvas.width = cropHeight;
      canvas.height = cropWidth;
    } else {
      canvas.width = cropWidth;
      canvas.height = cropHeight;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      cropWidth,
      cropHeight,
      -cropWidth / 2,
      -cropHeight / 2,
      cropWidth,
      cropHeight
    );

    setCroppedImage(canvas.toDataURL("image/jpeg", 0.95));
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-5xl px-4 py-20 space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Image Crop, Rotate & Flip
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Crop images with precision. Rotate or flip before downloading.
          </p>
        </div>

        {/* UPLOAD */}
        {!imageSrc && (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10">
            <p className="font-semibold">Upload image</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setImageSrc(URL.createObjectURL(e.target.files[0]))
              }
            />
          </label>
        )}

        {/* EDITOR */}
        {imageSrc && (
          <div className="rounded-2xl border bg-[var(--surface-opacity-5)] p-4 space-y-4">

            {/* CONTROLS */}
            <div className="grid gap-3 sm:grid-cols-2">

              {/* Aspect */}
              <select
                value={aspect || "free"}
                onChange={(e) => handleAspectChange(e.target.value)}
                className="rounded-lg border px-3 py-2 bg-transparent"
              >
                <option value="free">Free</option>
                <option value="1">1:1</option>
                <option value="1.3333">4:3</option>
                <option value="1.7777">16:9</option>
              </select>

              {/* Rotate / Flip */}
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setRotation((r) => r - 90)} className="btn">
                  ↺ Rotate
                </button>
                <button onClick={() => setRotation((r) => r + 90)} className="btn">
                  ↻ Rotate
                </button>
                <button onClick={() => setFlipH((f) => !f)} className="btn">
                  ↔ Flip
                </button>
                <button onClick={() => setFlipV((f) => !f)} className="btn">
                  ↕ Flip
                </button>
              </div>
            </div>

            {/* FIXED CROPPER CONTAINER */}
            <div className="relative h-[420px] overflow-hidden rounded-xl bg-black/80">
              <ReactCrop
                crop={crop}
                aspect={aspect}
                keepSelection
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              >
                <img
                  src={imageSrc}
                  onLoad={onImageLoad}
                  className="mx-auto max-h-full object-contain"
                  alt="Crop source"
                />
              </ReactCrop>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button
                onClick={getCroppedImage}
                className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white"
              >
                Apply & Download
              </button>

              <button
                onClick={() => {
                  setImageSrc(null);
                  setCroppedImage(null);
                  setRotation(0);
                  setFlipH(false);
                  setFlipV(false);
                }}
                className="rounded-xl border px-6 py-3 font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {croppedImage && (
          <div className="space-y-4">
            <img src={croppedImage} className="max-w-full rounded-xl" />
            <a
              href={croppedImage}
              download={`edited-image-${Date.now()}.jpg`}
              className="inline-block rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white"
            >
              Download Image
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
