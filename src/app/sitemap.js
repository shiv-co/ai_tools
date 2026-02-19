export default function sitemap() {
  const baseUrl = "https://aitechtactics.com";

  const staticRoutes = [
    "",
    "/tools",
    "/blog",
    "Comparisons",
    "/about",
    "/contact",
    "/privacy-policy",
  ];

  const toolRoutes = [
    "/tools/split-pdf",
    "/tools/merge-pdf",
    "/tools/reorder-pdf",
    "/tools/compress-pdf",
    "/tools/image-compressor",
    "/tools/image-cropper",
    "/tools/image-resizer",
    "/tools/image-converter",
    "/tools/word-counter",
    "/tools/text-case-converter",
    "/tools/mp4-to-mp3",
  ];

  return [...staticRoutes, ...toolRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
