import Link from "next/link";

import { getToolSeoData } from "@/lib/tool-seo-data";

function buildHref(item) {
  if (item === "tools") return "/tools";
  if (item === "blog") return "/blog";
  if (item.startsWith("/")) return item;
  return `/tools/${item}`;
}

function buildLabel(item) {
  if (item === "tools") return "All Tools";
  if (item === "blog") return "SEO Blog";
  const tool = getToolSeoData(item);
  return tool?.name || item;
}

export default function ToolSeoSections({ slug }) {
  const tool = getToolSeoData(slug);
  if (!tool) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 space-y-10">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">What Is This Tool?</h2>
        <p className="text-[var(--text-secondary)] leading-8">
          {tool.name} is a free browser-based utility for working with {tool.inputs} and
          producing {tool.output}. It is built for people who need a direct result without
          installing desktop software, waiting for slow uploads, or signing up for an account.
          The interface stays at the top of the page so you can use the tool immediately, while
          the supporting content below explains the workflow, the practical use cases, and the
          situations where this tool saves time.
        </p>
        <p className="text-[var(--text-secondary)] leading-8">
          Search intent matters here. Someone looking for {tool.name.toLowerCase()} usually wants
          a fast solution tied to a real job such as {tool.useCases.join(", ")}. This page matches
          that intent with an immediately usable tool, clear supporting copy, and internal links to
          the next relevant steps. That structure helps users find what they need faster and creates
          stronger topical relevance for search engines.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">How It Works</h2>
        <p className="text-[var(--text-secondary)] leading-8">
          Start by adding {tool.inputs} in the interface above. The page then performs the selected
          action directly in your browser and prepares {tool.output} for download. Because the
          processing happens locally, you can work quickly, review the result, and export the final
          file or text output without leaving the page or routing sensitive material through an
          external service.
        </p>
        <p className="text-[var(--text-secondary)] leading-8">
          That local-first workflow improves both speed and trust. There is no dependency on server
          queues, no account setup, and no friction when you want to repeat the task with another
          file. It also makes the tool useful in everyday scenarios where quick iteration matters,
          whether you are preparing assets for a website, cleaning up a document, or making content
          easier to share.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Benefits</h2>
        <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)] leading-8">
          {tool.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
        <p className="text-[var(--text-secondary)] leading-8">
          The other major benefit is workflow continuity. Many visitors do not stop after one task.
          They resize after converting, compress after editing, or move from cleanup to publishing.
          That is why each tool page includes related internal links. They help users move naturally
          from one step to the next and strengthen the internal linking structure across the site
          without changing the tool logic or the existing interface behavior.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">FAQs</h2>
        <div className="space-y-3">
          {tool.faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                {item.q}
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-7">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold">Related Tools</h2>
        <p className="text-[var(--text-secondary)] leading-8">
          If you are using {tool.name.toLowerCase()} as part of a larger workflow, these related
          pages are the most useful next steps.
        </p>
        <div className="flex flex-wrap gap-3">
          {tool.related.map((item) => (
            <Link
              key={item}
              href={buildHref(item)}
              className="rounded-full border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {buildLabel(item)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
