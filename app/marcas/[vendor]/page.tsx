import Grid from "components/grid";
import Footer from "components/layout/footer";
import ProductGridItems from "components/layout/product-grid-items";
import { CatalogHeader } from "components/layout/search/catalog-header";
import { PRODUCT_GRID_CLASS } from "lib/constants";
import { vendorSlug } from "lib/product-utils";
import { getProducts } from "lib/shopify";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getVendorProducts(slug: string) {
  const products = await getProducts({ sortKey: "CREATED_AT", reverse: true });
  const target = vendorSlug(decodeURIComponent(slug));
  const items = products.filter(
    (p) => p.vendor && vendorSlug(p.vendor) === target,
  );
  return { vendor: items[0]?.vendor, items };
}

export async function generateMetadata(props: {
  params: Promise<{ vendor: string }>;
}): Promise<Metadata> {
  const { vendor } = await getVendorProducts((await props.params).vendor);
  if (!vendor) return notFound();
  return {
    title: vendor,
    description: `Zapatillas ${vendor} originales en SASSY SNKRS.`,
  };
}

export default async function VendorPage(props: {
  params: Promise<{ vendor: string }>;
}) {
  const { vendor, items } = await getVendorProducts(
    (await props.params).vendor,
  );
  if (!vendor) return notFound();

  return (
    <>
      <div className="shell min-h-screen pt-8 pb-24 md:pt-12">
        <CatalogHeader
          crumb="Marcas"
          title={vendor}
          description={`${items.length} ${items.length === 1 ? "par disponible" : "pares disponibles"}.`}
          showFilters={false}
        />
        <Grid className={PRODUCT_GRID_CLASS}>
          <ProductGridItems products={items} />
        </Grid>
        <div className="mt-16 border-t border-ink/15 pt-8">
          <Link href="/marcas" className="eyebrow hover:underline">
            ← Todas las marcas
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
