import Link from "next/link";
import { Suspense } from "react";
import { CollectionPills } from "./collection-pills";
import { SortSelect } from "./sort-select";

/** Cabecera del catálogo: migas, título display, descripción y barra de filtros. */
export function CatalogHeader({
  crumb,
  title,
  description,
  count,
  showFilters = true,
}: {
  crumb: string;
  title: string;
  description?: string;
  count?: number;
  showFilters?: boolean;
}) {
  return (
    <header className="mb-10">
      <nav aria-label="Migas de pan" className="eyebrow text-muted">
        <Link href="/" className="hover:text-ink">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{crumb}</span>
      </nav>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h1 className="font-display text-6xl leading-[0.85] break-words md:text-8xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
            {description}
          </p>
        ) : null}
      </div>

      {showFilters ? (
        <div className="mt-10 flex flex-col gap-4 border-y border-ink/15 py-4 md:flex-row md:items-center md:justify-between">
          <Suspense fallback={<div className="h-9" />}>
            <CollectionPills />
          </Suspense>
          <div className="flex flex-none items-center justify-between gap-6">
            {typeof count === "number" ? (
              <span className="eyebrow text-muted">
                {count} {count === 1 ? "par" : "pares"}
              </span>
            ) : null}
            <Suspense fallback={<div className="h-9" />}>
              <SortSelect />
            </Suspense>
          </div>
        </div>
      ) : null}
    </header>
  );
}
