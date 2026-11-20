import type { Product } from "lib/shopify/types";

/** Porcentaje de descuento (entero) si el producto está rebajado; si no, null. */
export function getDiscount(product: Product): number | null {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAt = parseFloat(
    product.compareAtPriceRange?.maxVariantPrice.amount ?? "0",
  );
  if (!compareAt || compareAt <= price) return null;
  return Math.round((1 - price / compareAt) * 100);
}

/** Nombre visible de una opción de variante de Shopify. */
export function optionLabel(name: string) {
  const key = name.toLowerCase();
  if (key === "size" || key === "talla") return "Talla";
  if (key === "us shoe size") return "Talla US";
  if (key === "colour" || key === "color") return "Color";
  return name;
}

/** Segmento de URL para una marca (vendor). */
export function vendorSlug(vendor: string) {
  return encodeURIComponent(vendor.toLowerCase().replace(/\s+/g, "-"));
}
