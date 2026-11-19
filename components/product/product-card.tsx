import clsx from "clsx";
import Price from "components/price";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

/**
 * Tarjeta editorial estándar de SASSY SNKRS.
 * Server Component (sin estado): reutilizable en grilla, carrusel y relacionados.
 * - Caja de imagen aspect-[4/5] con degradado de estudio.
 * - Zapatilla silueteada (object-contain) con sombra 3D.
 * - Título y precio FUERA de la caja, abajo.
 */
export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
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

  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch={true}
      className={clsx("group block w-full", className)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-neutral-800 to-neutral-950 transition-colors duration-300 ease-out group-hover:border-white/20">
        {/* Halo de luz de estudio */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)]"
        />
        {/* Sombra de piso */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[18%] bottom-[16%] h-6 rounded-[50%] bg-black/60 blur-xl transition-transform duration-500 ease-out group-hover:scale-x-90"
        />

        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes={sizes}
            priority={priority}
            className={clsx(
              "object-contain p-8 drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none",
              { "opacity-50 grayscale": soldOut },
            )}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-widest text-neutral-600 uppercase">
            Sin imagen
          </div>
        )}

        {soldOut ? (
          <span className="glass absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest text-neutral-300 uppercase">
            Agotado
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <h3 className="line-clamp-2 text-sm leading-snug font-medium tracking-tight text-white">
          {product.title}
        </h3>
        <div className="flex shrink-0 items-baseline gap-1 text-sm text-neutral-400">
          {hasRange ? (
            <span className="font-mono text-[10px] tracking-widest uppercase">
              Desde
            </span>
          ) : null}
          <Price
            amount={minVariantPrice.amount}
            currencyCode={minVariantPrice.currencyCode}
            currencyCodeClassName="hidden"
          />
        </div>
      </div>
    </Link>
  );
}
