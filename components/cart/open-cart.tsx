import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center text-ink transition duration-300 ease-out hover:bg-ink hover:text-paper">
      <ShoppingBagIcon className={clsx("h-5", className)} strokeWidth={1.5} />

      {quantity ? (
        <div className="absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center bg-signal px-1 font-mono text-[10px] leading-none font-bold text-ink">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
