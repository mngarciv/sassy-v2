import clsx from "clsx";
import { Suspense } from "react";

import { getCollections } from "lib/shopify";
import FilterList from "./filter";

async function CollectionList() {
  const collections = await getCollections();
  // La colección virtual "All" (lib/shopify) se muestra como "Todo".
  const list = collections.map((c) =>
    c.path === "/search" ? { ...c, title: "Todo" } : c,
  );
  return <FilterList list={list} title="Colecciones" />;
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded-sm";
const activeAndTitles = "bg-neutral-700";
const items = "bg-neutral-800";

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none md:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
