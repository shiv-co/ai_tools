import Link from "next/link";

import SeoJsonLd from "@/components/SeoJsonLd";
import { faqSchema, softwareSchema } from "@/lib/seo";

function buildRelatedLinks(descriptor) {
  if (descriptor.pageType === "compression") {
    return [
      { href: "/compress-image-to-20kb", label: "Compress image to 20KB" },
      { href: "/compress-image-to-50kb", label: "Compress image to 50KB" },
      { href: "/compress-image-to-100kb", label: "Compress image to 100KB" },
      { href: "/resize-image-200x200", label: "Resize image 200x200" },
      { href: "/png-to-jpg", label: "Convert PNG to JPG" },
      { href: "/tools/image-compressor", label: "Open core image compressor" },
    ];
  }

  if (descriptor.pageType === "dimension" || descriptor.pageType === "social") {
    return [
      { href: "/compress-image-to-100kb", label: "Compress image to 100KB" },
      { href: "/resize-image-1080x1080", label: "Resize image 1080x1080" },
      { href: "/resize-image-for-instagram", label: "Resize image for Instagram" },
      { href: "/tools/image-resizer", label: "Open core image resizer" },
    ];
  }

  return [
    { href: "/png-to-jpg", label: "PNG to JPG" },
    { href: "/jpg-to-webp", label: "JPG to WebP" },
    { href: "/compress-image-to-100kb", label: "Compress image to 100KB" },
    { href: "/tools", label: "Browse all tools" },
  ];
}

export default function SeoToolPage({ descriptor, children }) {
  const relatedLinks = buildRelatedLinks(descriptor);

  return (
    <>
      {children}
      <section className="mx-auto max-w-5xl px-4 py-16 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">{descriptor.title}</h2>
          <p className="text-[var(--text-secondary)] leading-8">{descriptor.description}</p>
          <p className="text-[var(--text-secondary)] leading-8">
            This landing page reuses the existing browser-based tool already running on AI Tech
            Tactics, so the experience stays fast and familiar. The working tool loads first, and
            the SEO content below adds clear use cases, instructions, and supporting links for
            search-focused visitors looking for a very specific outcome.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">How to Use This Tool</h2>
          <ol className="list-decimal pl-6 space-y-3 text-[var(--text-secondary)] leading-8">
            {descriptor.instructions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Common Use Cases</h2>
          <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-8">
            {descriptor.useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-[var(--text-secondary)] leading-8">
            These pages are intended to answer long-tail intent directly. Instead of sending users
            to a generic tool index, each route is tied to a practical keyword such as a target file
            size, exact pixel dimensions, a social media format, or a specific conversion task. That
            improves internal linking, topical depth, and crawlable coverage without introducing a
            separate tool codepath.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {descriptor.faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4"
              >
                <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                  {item.q}
                  <span className="transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-7">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Try These Related Tools</h2>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SeoJsonLd
        data={softwareSchema({
          name: descriptor.toolName,
          description: descriptor.metaDescription,
          path: descriptor.canonicalPath,
        })}
      />
      <SeoJsonLd data={faqSchema(descriptor.faq)} />
    </>
  );
}
