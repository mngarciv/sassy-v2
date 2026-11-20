import { AddToCart } from "components/cart/add-to-cart";
import { formatMoney } from "components/price";
import Prose from "components/prose";
import { getDiscount, vendorSlug } from "lib/product-utils";
import { Product } from "lib/shopify/types";
import Link from "next/link";
import { VariantSelector } from "./variant-selector";

const TRUST = [
  "Producto 100% original",
  "Envíos a todo Chile y el mundo",
  "Aceptamos tu par en parte de pago",
];

function Detail({
  title,
  open,
  children,
}: {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={open} className="group border-b border-ink/15">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <span
          aria-hidden
          className="font-mono text-base transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-muted">{children}</div>
    </details>
  );
}

export function ProductDescription({ product }: { product: Product }) {
  const { minVariantPrice, maxVariantPrice } = product.priceRange;
  const discount = getDiscount(product);
  const compareAt = product.compareAtPriceRange?.maxVariantPrice;
  const hasRange = minVariantPrice.amount !== maxVariantPrice.amount;

  return (
    <>
      <div className="mb-8 border-b border-ink/15 pb-8">
        {product.vendor ? (
          <Link
            href={`/marcas/${vendorSlug(product.vendor)}`}
            className="eyebrow text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {product.vendor}
          </Link>
        ) : null}
        <h1 className="font-display mt-3 text-5xl leading-[0.88] md:text-6xl xl:text-7xl">
          {product.title}
        </h1>
        <div
          className="mt-6 flex flex-wrap items-baseline gap-3"
          suppressHydrationWarning
        >
          <span className={discount ? "text-2xl text-signal" : "text-2xl"}>
            {hasRange ? "Desde " : ""}
            {formatMoney(minVariantPrice.amount, minVariantPrice.currencyCode)}
          </span>
          {discount && compareAt ? (
            <>
              <span className="text-lg text-muted line-through">
                {formatMoney(compareAt.amount, compareAt.currencyCode)}
              </span>
              <span className="eyebrow bg-signal px-2 py-1">−{discount}%</span>
            </>
          ) : null}
          <span className="eyebrow text-muted">
            {minVariantPrice.currencyCode}
          </span>
        </div>
      </div>

      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart product={product} />

      <ul className="mt-6 space-y-2">
        {TRUST.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm">
            <span aria-hidden className="h-1.5 w-1.5 flex-none bg-ink" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-ink/15">
        {product.descriptionHtml ? (
          <Detail title="Descripción" open>
            <Prose html={product.descriptionHtml} />
          </Detail>
        ) : null}
        <Detail title="Envíos">
          Despachamos a todo Chile y al extranjero. El costo y plazo se calculan
          en el checkout según tu dirección.{" "}
          <Link href="/ayuda#envios" className="text-ink underline">
            Más información
          </Link>
          .
        </Detail>
        <Detail title="Autenticidad">
          Todos nuestros pares son originales. Si tienes dudas sobre un modelo,
          escríbenos y te enviamos fotos y detalles adicionales.{" "}
          <Link href="/ayuda#autenticidad" className="text-ink underline">
            Cómo verificamos
          </Link>
          .
        </Detail>
      </div>
    </>
  );
}
