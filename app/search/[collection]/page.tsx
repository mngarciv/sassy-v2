import { getCollection, getCollectionProductsPage } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { CatalogHeader } from "components/layout/search/catalog-header";
import { EmptyState } from "components/layout/search/empty-state";
import Pagination from "components/layout/search/pagination";
import { PRODUCT_GRID_CLASS, defaultSort, sorting } from "lib/constants";
import { firstParam } from "lib/utils";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `Productos de ${collection.title}`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = (await props.searchParams) ?? {};
  const params = await props.params;
  const sort = firstParam(searchParams.sort);
  const after = firstParam(searchParams.after);
  const before = firstParam(searchParams.before);
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const [collection, { products, pageInfo }] = await Promise.all([
    getCollection(params.collection),
    getCollectionProductsPage({
      collection: params.collection,
      sortKey,
      reverse,
      after,
      before,
    }),
  ]);

  if (!collection) return notFound();

  const singlePage = !pageInfo.hasNextPage && !pageInfo.hasPreviousPage;

  return (
    <section>
      <CatalogHeader
        crumb={collection.title}
        title={collection.title}
        description={collection.description || undefined}
        count={singlePage ? products.length : undefined}
      />

      {products.length === 0 ? (
        <EmptyState
          title="Sin pares por ahora"
          body="Esta colección se está renovando. Mira el resto del catálogo mientras tanto."
        />
      ) : (
        <>
          <Grid className={PRODUCT_GRID_CLASS}>
            <ProductGridItems products={products} />
          </Grid>
          <Pagination
            pageInfo={pageInfo}
            pathname={`/search/${params.collection}`}
            searchParams={{ sort }}
          />
        </>
      )}
    </section>
  );
}
