import { ProductCard } from "components/product/product-card";
import { Product } from "lib/shopify/types";

/**
 * Ítems de la grilla de catálogo. Se renderiza dentro de <Grid> (un <ul>).
 * Usa <li> propio en vez de Grid.Item porque éste fuerza aspect-square,
 * y la tarjeta define su propia proporción (4/5 + texto abajo).
 */
export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product, index) => (
        <li
          key={product.handle}
          className="animate-fadeIn"
          style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
        >
          <ProductCard product={product} priority={index < 4} />
        </li>
      ))}
    </>
  );
}
