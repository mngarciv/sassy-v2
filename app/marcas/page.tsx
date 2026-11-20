import Footer from "components/layout/footer";
import { CatalogHeader } from "components/layout/search/catalog-header";
import { EmptyState } from "components/layout/search/empty-state";
import { vendorSlug } from "lib/product-utils";
import { getProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Marcas",
  description: "Todas las marcas disponibles en SASSY SNKRS.",
};

export default async function BrandsPage() {
  const products = await getProducts({ sortKey: "CREATED_AT", reverse: true });

  const brands = new Map<string, Product[]>();
  for (const product of products) {
    const vendor = product.vendor?.trim();
    if (!vendor) continue;
    brands.set(vendor, [...(brands.get(vendor) ?? []), product]);
  }
  const list = [...brands.entries()].sort((a, b) =>
    a[0].localeCompare(b[0], "es"),
  );

  return (
    <>
      <div className="shell min-h-[60vh] pt-8 pb-24 md:pt-12">
        <CatalogHeader
          crumb="Marcas"
          title="Marcas"
          description="Elige una marca para ver todos sus pares disponibles."
          showFilters={false}
        />

        {list.length ? (
          <ul className="border-t border-ink/15">
            {list.map(([vendor, items], i) => (
              <li key={vendor} className="border-b border-ink/15">
                <Link
                  href={`/marcas/${vendorSlug(vendor)}`}
                  className="group grid grid-cols-1 items-center gap-6 py-6 md:grid-cols-12 md:py-8"
                >
                  <span className="eyebrow text-muted md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-5xl leading-none transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none md:col-span-6 md:text-7xl">
                    {vendor}
                  </span>
                  <span className="eyebrow text-muted md:col-span-1">
                    {items.length} pares
                  </span>
                  <span className="flex gap-2 md:col-span-4 md:justify-end">
                    {items
                      .filter((p) => p.featuredImage?.url)
                      .slice(0, 3)
                      .map((p) => (
                        <span
                          key={p.handle}
                          className="relative aspect-[4/5] w-20 overflow-hidden bg-paper-2 md:w-24"
                        >
                          <Image
                            src={p.featuredImage.url}
                            alt=""
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </span>
                      ))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Sin marcas aún"
            body="Cuando carguemos stock, las marcas aparecerán aquí."
          />
        )}
      </div>
      <Footer />
    </>
  );
}
