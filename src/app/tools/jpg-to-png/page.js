import ImageConverterCore from "@/components/ImageConverterCore";
import Link from "next/link";
const FAQS = [
  {
    q: "What is the difference between JPG and PNG?",
    a: "JPG is a compressed format ideal for photographs, while PNG is a lossless format that supports transparency.",
  },
  {
    q: "Is JPG to PNG conversion safe?",
    a: "Yes. All conversions happen locally in your browser. Files are never uploaded.",
  },
  {
    q: "Will image quality improve when converting JPG to PNG?",
    a: "PNG prevents further compression loss, but it cannot restore details already lost in JPG.",
  },
];

export default function Page() {
  return (
    <>
      <ImageConverterCore
        from="jpeg"
        to="png"
        title="JPG to PNG Converter"
        description="Convert JPG images to PNG format instantly. No uploads. Free and secure."
      />

      <section className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-bold">Convert JPG to PNG Online Free</h2>

        <p className="text-[var(--text-secondary)] leading-relaxed text-sm  ">
          JPG to PNG conversion is useful when you need higher image quality or
          transparency support. PNG format preserves image details without
          additional compression loss. Designers, developers, and content
          creators often convert JPG images into PNG format to maintain visual
          clarity.
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          Our JPG to PNG converter works entirely in your browser, ensuring
          complete privacy and security. No file uploads. No sign-up required.
        </p>

        <h3 className="text-xl font-semibold mt-8">Why Convert JPG to PNG?</h3>

        <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
          <li>Preserve image quality</li>
          <li>Enable transparency support</li>
          <li>Better editing compatibility</li>
          <li>Graphic design use cases</li>
        </ul>

        
          <h2 className="text-2xl sm:text-3xl font-bold">
            Related Tools You May Like
          </h2>
        
          <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-relaxed ">
            <li><Link href="/tools/text-case-converter" className="text-[var(--accent)] hover:underline">Text Case Converter</Link></li>
            <li><Link href="/tools/image-resizer" className="text-[var(--accent)] hover:underline">Image Resizer</Link></li>
            <li><Link href="/tools/image-compressor" className="text-[var(--accent)] hover:underline">Image Compressor</Link></li>
            <li><Link href="/tools/split-pdf" className="text-[var(--accent)] hover:underline">PDF Splitter</Link></li>
          </ul>
        
      </section>

      {/* ================= FAQ SECTION ================= */}
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
            name: "JPG to PNG Converter",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            url: "https://aitechtactics.com/tools/jpg-to-png",
            description:
              "Convert JPG images to PNG format instantly online. 100% private and secure.",
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
