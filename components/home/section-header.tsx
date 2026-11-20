import Link from "next/link";
import type { ReactNode } from "react";

/** Encabezado de sección: índice + título display + enlace opcional. */
export function SectionHeader({
  index,
  title,
  href,
  linkLabel = "Ver todo",
  children,
}: {
  index: string;
  title: string;
  href?: string;
  linkLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 border-b border-ink/15 pb-4 md:mb-10">
      <div className="flex items-baseline gap-4">
        {index ? <span className="eyebrow text-muted">{index}</span> : null}
        <h2 className="font-display text-4xl leading-none md:text-6xl">
          {title}
        </h2>
      </div>
      <div className="flex flex-none items-center gap-4">
        {children}
        {href ? (
          <Link
            href={href}
            className="eyebrow hidden underline-offset-4 hover:underline sm:block"
          >
            {linkLabel} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
