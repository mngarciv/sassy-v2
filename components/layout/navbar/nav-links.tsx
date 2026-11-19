"use client";

import clsx from "clsx";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-6 md:flex">
      {menu.map((item) => {
        const active = pathname === item.path.split("?")[0];
        return (
          <li key={item.title}>
            <Link
              href={item.path}
              prefetch={true}
              className={clsx(
                "relative py-1 text-xs font-medium uppercase tracking-widest transition duration-300 ease-out",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-white after:transition-transform after:duration-300 motion-reduce:after:transition-none",
                active
                  ? "text-white after:scale-x-100"
                  : "text-neutral-400 after:scale-x-0 hover:text-white hover:after:scale-x-100",
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
