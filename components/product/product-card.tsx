import clsx from "clsx";
import { formatMoney } from "components/price";
import { getDiscount } from "lib/product-utils";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

/**
 * Tarjeta de producto SASSY (Server Component, sin estado).
 * Foto de estudio 4:5 a sangre (object-cover); marca, nombre y precio
 * debajo y alineados a la izquierda. Reutilizable en grilla, carrusel y relacionados.
 */
export function ProductCard({
  product,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  priority = false,
  className,
}: {
  product: Product;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const { minVariantPrice, maxVariantPrice } = product.priceRange;
  const hasRange = minVariantPrice.amount !== maxVariantPrice.amount;
  const soldOut = !product.availableForSale;
  const discount = getDiscount(product);
  const compareAt = product.compareAtPriceRange?.maxVariantPrice;
  const secondImage = product.images[1];

  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch={true}
      className={clsx("group block w-full", className)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes={sizes}
            priority={priority}
            className={clsx(
              "object-cover transition duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
              { "opacity-60 grayscale": soldOut },
              { "group-hover:opacity-0": secondImage },
            )}
          />
        ) : (
          <div className="eyebrow absolute inset-0 flex items-center justify-center text-muted">
            Sin imagen
          </div>
        )}
        {secondImage ? (
          <Image
            src={secondImage.url}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition duration-700 ease-out group-hover:opacity-100 motion-reduce:transition-none"
          />
        ) : null}

        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {discount && !soldOut ? (
            <span className="eyebrow bg-signal px-2 py-1 text-ink">
              −{discount}%
            </span>
          ) : null}
          {soldOut ? (
            <span className="eyebrow bg-paper px-2 py-1 text-ink">Agotado</span>
          ) : null}
        </div>

        <span
          aria-hidden
          className="eyebrow absolute right-3 bottom-3 translate-y-2 bg-paper px-2 py-1 text-ink opacity-0 transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        >
          Ver par →
        </span>
      </div>

      <div className="mt-3 space-y-1">
        {product.vendor ? (
          <p className="eyebrow truncate text-muted">{product.vendor}</p>
        ) : null}
        <h3 className="line-clamp-1 text-sm font-medium tracking-tight">
          {product.title}
        </h3>
        <p
          className="flex items-baseline gap-2 text-sm"
          suppressHydrationWarning
        >
          {hasRange ? <span className="text-muted">Desde</span> : null}
          <span className={clsx(discount && "text-signal")}>
            {formatMoney(minVariantPrice.amount, minVariantPrice.currencyCode)}
          </span>
          {discount && compareAt ? (
            <span className="text-muted line-through">
              {formatMoney(compareAt.amount, compareAt.currencyCode)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
