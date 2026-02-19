import ImageConverterCore from "@/components/ImageConverterCore";
import Link from "next/link";
const FAQS = [
  {
    q: "What is WebP format?",
    a: "WebP is a modern image format developed by Google that provides superior compression compared to JPG and PNG while maintaining high quality.",
  },
  {
    q: "Why should I convert JPG to WebP?",
    a: "Converting JPG to WebP reduces file size significantly, improves website loading speed, and boosts SEO performance.",
  },
  {
    q: "Is JPG to WebP conversion safe?",
    a: "Yes. All image conversions happen locally in your browser. Your files are never uploaded to any server.",
  },
  {
    q: "Does WebP reduce image quality?",
    a: "WebP maintains excellent visual quality while reducing file size. Most users cannot see noticeable quality differences.",
  },
  {
    q: "Can I convert multiple JPG files at once?",
    a: "Yes. You can upload and convert multiple JPG images in a single batch.",
  },
];

export default function Page() {
  return (
    <>
      <ImageConverterCore
        from="jpeg"
        to="webp"
        title="JPG to WebP Converter"
        description="Convert JPG images to WebP for smaller file size and faster loading."
      />

      <section className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-bold">
          Convert JPG to WebP Online – Free & Fast Image Optimization Tool
        </h2>

        <p className="text-[var(--text-secondary)] leading-relaxed text-sm  ">
          JPG to WebP conversion is one of the most effective ways to reduce
          image file size while maintaining high visual quality. WebP is a
          modern image format developed by Google that offers significantly
          better compression than traditional formats like JPG and PNG. By
          converting your JPG images to WebP format, you can dramatically
          improve website performance, reduce bandwidth usage, and enhance SEO
          rankings.
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Our JPG to WebP converter works directly in your browser.
          That means your files are never uploaded to any server. The conversion
          process is secure, instant, and completely free.
        </p>

        <h3 className="text-xl font-semibold mt-8">Why Convert JPG to WebP?</h3>

        <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
          <li>Smaller File Size</li>
          <li>Better SEO Performance</li>
          <li>Improved User Experience</li>
          <li>Modern Web Standards Compliance</li>
        </ul>

        <h2 className="text-2xl sm:text-3xl font-bold">
          Related Tools You May Like
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed ">
          <li>
            <Link
              href="/tools/text-case-converter"
              className="text-[var(--accent)] hover:underline"
            >
              Text Case Converter
            </Link>
          </li>
          <li>
            <Link
              href="/tools/image-resizer"
              className="text-[var(--accent)] hover:underline"
            >
              Image Resizer
            </Link>
          </li>
          <li>
            <Link
              href="/tools/image-compressor"
              className="text-[var(--accent)] hover:underline"
            >
              Image Compressor
            </Link>
          </li>
          <li>
            <Link
              href="/tools/split-pdf"
              className="text-[var(--accent)] hover:underline"
            >
              PDF Splitter
            </Link>
          </li>
        </ul>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 space-y-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {FAQS.map((item, index) => (
            <details
              key={index}
              className="group rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                {item.q}
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>

              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

          {/* ================= FAQ SCHEMA ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
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
            name: "JPG to WebP Converter",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/jpg-to-webp",
            description:
              "Free online JPG to WebP converter. Reduce image size and improve website loading speed instantly.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
