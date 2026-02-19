import ImageConverterCore from "@/components/ImageConverterCore";
import Link from "next/link";

const FAQS = [
  {
    q: "What is a WebP file?",
    a: "WebP is a modern image format developed by Google that provides better compression and smaller file sizes compared to JPG and PNG formats.",
  },
  {
    q: "Why should I convert WebP to JPG?",
    a: "While WebP offers better compression, JPG is more widely supported across devices, applications, and platforms. Converting WebP to JPG ensures maximum compatibility.",
  },
  {
    q: "Is this WebP to JPG converter free?",
    a: "Yes, this WebP to JPG converter is completely free with no hidden charges or watermarks.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. All WebP to JPG conversions happen locally in your browser. Your images never leave your device.",
  },
  {
    q: "Can I convert multiple WebP files at once?",
    a: "Yes, you can upload and convert multiple WebP images in a single batch.",
  },
  {
    q: "Will converting WebP to JPG reduce quality?",
    a: "JPG uses lossy compression, so there may be slight quality reduction. However, our tool maintains high image quality during conversion.",
  },
  {
    q: "Is there any file size limit?",
    a: "There is no strict file size limit. As long as your browser can process the image, you can convert it.",
  },
  {
    q: "Does this tool work on mobile devices?",
    a: "Yes, the WebP to JPG converter works smoothly on mobile, tablet, and desktop browsers.",
  },
];

export default function Page() {
  return (
    <>
      <ImageConverterCore
        from="webp"
        to="jpg"
        title="WebP to JPG Converter"
        description="Convert WebP images to JPG format easily in your browser."
      />

      <section className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-bold">
          WebP to JPG Converter – Convert WebP Images to JPEG Online for Free
        </h2>

        <p className="text-[var(--text-secondary)] leading-relaxed text-sm  ">
          WebP is a modern image format developed by Google that offers superior
          compression and smaller file sizes compared to traditional formats
          like JPG and PNG. While WebP works perfectly on modern browsers, many
          older applications, image editors, and platforms still do not fully
          support WebP images. That’s where our WebP to JPG Converter comes in.
         
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          With this free online WebP to JPG converter, you can instantly convert
          WebP images into JPG format directly in your browser. No uploads. No
          sign-ups. No waiting.
        </p>

        <h3 className="text-xl font-semibold mt-8">Why Convert WebP to JPG?</h3>

        <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
          <li>Convert WebP files in seconds without uploading to a server.</li>
          <li>Upload and convert multiple WebP images at once.</li>
          <li>Improved User Experience</li>
          <li>As long as your browser can handle it, you can convert large images.</li>
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
              href="/tools/jpg-to-pdf"
              className="text-[var(--accent)] hover:underline"
            >
              JPG to PDF Converter
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
            name: "WebP to JPG Converter Online",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/webp-to-jpg",
            description:
              "Convert WebP images to JPG format online for free. No upload required.",
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
