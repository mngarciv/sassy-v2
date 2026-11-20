import clsx from "clsx";
import Image from "next/image";

const SIZES = {
  sm: { px: 28, className: "h-7 w-7" },
  md: { px: 36, className: "h-9 w-9" },
} as const;

/** Logo circular de SASSY SNKRS (`public/logo-SS.png`). */
export function LogoMark({
  size = "md",
  className,
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const { px, className: sizeClass } = SIZES[size];

  return (
    <Image
      src="/logo-SS.png"
      alt="SASSY SNKRS"
      width={px}
      height={px}
      sizes={`${px}px`}
      priority
      className={clsx("rounded-full ring-1 ring-ink/10", sizeClass, className)}
    />
  );
}
