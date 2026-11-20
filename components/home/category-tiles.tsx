import { HOME_CATEGORIES } from "lib/constants";
import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./section-header";

/** Accesos por categoría con la primera foto de cada colección. */
export async function CategoryTiles() {
  const tiles = await Promise.all(
    HOME_CATEGORIES.map(async (category) => {
      const products = await getCollectionProducts({
        collection: category.handle,
      });
      return {
        ...category,
        count: products.length,
        image: products.find((p) => p.featuredImage?.url)?.featuredImage,
      };
    }),
  );

  const visible = tiles.filter((t) => t.count > 0);
  if (!visible.length) return null;

  return (
    <section className="shell py-20 md:py-28">
      <SectionHeader index="01" title="Comprar por" href="/search" />
      <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {visible.map((tile, i) => (
          <li key={tile.handle}>
            <Link
              href={`/search/${tile.handle}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-ink"
            >
              {tile.image ? (
                <Image
                  src={tile.image.url}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover opacity-90 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 top-0 flex justify-between p-4 text-paper">
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow">{tile.count} pares</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-paper">
                <span
                  className={`font-display text-3xl leading-[0.9] md:text-5xl ${tile.handle === "rebajas" ? "text-signal" : ""}`}
                >
                  {tile.title}
                </span>
                <span
                  aria-hidden
                  className="mb-1 flex h-9 w-9 flex-none items-center justify-center bg-paper text-ink transition-transform duration-300 group-hover:-rotate-45 motion-reduce:transition-none"
                >
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
