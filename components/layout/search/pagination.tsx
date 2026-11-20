import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { PageInfo } from "lib/shopify/types";
import { createUrl } from "lib/utils";
import Link from "next/link";

/**
 * Paginación por cursor de Shopify (Server Component, sin JS en el cliente).
 * Conserva `q` y `sort`, y reemplaza `after`/`before` por el cursor nuevo.
 */
export default function Pagination({
  pageInfo,
  pathname,
  searchParams,
}: {
  pageInfo: PageInfo;
  pathname: string;
  searchParams: { q?: string; sort?: string };
}) {
  if (!pageInfo.hasNextPage && !pageInfo.hasPreviousPage) return null;

  const hrefWith = (cursor: { after?: string; before?: string }) => {
    const params = new URLSearchParams();
    if (searchParams.q) params.set("q", searchParams.q);
    if (searchParams.sort) params.set("sort", searchParams.sort);
    if (cursor.after) params.set("after", cursor.after);
    if (cursor.before) params.set("before", cursor.before);
    return createUrl(pathname, params);
  };

  const prev =
    pageInfo.hasPreviousPage && pageInfo.startCursor
      ? hrefWith({ before: pageInfo.startCursor })
      : null;
  const next =
    pageInfo.hasNextPage && pageInfo.endCursor
      ? hrefWith({ after: pageInfo.endCursor })
      : null;

  const base =
    "eyebrow inline-flex h-12 items-center gap-2 border px-6 transition-colors duration-300";
  const enabled = "border-ink text-ink hover:bg-ink hover:text-paper";
  const disabled = "cursor-not-allowed border-ink/15 text-ink/30";

  return (
    <nav
      aria-label="Paginación"
      className="mt-16 flex items-center justify-center gap-3 border-t border-ink/15 pt-10"
    >
      {prev ? (
        <Link href={prev} className={clsx(base, enabled)} rel="prev">
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Anterior
        </Link>
      ) : (
        <span aria-disabled className={clsx(base, disabled)}>
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Anterior
        </span>
      )}
      {next ? (
        <Link href={next} className={clsx(base, enabled)} rel="next">
          Siguiente
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      ) : (
        <span aria-disabled className={clsx(base, disabled)}>
          Siguiente
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      )}
    </nav>
  );
}
