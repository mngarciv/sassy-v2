import Link from "next/link";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-start gap-4 border border-dashed border-ink/25 p-10 md:p-16">
      <p className="font-display text-4xl md:text-5xl">{title}</p>
      <p className="max-w-md text-sm text-muted">{body}</p>
      <Link
        href="/search"
        className="mt-4 inline-flex h-12 items-center bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-ink-2"
      >
        Ver todo el catálogo
      </Link>
    </div>
  );
}
