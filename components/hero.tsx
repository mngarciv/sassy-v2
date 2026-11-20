import { getCollectionProducts } from "lib/shopify";
import { HeroClient, type HeroSlide } from "./hero-client";

/**
 * Hero de la home (Server Component): trae los 3 destacados de
 * `hidden-homepage-featured-items` y delega la rotación a HeroClient.
 */
export async function Hero() {
  const products = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });

  const slides: HeroSlide[] = products
    .filter((p) => p.featuredImage?.url)
    .slice(0, 3)
    .map((p) => ({
      handle: p.handle,
      title: p.title,
      vendor: p.vendor ?? "",
      image: p.featuredImage.url,
      alt: p.featuredImage.altText || p.title,
      amount: p.priceRange.minVariantPrice.amount,
      currencyCode: p.priceRange.minVariantPrice.currencyCode,
    }));

  return <HeroClient slides={slides} />;
}
