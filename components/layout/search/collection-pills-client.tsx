"use client";

import clsx from "clsx";
import { createUrl } from "lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function CollectionPillsClient({
  items,
}: {
  items: { title: string; path: string }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Conserva el orden; el cursor pertenece a la colección actual → se descarta.
  const params = new URLSearchParams(searchParams.toString());
  params.delete("q");
  params.delete("after");
  params.delete("before");

  return (
    <nav aria-label="Colecciones" className="-mx-4 md:mx-0">
      <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 md:flex-wrap md:px-0">
        {items.map((item) => {
          const active = pathname === item.path;
          const sale = item.path.endsWith("/rebajas");
          return (
            <li key={item.path} className="flex-none">
              <Link
                href={createUrl(item.path, params)}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "inline-flex h-9 items-center border px-4 text-[13px] font-medium whitespace-nowrap transition-colors duration-200",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 hover:border-ink",
                  sale && !active && "text-signal",
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
