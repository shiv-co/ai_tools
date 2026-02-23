import Link from "next/link";

export default function ToolCard({ tool }) {
  const { name, description, useCase, pricing, slug, category, icon } = tool;

  return (
    <Link
      href={`${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-opacity-60)] hover:shadow-lg hover:shadow-[var(--accent-opacity-10)] backdrop-blur"
    >
      {/* Icon/Badge */}
      <div className="mb-4 flex items-start justify-between">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-opacity-10)] text-xl">
            {icon}
          </div>
        )}
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            pricing === "Free"
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : pricing === "Paid"
                ? "bg-[var(--accent-opacity-10)] text-[var(--accent)]"
                : "bg-[var(--surface-opacity-10)] text-[var(--text-secondary)]"
          }`}
        >
          {pricing}
        </span>
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
        {name}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
        {description}
      </p>

      {/* Use Case */}
      {useCase && (
        <div className="mb-4 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
          <span className="rounded bg-[var(--border-opacity-60)] px-2 py-1">
            {useCase}
          </span>
          {category && (
            <>
              <span>•</span>
              <span className="rounded bg-[var(--border-opacity-60)] px-2 py-1">
                {category}
              </span>
            </>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border-opacity-60)]">
        <span className="text-sm font-medium text-[var(--accent)] group-hover:underline">
          Use Tool →
        </span>
        <span className="text-xs text-[var(--text-secondary)]">Learn more</span>
      </div>
    </Link>
  );
}
