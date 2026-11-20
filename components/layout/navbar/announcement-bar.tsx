import { BRAND } from "lib/constants";

/** Franja superior con los sellos de confianza de @sassy.snkrs. */
export function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper">
      <ul className="shell eyebrow flex h-8 items-center justify-center gap-8 text-[10px] md:justify-between">
        {BRAND.claims.map((claim, i) => (
          <li
            key={claim}
            className={i === 0 ? "flex items-center gap-2" : "hidden md:block"}
          >
            {i === 0 ? (
              <span aria-hidden className="h-1.5 w-1.5 bg-signal" />
            ) : null}
            {claim}
          </li>
        ))}
      </ul>
    </div>
  );
}
