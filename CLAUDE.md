# CLAUDE.md — SASSY SNKRS (`@sassy.snkrs`)

Tienda headless de zapatillas exclusivas y streetwear. Base: Vercel Next.js Commerce
(Next.js 15 App Router + React 19 + TypeScript + Tailwind CSS v4 + Shopify Storefront API).
Referencia visual: `mngarciv/darkglass-shoppers` (app TanStack Start/Lovable con datos mock;
solo se rescatan patrones visuales: `.glass`, `.glass-strong`, `.grain`, metadatos en mono).
`wireframe/` contiene el wireframe HTML original (copy, secciones, marquee); es referencia,
no se despliega.

## Comandos

- Gestor de paquetes: **pnpm** (nunca npm/yarn; no commitear `package-lock.json`).
- `pnpm dev` · `pnpm build` · `pnpm prettier` · `pnpm test` (= prettier:check).
- Antes de dar algo por terminado: `pnpm build` sin errores de tipos.

## Variables de entorno (`.env.local`, nunca commitear)

`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `SHOPIFY_REVALIDATION_SECRET`,
`COMPANY_NAME=SASSY SNKRS`, `SITE_NAME=SASSY.`

## Guardrails (no negociables)

1. **No romper Shopify.** Respetar `lib/shopify/types.ts`, `lib/shopify/index.ts`,
   `lib/shopify/queries/*` y `fragments/*`. Para nuevas capacidades (p. ej. paginación)
   se **agregan** funciones/queries/tipos nuevos (`getProductsPage`, `pageInfo`, …);
   no se cambia la firma de `getProducts` / `getCollectionProducts`, que usan otras páginas.
2. **Carrito intacto.** No eliminar ni reescribir la lógica de Server Actions en
   `components/cart/` (`actions.ts`, `cart-context.tsx`). Solo se re-estiliza la UI.
3. **Server vs. Client.** Data-fetching en Server Components (`async function`).
   `useState`/`useRef`/`useEffect`/eventos solo en hijos con `'use client'`.
   Patrón: `foo.tsx` (server, trae datos) → `foo-client.tsx` (client, interacción),
   pasando props serializables (nunca funciones ni clases).
4. Mantener `"use cache"` / `cacheTag` / `cacheLife` existentes en el data layer.
5. Imágenes siempre con `next/image` y `sizes` correctos; dominios en `next.config.ts`.

## Sistema de diseño — "Gallery" (claro editorial)

Reemplaza al antiguo "Dark Editorial & Glassmorphism" (ya no hay `.glass`, `dark:` ni
`<html class="dark">`). Referencias: tiendas de sneakers mejor evaluadas (END., SNS, KITH):
lienzo claro, fotos de estudio a sangre, tipografía display condensada, filetes finos,
esquinas rectas y un solo color de acento. Tokens en `@theme` de `app/globals.css`.

| Token                 | Uso                                                                         |
| --------------------- | --------------------------------------------------------------------------- |
| `bg-paper` `text-ink` | Lienzo hueso cálido (#eeece7) y tinta casi negra (#0f0f0e)                  |
| `bg-paper-2/3`        | Fondo de cajas de imagen y skeletons                                        |
| `bg-ink text-paper`   | Bloques de contraste: franja de anuncios, hero, bloque de marca, footer     |
| `text-muted`          | Texto secundario (#6c6862)                                                  |
| `signal` (#ff4d00)    | ÚNICO acento: rebajas, % de descuento, puntos de énfasis. Nunca en CTA      |
| Bordes                | Filetes `border-ink/10–20`; hover `hover:border-ink`                        |
| CTA primario          | `h-14 bg-ink text-paper` (sobre oscuro: `bg-paper text-ink`), sin `rounded` |

- Utilidades propias: `font-display` (Archivo condensada `wdth 72`, 800, mayúsculas — títulos),
  `eyebrow` (mono 11px, mayúsculas, tracking amplio — metadatos/índices), `shell`
  (contenedor 1600px con gutter 16/32px). Texto corrido en Geist Sans.
- Sin `rounded-*` en tarjetas/botones (excepto el logo circular), sin glass ni degradados de UI.
- Fotos de producto: son fotos de estudio 4:5 → `object-cover` a sangre en `aspect-[4/5]`.
- **Tarjeta estándar** `components/product/product-card.tsx`: imagen 4:5 sobre `bg-paper-2`,
  badge `−X%` en signal si hay `compareAtPrice`, debajo marca (`eyebrow`), nombre y precio
  alineados a la izquierda. Hover: zoom lento (700ms) + "Ver par →". Usar en grillas, carrusel,
  relacionados y rebajas. Grilla estándar: `PRODUCT_GRID_CLASS` (`lib/constants.ts`).
- Encabezados de sección: `components/home/section-header.tsx` (índice 01/02… + título display).
- Grillas con columnas solo en breakpoint: siempre `grid-cols-1` base (si no, la columna implícita
  crece con el texto y desborda en móvil).
- Transiciones `duration-300 ease-out` (imágenes 700ms); respetar `motion-reduce:`.
- Copy en español (Chile). Montos con `formatMoney` / `components/price.tsx` (es-CL).

## Mapa de páginas y componentes

- **Navbar** `components/layout/navbar/index.tsx`: franja `announcement-bar.tsx` (ink), logo +
  `SASSY.` en display, menú Shopify con `FALLBACK_MENU`, `nav-links.tsx` (activo por ruta + query;
  Rebajas en signal), buscador subrayado, Mi cuenta (cuentas de cliente Shopify), `<CartModal />`.
- **Home** `app/page.tsx`: `hero.tsx` → `hero-client.tsx` (3 destacados de
  `hidden-homepage-featured-items`, stack con peek, autoplay 6s con barra de progreso, pausa en
  hover/focus y con reduced-motion) · `marquee.tsx` · `home/category-tiles.tsx` (Hombres, Mujeres,
  Rebajas, Ediciones limitadas: `HOME_CATEGORIES`) · `carousel.tsx` → `carousel-client.tsx` (Embla,
  `hidden-homepage-carousel`) · `home/brand-story.tsx` · `home/sale-row.tsx` (colección `rebajas`).
- **Catálogo** `app/search/*`: `layout/search/catalog-header.tsx` (migas, título display, píldoras
  de colección `collection-pills*.tsx` y `sort-select.tsx`), grilla `ProductGridItems`, paginación
  por cursor (`?after=`/`?before=`); cambiar colección u orden reinicia el cursor.
- **Producto** `app/product/[handle]/page.tsx`: galería 4:5 con miniaturas, info sticky
  (marca → `/marcas/[vendor]`, precio con tachado, tallas en grilla, opciones de un solo valor
  se muestran como dato y se dan por elegidas en `add-to-cart.tsx`), acordeones, relacionados.
- **Carro** `components/cart/modal.tsx`: drawer claro; lógica y Server Actions intactas.
- **Marcas** `app/marcas/page.tsx` y `app/marcas/[vendor]/page.tsx` (agrupa `getProducts` por `vendor`).
- **Ayuda** `app/ayuda/page.tsx` (#envios, #cambios, #autenticidad, #vender) — textos base a validar.
- **Footer** `components/layout/footer.tsx` (ink, columnas Tienda/Ayuda/Cuenta, wordmark gigante).
- `app/not-found.tsx` y `app/error.tsx` con el mismo lenguaje.

## Datos en Shopify (tienda `24xq-wrumga-xr.myshopify.com`)

- Tienda real (en prueba gratuita, Chile, CLP, precios con IVA incluido). Reemplaza a la tienda de
  desarrollo `sassy-sneakers-axlmf8dk`, que no podía pasar a plan pagado (se puede eliminar).
- Los productos se publican en los canales **Online Store** y **Headless**; Vercel usa el token
  público del canal Headless (`SHOPIFY_STORE_DOMAIN` / `SHOPIFY_STOREFRONT_ACCESS_TOKEN`).

- Catálogo de muestra: 27 modelos reales (Nike, Jordan, Nike SB, adidas, New Balance, Converse,
  Vans, Puma, Salomon, Timberland, Dr. Martens, Birkenstock) con precios en CLP y tallas US 7–11.
  Las fotos son provisorias (estudio genérico de mock.shop, silueta parecida): reemplazarlas por
  fotos propias del stock. Publicado en Online Store y Headless.
- Moneda: CLP (montos en pesos). La moneda de la tienda solo se cambia en Shopify Admin, no por API.
- Copy: la tienda hace **compra y venta**; no ofrece permuta (no mencionarla).
- Colecciones: `hombres`, `mujeres`, `rebajas` (7 productos con `compareAtPrice`),
  `sneakers-and-trainers` (Zapatillas), `streetwear-footwear` (Calzado urbano),
  `editorial-edge-originals` (Ediciones limitadas), `hidden-homepage-featured-items`,
  `hidden-homepage-carousel`. Las `hidden-*` no salen en el catálogo.
- El fragmento de producto incluye `vendor` y `compareAtPriceRange`/`compareAtPrice` (campos
  opcionales agregados; firmas de funciones sin cambios).

## Convenciones de código

- Imports absolutos (`components/...`, `lib/...`) como en el template.
- `clsx` para clases condicionales; Prettier + `prettier-plugin-tailwindcss` ordena clases.
- Componentes nuevos: un componente por archivo, nombres `kebab-case.tsx`, export nombrado
  salvo páginas/layouts.
- Commits pequeños y descriptivos en español (`feat(grid): tarjetas editoriales oscuras`).

## Estado (actualizar al cerrar cada sesión)

- [x] Sistema "Gallery" claro reemplaza dark/glass en todo el sitio.
- [x] Home completa: hero con stack rotativo, marquee, categorías, carrusel Embla, marca, rebajas, footer.
- [x] Catálogo con píldoras/orden, producto, carro, Marcas, Ayuda, 404 y error re-estilizados.
- [x] Colecciones faltantes creadas en Shopify (Mujeres/Rebajas daban 404).
- [ ] Revisar textos de `/ayuda` con las políticas reales.
- [x] Catálogo con modelos reales y precios CLP; sin menciones a permuta.
- [x] Tienda migrada a `24xq-wrumga-xr` (CLP, Chile) y conectada a Vercel.
- [ ] Plan pagado (Basic) + Mercado Pago; luego Webpay (Transbank) y Fintoc/Khipu.
- [ ] Inicio de actividades SII y boleta electrónica (Bsale/OpenFactura).
- [ ] Compra de prueba completa (checkout protegido con contraseña hasta elegir plan).
- [ ] Reemplazar fotos provisorias por las propias y activar control de inventario (1 par por talla).
- [ ] Favoritos (requiere cuentas de cliente / almacenamiento).
