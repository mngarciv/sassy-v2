import clsx from "clsx";

/** Cinta de texto en movimiento continuo (CSS puro; se detiene con reduced-motion). */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex flex-none items-center"
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span className="font-display px-6 text-4xl leading-none whitespace-nowrap md:text-6xl">
            {item}
          </span>
          <span aria-hidden className="h-2.5 w-2.5 flex-none bg-signal" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={clsx(
        "overflow-hidden border-y border-ink/15 py-5 md:py-6",
        className,
      )}
    >
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
