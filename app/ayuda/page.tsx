import Footer from "components/layout/footer";
import { CatalogHeader } from "components/layout/search/catalog-header";
import { BRAND } from "lib/constants";

export const metadata = {
  title: "Ayuda",
  description:
    "Envíos, cambios, autenticidad y cómo vender tu par en SASSY SNKRS.",
};

/*
 * Textos base. Revísalos con las políticas reales de la tienda antes de
 * publicar (plazos, costos y condiciones de cambio).
 */
const SECTIONS = [
  {
    id: "envios",
    title: "Envíos",
    body: [
      "Despachamos a todo Chile y al extranjero.",
      "El costo y el plazo se calculan en el checkout según tu dirección. Cuando el pedido sale, te enviamos el número de seguimiento por correo.",
    ],
  },
  {
    id: "cambios",
    title: "Cambios y devoluciones",
    body: [
      "Si la talla no te queda, escríbenos por DM con tu número de pedido y te ayudamos a cambiarla según disponibilidad.",
      "El par debe estar sin uso, con su caja y accesorios originales.",
    ],
  },
  {
    id: "autenticidad",
    title: "Autenticidad",
    body: [
      "Vendemos solo pares originales. Si no lo es, no entra al stock.",
      "¿Dudas con un modelo? Pídenos fotos de detalle (etiquetas, costuras, caja) antes de comprar.",
    ],
  },
  {
    id: "vender",
    title: "Vende tu par",
    body: [
      `Mándanos fotos del par, talla y estado por DM a ${BRAND.handle}. Te respondemos con una oferta de compra.`,
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <div className="shell pt-8 pb-24 md:pt-12">
        <CatalogHeader
          crumb="Ayuda"
          title="Ayuda"
          description="Todo lo que necesitas saber antes y después de tu compra."
          showFilters={false}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <nav
            aria-label="Secciones"
            className="lg:sticky lg:top-32 lg:col-span-3 lg:self-start"
          >
            <ul className="space-y-2">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex gap-3 text-sm hover:underline"
                  >
                    <span className="eyebrow pt-0.5 text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-8 lg:col-start-5">
            {SECTIONS.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-32 border-t border-ink/15 py-10 first:border-t-0 first:pt-0"
              >
                <h2 className="font-display text-4xl md:text-5xl">{s.title}</h2>
                <div className="mt-5 max-w-2xl space-y-3 text-base leading-relaxed text-muted">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <div className="mt-6 flex flex-col items-start gap-4 bg-ink p-8 text-paper md:p-10">
              <p className="font-display text-4xl">¿Otra duda?</p>
              <p className="text-sm text-paper/70">
                Respondemos por mensaje directo en Instagram.
              </p>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex h-12 items-center bg-paper px-6 text-sm font-medium text-ink"
              >
                Escribir a {BRAND.handle}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
