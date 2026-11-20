import { BRAND } from "lib/constants";

const STATS = [
  { value: "+3000", label: "Ventas concretadas" },
  { value: "6", label: "Años en la escena" },
  { value: "100%", label: "Pares originales" },
];

const STEPS = [
  {
    title: "Compra",
    body: "Solo pares originales. Si no es original, no entra al stock.",
  },
  {
    title: "Vende",
    body: `Cotiza tu par por mensaje directo en ${BRAND.handle}.`,
  },
  {
    title: "Recibe",
    body: "Despachamos a todo Chile y el mundo, con seguimiento de tu pedido.",
  },
];

/** Bloque editorial: quiénes somos, cifras y cómo funciona. */
export function BrandStory() {
  return (
    <section className="bg-ink text-paper">
      <div className="shell grid grid-cols-1 gap-16 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-paper/50">03 — Sobre SASSY</p>
          <h2 className="font-display mt-6 text-5xl leading-[0.9] md:text-7xl xl:text-8xl">
            Pares que no
            <br />
            encuentras en
            <br />
            <span className="text-signal">el mall.</span>
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-paper/70 md:text-lg">
            Seis años moviendo zapatillas a todo Chile y el mundo con el mismo
            criterio desde el primer par: solo originales y trato directo.
          </p>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex h-14 items-center gap-3 border border-paper/30 px-8 text-sm font-medium transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink"
          >
            Síguenos en {BRAND.handle}
          </a>
        </div>

        <div className="flex flex-col justify-between gap-12 lg:col-span-5">
          <dl className="grid grid-cols-3 gap-4 border-y border-paper/15 py-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="eyebrow mt-2 text-paper/50">{stat.label}</dt>
                <dd className="font-display text-4xl md:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <ol className="space-y-0">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-paper/15 py-5"
              >
                <span className="eyebrow pt-2 text-paper/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-3xl">{step.title}</p>
                  <p className="mt-1 text-sm text-paper/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
