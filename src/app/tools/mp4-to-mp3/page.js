"use client";

import { useState, useEffect } from "react";

export default function Mp4ToMp3Page() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [ffmpegInstance, setFfmpegInstance] = useState(null);
  const [loadError, setLoadError] = useState(null);

  // ✅ NEW: audio quality
  const [audioQuality, setAudioQuality] = useState("192");

  useEffect(() => {
    let ffmpeg = null;
    let mounted = true;

    const loadFFmpeg = async () => {
      try {
        const { FFmpeg } = await import("@ffmpeg/ffmpeg");
        const { toBlobURL, fetchFile } = await import("@ffmpeg/util");

        ffmpeg = new FFmpeg();

        const baseURL =
          "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd";

        await ffmpeg.load({
          coreURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            "text/javascript"
          ),
          wasmURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            "application/wasm"
          ),
        });

        if (mounted) {
          setFfmpegInstance({ ffmpeg, fetchFile });
          setFfmpegLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load FFmpeg:", error);
        if (mounted) {
          const needsNewTab =
            typeof window !== "undefined" && !window.crossOriginIsolated;
          setLoadError(
            needsNewTab
              ? "This converter needs to run in an isolated context. Open this page in a new tab."
              : "Converter failed to load. Please refresh the page."
          );
        }
      }
    };

    loadFFmpeg();

    return () => {
      mounted = false;
      if (ffmpeg) {
        try {
          ffmpeg.terminate();
        } catch {}
      }
    };
  }, []);

  const handleConvert = async () => {
    if (!file || !ffmpegLoaded || !ffmpegInstance) {
      alert("Converter is still loading. Please wait...");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const { ffmpeg, fetchFile } = ffmpegInstance;

      ffmpeg.on("progress", ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      await ffmpeg.writeFile("input.mp4", await fetchFile(file));

      // ✅ UPDATED: bitrate based on selection
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vn",
        "-b:a",
        `${audioQuality}k`,
        "output.mp3",
      ]);

      const data = await ffmpeg.readFile("output.mp3");
      const blob =
        data instanceof Uint8Array
          ? new Blob([data], { type: "audio/mpeg" })
          : new Blob([data.buffer], { type: "audio/mpeg" });

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      await ffmpeg.deleteFile("input.mp4");
      await ffmpeg.deleteFile("output.mp3");
    } catch (error) {
      console.error("Conversion error:", error);
      alert("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
          "name": "Is this MP4 to MP3 converter free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, this MP4 to MP3 converter is completely free and does not require sign-up."
          }
        },
        {
          "@type": "Question",
          "name": "Are my files uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. All conversions happen locally in your browser and files are never uploaded."
          }
        },
        {
          "@type": "Question",
          "name": "What audio quality should I choose?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "128 kbps is suitable for voice, 192 kbps offers balanced quality, and 320 kbps provides the highest audio quality."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a file size limit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is no fixed file size limit, but large files may take longer depending on device performance."
          }
        },
        {
          "@type": "Question",
          "name": "Does this tool work on mobile devices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the tool works on mobile devices, though conversion speed may vary."
          }
        }
      ]
    }),
  }}
/>


  return (
    
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 md:py-20 py-5">
        <div className="space-y-10">

          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl md:text-4xl font-extrabold">
              MP4 to MP3 Converter
            </h1>
            <p className="text-[var(--text-secondary)]">
              Convert MP4 videos to MP3 audio directly in your browser.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 sm:p-8 space-y-6">


  <label className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8 text-center transition hover:border-[var(--accent)] hover:bg-[var(--accent-opacity-6)]">
  
  {/* Upload Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-10 w-10 text-[var(--accent)]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5v-9m0 0l-3 3m3-3l3 3M4.5 15.75v1.5A2.25 2.25 0 006.75 19.5h10.5A2.25 2.25 0 0019.5 17.25v-1.5"
    />
  </svg>

  <p className="font-semibold">
    Upload MP4 file
  </p>

  <p className="text-sm text-[var(--text-secondary)]">
    Click to upload or drag & drop
  </p>

  {file && (
    <p className="text-xs text-[var(--text-secondary)] mt-2">
      Selected: {file.name}
    </p>
  )}

  <input
    type="file"
    accept="video/mp4"
    className="hidden"
    onChange={(e) => {
      setFile(e.target.files[0]);
      setAudioUrl(null);
    }}
  />
</label>


            {/* ✅ AUDIO QUALITY SELECTOR */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Audio Quality</p>
              <div className="flex flex-wrap gap-3">
                {["128", "192", "320"].map((q) => (
                  <label
                    key={q}
                    className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition
                      ${
                        audioQuality === q
                          ? "border-[var(--accent)] bg-[var(--accent-opacity-10)] text-[var(--accent)]"
                          : "border-[var(--border-opacity-80)]"
                      }`}
                  >
                    <input
                      type="radio"
                      name="quality"
                      value={q}
                      checked={audioQuality === q}
                      onChange={() => setAudioQuality(q)}
                      className="hidden"
                    />
                    {q} kbps
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleConvert}
              disabled={!file || loading || !ffmpegLoaded || !!loadError}
              className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? `Converting... ${progress}%` : "Convert to MP3"}
            </button>

            {audioUrl && (
              <div className="text-center space-y-3">
                <p className="font-semibold">Conversion complete 🎉</p>
                <a
                  href={audioUrl}
                  download={`converted-${audioQuality}kbps.mp3`}
                  className="inline-block rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white"
                >
                  Download MP3
                </a>
              </div>
            )}

          </div>
        </div>
      {/* ================= FAQ ================= */}
<section className="mt-20">
  <div className="max-w-3xl space-y-6">
    <h2 className="text-2xl sm:text-3xl font-bold">
      Frequently Asked Questions
    </h2>

    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
        <h3 className="font-semibold">Is this MP4 to MP3 converter free?</h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Yes. This tool is completely free to use with no sign-up required.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
        <h3 className="font-semibold">Are my files uploaded to a server?</h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          No. All conversions happen directly in your browser. Your files never
          leave your device.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
        <h3 className="font-semibold">What audio quality should I choose?</h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          128 kbps is good for voice, 192 kbps is balanced, and 320 kbps provides
          the highest audio quality.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
        <h3 className="font-semibold">Is there a file size limit?</h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          There is no fixed limit, but very large files may take longer depending
          on your device performance.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
        <h3 className="font-semibold">Does this work on mobile?</h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Yes, but conversions may be slower on low-end mobile devices due to
          limited memory.
        </p>
      </div>
    </div>
  </div>
</section>

      </section>
    </main>
  );
}
