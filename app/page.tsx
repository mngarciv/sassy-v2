import { Carousel } from "components/carousel";
import { Hero } from "components/hero";
import { BrandStory } from "components/home/brand-story";
import { CategoryTiles } from "components/home/category-tiles";
import { SaleRow } from "components/home/sale-row";
import Footer from "components/layout/footer";
import { Marquee } from "components/marquee";

export const metadata = {
  description:
    "Zapatillas originales y streetwear en Chile. Venta, compra y permuta con envíos a todo Chile y el mundo.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          "100% originales",
          "Envíos a todo Chile",
          "Venta · Compra · Permuta",
          "+3000 ventas",
          "Stock limitado",
        ]}
      />
      <CategoryTiles />
      <Carousel />
      <BrandStory />
      <SaleRow />
      <Footer />
    </>
  );
}
