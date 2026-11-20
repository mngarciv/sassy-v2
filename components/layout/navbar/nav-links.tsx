"use client";

import clsx from "clsx";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

/** ¿El ítem del menú corresponde a la URL actual (ruta + query)? */
export function useIsActive() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (path: string) => {
    const [itemPath, itemQuery] = path.split("?");
    if (itemPath === "/") return pathname === "/";
    const samePath =
      pathname === itemPath || pathname.startsWith(`${itemPath}/`);
    if (!samePath) return false;
    if (!itemQuery) return itemPath !== "/search" || !searchParams.size;
    const wanted = new URLSearchParams(itemQuery);
    return [...wanted.entries()].every(([k, v]) => searchParams.get(k) === v);
  };
}

export function NavLinks({ menu }: { menu: Menu[] }) {
  const isActive = useIsActive();

  return (
    <ul className="flex items-center gap-7">
      {menu.map((item) => {
        const active = isActive(item.path);
        const sale = item.path.includes("rebajas");
        return (
          <li key={item.title}>
            <Link
              href={item.path}
              prefetch={true}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "relative py-2 text-[13px] font-medium tracking-tight uppercase transition-colors duration-300 ease-out",
                "after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:bg-current after:transition-transform after:duration-300 motion-reduce:after:transition-none",
                active
                  ? "after:scale-x-100"
                  : "after:scale-x-0 hover:after:scale-x-100",
                sale ? "text-signal" : "text-ink",
              )}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
