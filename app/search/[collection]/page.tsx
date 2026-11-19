import { getCollection, getCollectionProductsPage } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import Pagination from "components/layout/search/pagination";
import { defaultSort, sorting } from "lib/constants";
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

  return (
    <section>
      <header className="mb-8">
        <p className="mb-2 font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
          Colección
        </p>
        <h1 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
          {collection?.title ?? params.collection}
        </h1>
      </header>

      {products.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <p className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
            No hay productos en esta colección
          </p>
        </div>
      ) : (
        <>
          <Grid className="grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
