/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Required for @ffmpeg/ffmpeg in browser (SharedArrayBuffer) – only on converter page
  async headers() {
    return [
      {
        source: "/tools/mp4-to-mp3",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
      {
        source: "/tools/mp4-to-mp3/",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
