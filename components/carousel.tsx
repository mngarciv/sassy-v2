import { SectionHeader } from "components/home/section-header";
import { ProductCard } from "components/product/product-card";
import { getCollectionProducts } from "lib/shopify";
import { CarouselClient } from "./carousel-client";

/** Carrusel de la home (Server Component): trae `hidden-homepage-carousel`. */
export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!products?.length) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="02" title="Lo más buscado" href="/search" />
      </div>
      <CarouselClient>
        {products.map((product) => (
          <ProductCard
            key={product.handle}
            product={product}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 70vw"
          />
        ))}
      </CarouselClient>
    </section>
  );
}
