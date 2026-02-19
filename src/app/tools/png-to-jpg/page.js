import ImageConverterCore from "@/components/ImageConverterCore";
import Link from "next/link";

const FAQS = [
  {
    q: "Why convert PNG to JPG?",
    a: "JPG images are smaller in file size compared to PNG, making them ideal for websites, email attachments, and faster uploads.",
  },
  {
    q: "Will PNG to JPG reduce image quality?",
    a: "JPG uses lossy compression, which may slightly reduce image quality, but the difference is usually not noticeable.",
  },
  {
    q: "Is PNG to JPG conversion safe?",
    a: "Yes. All image processing happens locally in your browser. Files are never uploaded.",
  },
  {
    q: "Does JPG support transparency?",
    a: "No. JPG does not support transparency. Transparent areas in PNG images will be converted to white background.",
  },
  {
    q: "Can I convert multiple PNG files at once?",
    a: "Yes, batch conversion is supported so you can convert multiple images in one go.",
  },
];

export default function Page() {
  return (
    <>
      <ImageConverterCore
        from="png"
        to="jpg"
        title="PNG to JPG Converter"
        description="Convert PNG images to JPG online. Fast, free, and private."
      />

      <section className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-bold">
          Convert PNG to JPG Online – Free Image Compression Tool
        </h2>

        <p className="text-[var(--text-secondary)] leading-relaxed text-sm  ">
          PNG to JPG conversion is one of the most common image format
          transformations for web users. PNG files are known for their high
          quality and lossless compression, but they often result in large file
          sizes. JPG, on the other hand, uses lossy compression to significantly
          reduce image size while maintaining acceptable visual quality. If you
          need to reduce file size, optimize images for websites, or upload
          photos to platforms that prefer JPG format, converting PNG to JPG is
          the ideal solution.
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Our PNG to JPG converter works entirely inside your browser. Your
          images are processed locally, ensuring full privacy and security.
        </p>

        <h3 className="text-xl font-semibold mt-8">Why Convert PNG to JPG?</h3>

        <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
          <li>Better File Size</li>
          <li>Happens Locally</li>
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
            name: "PNG to JPG Converter",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/png-to-jpg",
            description:
              "Free online PNG to JPG converter. Reduce image size and optimize PNG images instantly.",
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
