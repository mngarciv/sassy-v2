import { ProductCard } from "components/product/product-card";
import { Product } from "lib/shopify/types";

/**
 * Ítems de la grilla de catálogo. Se renderiza dentro de <Grid> (un <ul>).
 * Usa <li> propio en vez de Grid.Item porque éste fuerza aspect-square,
 * y la tarjeta editorial define su propia proporción (4/5 + texto abajo).
 */
export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product, index) => (
        <li key={product.handle} className="animate-fadeIn">
          <ProductCard
            product={product}
            priority={index < 3}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          />
        </li>
      ))}
    </>
  );
}
