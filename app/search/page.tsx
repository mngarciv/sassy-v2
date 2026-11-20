import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { CatalogHeader } from "components/layout/search/catalog-header";
import { EmptyState } from "components/layout/search/empty-state";
import Pagination from "components/layout/search/pagination";
import { PRODUCT_GRID_CLASS, defaultSort, sorting } from "lib/constants";
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

  const singlePage = !pageInfo.hasNextPage && !pageInfo.hasPreviousPage;
  const isLatest = sort === "latest-desc" && !searchValue;

  return (
    <>
      <CatalogHeader
        crumb={searchValue ? "Búsqueda" : "Catálogo"}
        title={
          searchValue
            ? `“${searchValue}”`
            : isLatest
              ? "Nuevos llegados"
              : "Todo"
        }
        description={
          searchValue
            ? undefined
            : "Zapatillas originales, ediciones limitadas y calzado urbano. Stock real, actualizado a diario."
        }
        count={singlePage ? products.length : undefined}
      />

      {products.length > 0 ? (
        <>
          <Grid className={PRODUCT_GRID_CLASS}>
            <ProductGridItems products={products} />
          </Grid>
          <Pagination
            pageInfo={pageInfo}
            pathname="/search"
            searchParams={{ q: searchValue, sort }}
          />
        </>
      ) : (
        <EmptyState
          title={searchValue ? "Sin resultados" : "Aún no hay productos"}
          body={
            searchValue
              ? `No encontramos pares para “${searchValue}”. Prueba con otro modelo o marca.`
              : "Estamos cargando el stock. Vuelve pronto."
          }
        />
      )}
    </>
  );
}
