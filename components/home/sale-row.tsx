import { ProductCard } from "components/product/product-card";
import { getDiscount } from "lib/product-utils";
import { getCollectionProducts } from "lib/shopify";
import { SectionHeader } from "./section-header";

/** Fila de rebajas: los 4 pares con mayor descuento. */
export async function SaleRow() {
  const products = await getCollectionProducts({ collection: "rebajas" });
  const top = products
    .filter((p) => p.availableForSale)
    .sort((a, b) => (getDiscount(b) ?? 0) - (getDiscount(a) ?? 0))
    .slice(0, 4);

  if (!top.length) return null;
  const best = getDiscount(top[0]!);

  return (
    <section className="shell py-20 md:py-28">
      <SectionHeader
        index="04"
        title="Rebajas"
        href="/search/rebajas"
        linkLabel={`Ver las ${products.length}`}
      >
        {best ? (
          <span className="eyebrow bg-signal px-2 py-1">Hasta −{best}%</span>
        ) : null}
      </SectionHeader>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-4 lg:grid-cols-4">
        {top.map((product) => (
          <li key={product.handle}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
