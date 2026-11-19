export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevancia",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Tendencia",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "Nuevos llegados",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Precio: menor a mayor",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  }, // asc
  {
    title: "Precio: mayor a menor",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2023-01/graphql.json";

/** Menú principal cuando Shopify no entrega `next-js-frontend-header-menu`. */
export const FALLBACK_MENU: { title: string; path: string }[] = [
  { title: "Nuevos llegados", path: "/search?sort=latest-desc" },
  { title: "Hombres", path: "/search/hombres" },
  { title: "Mujeres", path: "/search/mujeres" },
  { title: "Marcas", path: "/search/marcas" },
  { title: "Rebajas", path: "/search/rebajas" },
];

/** Productos por página en /search (paginación por cursor). */
export const PRODUCTS_PAGE_SIZE = 24;
