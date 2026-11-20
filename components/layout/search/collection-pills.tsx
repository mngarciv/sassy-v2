import { getCollections } from "lib/shopify";
import { CollectionPillsClient } from "./collection-pills-client";

/** Orden editorial de las colecciones; las no listadas van al final. */
const ORDER = [
  "/search",
  "/search/hombres",
  "/search/mujeres",
  "/search/sneakers-and-trainers",
  "/search/streetwear-footwear",
  "/search/editorial-edge-originals",
  "/search/rebajas",
];
const EXCLUDE = new Set(["/search/frontpage"]);

export async function CollectionPills() {
  const collections = await getCollections();
  const items = collections
    .filter((c) => !EXCLUDE.has(c.path))
    .map((c) => ({
      title: c.path === "/search" ? "Todo" : c.title,
      path: c.path,
    }))
    .sort((a, b) => {
      const ia = ORDER.indexOf(a.path);
      const ib = ORDER.indexOf(b.path);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

  return <CollectionPillsClient items={items} />;
}
