"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
const FAQS = [
  {
    q: "Is this MP4 to MP3 converter free?",
    a: "Yes, this MP4 to MP3 converter is completely free and does not require sign-up.",
  },
  {
    q: "Are my MP4 files uploaded?",
    a: "No. All MP4 processing happens locally in your browser. Your files never leave your device.",
  },
  {
    q: "What audio quality should I choose?",
    a: "Choose a higher audio quality (e.g., 192 kbps) for better sound, or a lower quality (e.g., 128 kbps) for smaller file size.",
  },
  {
    q: "Is there any file size limit?",
    a: "  There is no fixed limit, but very large files may take longer to process.",
  },
];

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

        <section className="mt-24 space-y-10 max-w-4xl">
  <h2 className="text-2xl sm:text-3xl font-bold">
    Convert MP4 to MP3 Online for Free
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    MP4 to MP3 conversion allows you to extract audio from video files quickly and easily.
    Whether you want music from a video, a podcast recording, a lecture,
    or background audio from a presentation, converting MP4 to MP3 helps you
    save only the sound in a lightweight and portable format.
  </p>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Our free MP4 to MP3 converter works directly in your browser. There is
    no need to upload files to any server. This means your videos remain
    completely private and secure while you extract audio instantly.
  </p>

  <h3 className="text-xl font-semibold">
    How to Convert MP4 to MP3
  </h3>

  <ol className="list-decimal pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
    <li>Click the upload button and select your MP4 video file.</li>
    <li>Wait for the audio extraction process to complete.</li>
    <li>Download your MP3 audio file instantly.</li>
  </ol>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    The process takes only seconds depending on the size of your video file.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    Why Convert MP4 to MP3?
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    MP4 is a video format that contains both audio and visual content.
    However, many users only need the audio portion. Converting MP4 to MP3
    reduces file size and makes playback easier across devices.
  </p>

  <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
    <li>Extract music from videos</li>
    <li>Save podcasts or interviews as audio files</li>
    <li>Convert lectures for offline listening</li>
    <li>Create audio clips for presentations</li>
    <li>Reduce storage space by removing video</li>
  </ul>

  <h2 className="text-2xl sm:text-3xl font-bold">
    100% Private MP4 to MP3 Conversion
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Many online converters upload your videos to remote servers.
    This can pose privacy risks, especially if your content contains
    sensitive information.
  </p>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Our converter processes everything locally in your browser.
    Your files are never uploaded, stored, or shared.
    This ensures complete privacy and faster performance.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    Fast & High-Quality Audio Extraction
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    The MP3 format is widely supported across devices including smartphones,
    tablets, laptops, car audio systems, and music players.
    It provides excellent sound quality while keeping file size small.
  </p>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Our tool preserves high-quality audio during conversion,
    ensuring clear sound output suitable for music, voice recordings,
    and professional usage.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    No Installation Required
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    You do not need to download or install any software.
    The MP4 to MP3 converter works directly in your browser on:
  </p>

  <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
    <li>Windows</li>
    <li>macOS</li>
    <li>Linux</li>
    <li>Android</li>
    <li>iOS</li>
  </ul>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Simply open the tool, upload your file, and download the MP3 audio.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    Frequently Asked Use Cases
  </h2>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    Students often convert recorded lectures into MP3 files for offline listening.
    Content creators extract background music from their videos.
    Professionals convert webinars into podcast-ready audio.
  </p>

  <p className="text-[var(--text-secondary)] leading-relaxed">
    MP4 to MP3 conversion is one of the most commonly searched
    video-to-audio tasks online, making it an essential productivity tool.
  </p>

  <h2 className="text-2xl sm:text-3xl font-bold">
    Related Tools You May Like
  </h2>

  <div className="grid md:grid-cols-3 gap-4">
    <Link className="text-[var(--accent)] hover:underline cursor-pointer" href="/tools/merge-pdf">Merge PDF files</Link>
    <Link className="text-[var(--accent)] hover:underline cursor-pointer" href="/tools/compress-pdf">Compress PDF documents</Link>
    <Link className="text-[var(--accent)] hover:underline cursor-pointer" href="/tools/jpg-to-pdf">Convert JPG to PDF</Link>
    <Link className="text-[var(--accent)] hover:underline cursor-pointer" href="/tools/image-compressor">Image Compressor</Link>
  </div>  
 

  <p className="text-[var(--text-secondary)] leading-relaxed pb-4">
    Explore more free browser-based tools designed to improve your workflow
    and productivity.
  </p>
</section>

      {/* ================= FAQ ================= */}
 <div className="space-y-6">
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

      {/* SOFTWARE APPLICATION SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "MP4 to MP3 convertor Online ",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/mp4-to-mp3",
            description:
              "Convert MP4 videos to MP3 audio files online for free. No registration required and all processing happens locally in your browser.",
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
