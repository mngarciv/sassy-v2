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

## Sistema de diseño — Dark Editorial & Premium Glassmorphism

Solo modo oscuro: `<html class="dark">` + `@custom-variant dark` en `globals.css`, así que
todo `dark:` heredado del template queda siempre activo. No usar `bg-white`, `border-neutral-200`, `blue-600` ni los labels
flotantes en píldora de Vercel (`components/label.tsx`) en vistas nuevas.

| Token                                | Clases Tailwind                                                           |
| ------------------------------------ | ------------------------------------------------------------------------- |
| Lienzo                               | `bg-neutral-950 text-white`                                               |
| Tarjeta de producto (caja de imagen) | `bg-gradient-to-b from-neutral-800 to-neutral-950 rounded-2xl`            |
| Panel de cristal                     | clase `.glass rounded-2xl` (definida en `app/globals.css`)                |
| Panel de cristal fuerte              | clase `.glass-strong` (navbar, modales, carrito)                          |
| Navbar                               | `sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10` |
| Texto secundario                     | `text-neutral-400` · bordes hover `hover:border-white/30`                 |
| Acento / CTA                         | `bg-white text-black` (invertido) · hover `bg-neutral-200`                |
| Sombra 3D de zapatilla               | `drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)]`                               |

- Fuentes: Geist Sans (`font-sans`) para texto, Geist Mono (`font-mono`) para metadatos/precios/CTA pequeños.
- Tipografía: limpia, alto contraste, títulos en mayúsculas con `tracking-tight`/`font-black`;
  metadatos en `text-xs uppercase tracking-widest text-neutral-400`.
- Fotos de producto silueteadas (sin fondo): `object-contain` + drop-shadow, centradas
  con padding (`p-6`), nunca `object-cover` en tarjetas de producto.
- **Tarjeta editorial estándar** (`components/product/product-card.tsx`): contenedor
  `aspect-[4/5]` con degradado; título y precio **fuera** de la caja, debajo, alineados
  a la izquierda (título `text-sm font-medium`, precio `text-sm text-neutral-400`).
  Hover: imagen `scale-105` + leve elevación. Reutilizarla en grid, carrusel y relacionados.
- Transiciones: `transition duration-300 ease-out`; respetar `motion-reduce:`.
- Copy en español (Chile). Moneda desde Shopify vía `components/price.tsx`.

## Mapa de páginas y componentes

- **Navbar** `components/layout/navbar/index.tsx`: logo circular `public/logo-SS.png` + `SASSY.`;
  menú desde Shopify (`getMenu`) con fallback `NUEVOS LLEGADOS, HOMBRES, MUJERES, MARCAS, REBAJAS`
  → `/search` y `/search/[collection]`; buscador oscuro, iconos Perfil/Favoritos, `<CartModal />`.
- **Home** `app/page.tsx`: `components/hero.tsx` (fondo `grayscale blur-[4px]`, “SÉ ÚNICO.”,
  CTA “Explorar Todo” → `/search`, stack rotativo de 3 zapatillas con _peek_ a la derecha en
  `hero-client.tsx`), `components/carousel.tsx` (server) + `carousel-client.tsx` (Embla, loop).
- **Footer** `components/layout/footer.tsx`: dark, sin “Deploy on Vercel”, enlaces de marca,
  envíos/devoluciones, redes `@sassy.snkrs`.
- **Catálogo** `app/search/layout.tsx`, `app/search/page.tsx`, `app/search/[collection]/page.tsx`:
  filtros en paneles de cristal (Colecciones izq., Ordenar der.) sobre formas `clip-path`
  en esquinas opuestas; grilla con `ProductGridItems` → `ProductCard`; paginación por cursor
  Anterior/Siguiente (`?after=` / `?before=`) con `getProductsPage` / `getCollectionProductsPage`
  y `components/layout/search/pagination.tsx`. Cambiar de colección u orden reinicia el cursor.

## Convenciones de código

- Imports absolutos (`components/...`, `lib/...`) como en el template.
- `clsx` para clases condicionales; Prettier + `prettier-plugin-tailwindcss` ordena clases.
- Componentes nuevos: un componente por archivo, nombres `kebab-case.tsx`, export nombrado
  salvo páginas/layouts.
- Commits pequeños y descriptivos en español (`feat(grid): tarjetas editoriales oscuras`).

## Estado (actualizar al cerrar cada sesión)

- [x] Tema dark global, utilidades glass, `ProductCard`, grilla, paginación por cursor, layout `/search`.
- [x] Navbar: logo `public/logo-SS.png` (recreado desde el avatar de IG: Bebas Neue sobre
      círculo negro; reemplazar por el original si aparece) vía `components/logo-mark.tsx`,
      franja `announcement-bar.tsx` con sellos de IG, menú Shopify con `FALLBACK_MENU`
      (`lib/constants.ts`), `nav-links.tsx` (client, estado activo), buscador y menú móvil
      oscuros. Favoritos/Perfil son iconos deshabilitados ("próximamente") hasta tener rutas.
- [ ] Hero con stack rotativo · carrusel Embla (`pnpm add embla-carousel-react`) · footer.
- [ ] Página de producto y carrito re-estilizados (siguen con `GridTileImage` del template).
