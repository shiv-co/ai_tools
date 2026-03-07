/**
 * Lightweight loading skeleton for dynamically imported tool pages.
 * Keeps LCP fast and avoids blocking the main thread with heavy tool JS.
 */
export default function ToolLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] animate-pulse">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5 md:py-10 space-y-10">
        <div className="max-w-3xl space-y-2 md:space-y-4">
          <div className="h-8 w-3/4 rounded bg-[var(--surface-opacity-5)]" />
          <div className="h-4 w-full rounded bg-[var(--surface-opacity-5)]" />
          <div className="h-4 w-5/6 rounded bg-[var(--surface-opacity-5)]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8 min-h-[180px]">
          <div className="h-12 w-12 rounded-full bg-[var(--surface-opacity-5)]" />
          <div className="h-5 w-32 rounded bg-[var(--surface-opacity-5)]" />
          <div className="h-4 w-48 rounded bg-[var(--surface-opacity-5)]" />
        </div>
        <div className="h-12 w-full rounded-xl bg-[var(--surface-opacity-5)] max-w-md mx-auto" />
        <div className="grid gap-6 sm:grid-cols-3 mt-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border bg-[var(--surface-opacity-5)] p-5 h-28" />
          ))}
        </div>
      </section>
    </main>
  );
}
