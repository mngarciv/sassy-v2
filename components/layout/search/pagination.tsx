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
    "glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] tracking-widest uppercase transition-colors duration-300";
  const enabled = "text-white hover:border-white/30 hover:bg-white/10";
  const disabled = "cursor-not-allowed text-neutral-600";

  return (
    <nav
      aria-label="Paginación"
      className="mt-12 flex items-center justify-center gap-3"
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
