"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { defaultSort, sorting } from "lib/constants";
import { createUrl } from "lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

/** Selector de orden: conserva `q` y reinicia el cursor de paginación. */
export function SortSelect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current =
    sorting.find((s) => s.slug === searchParams.get("sort")) ?? defaultSort;
  const q = searchParams.get("q");

  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex h-9 items-center gap-2 text-[13px] font-medium">
        <span className="text-muted">Ordenar:</span>
        {current.title}
        <ChevronDownIcon className="h-3.5" strokeWidth={2} />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        transition
        className="z-40 mt-2 w-60 border border-ink bg-paper p-1 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] transition duration-150 ease-out focus:outline-none data-closed:-translate-y-1 data-closed:opacity-0"
      >
        {sorting.map((item) => {
          const href = createUrl(
            pathname,
            new URLSearchParams({
              ...(q && { q }),
              ...(item.slug && { sort: item.slug }),
            }),
          );
          const active = item.slug === current.slug;
          return (
            <MenuItem key={item.title}>
              <Link
                href={href}
                className={clsx(
                  "flex items-center justify-between px-3 py-2 text-sm data-focus:bg-paper-2",
                  active && "font-medium",
                )}
              >
                {item.title}
                {active ? (
                  <span className="h-1.5 w-1.5 bg-signal" aria-hidden />
                ) : null}
              </Link>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
