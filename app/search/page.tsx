import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import Pagination from "components/layout/search/pagination";
import { defaultSort, sorting } from "lib/constants";
import { getProductsPage } from "lib/shopify";
import { firstParam } from "lib/utils";

export const metadata = {
  title: "Catálogo",
  description: "Explora todas las zapatillas y streetwear de SASSY SNKRS.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = (await props.searchParams) ?? {};
  const sort = firstParam(searchParams.sort);
  const searchValue = firstParam(searchParams.q);
  const after = firstParam(searchParams.after);
  const before = firstParam(searchParams.before);
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const { products, pageInfo } = await getProductsPage({
    sortKey,
    reverse,
    query: searchValue,
    after,
    before,
  });

  return (
    <>
      <header className="mb-8">
        <p className="mb-2 font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
          {searchValue ? "Resultados de búsqueda" : "Catálogo completo"}
        </p>
        <h1 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
          {searchValue ? <>&ldquo;{searchValue}&rdquo;</> : "Todo"}
        </h1>
      </header>

      {products.length > 0 ? (
        <>
          <Grid className="grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </Grid>
          <Pagination
            pageInfo={pageInfo}
            pathname="/search"
            searchParams={{ q: searchValue, sort }}
          />
        </>
      ) : (
        <div className="glass rounded-2xl p-16 text-center">
          <p className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
            {searchValue
              ? `Sin resultados para “${searchValue}”`
              : "Aún no hay productos"}
          </p>
        </div>
      )}
    </>
  );
}
