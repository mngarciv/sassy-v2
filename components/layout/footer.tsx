import { LogoMark } from "components/logo-mark";
import { BRAND, FALLBACK_MENU } from "lib/constants";
import Link from "next/link";

const { COMPANY_NAME, SITE_NAME } = process.env;

const HELP = [
  { title: "Envíos", path: "/ayuda#envios" },
  { title: "Cambios y devoluciones", path: "/ayuda#cambios" },
  { title: "Autenticidad", path: "/ayuda#autenticidad" },
  { title: "Vende o permuta tu par", path: "/ayuda#vender" },
];

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow mb-4 text-paper/40">{title}</p>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

const link =
  "text-paper/80 underline-offset-4 transition-colors hover:text-paper hover:underline";

export default function Footer() {
  const year = new Date().getFullYear();
  const name = COMPANY_NAME || "SASSY SNKRS";

  return (
    <footer className="overflow-hidden bg-ink text-paper">
      <div className="shell grid grid-cols-1 gap-12 pt-20 pb-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-display text-2xl">
              {SITE_NAME || "SASSY."}
            </span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            Zapatillas originales y streetwear. Venta, compra y permuta con
            envíos a todo Chile y el mundo.
          </p>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium"
          >
            <span className="h-2 w-2 bg-signal" aria-hidden />
            {BRAND.handle} en Instagram →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          <Column title="Tienda">
            <li>
              <Link href="/search" className={link}>
                Todo el catálogo
              </Link>
            </li>
            {FALLBACK_MENU.map((item) => (
              <li key={item.title}>
                <Link href={item.path} className={link}>
                  {item.title}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Ayuda">
            {HELP.map((item) => (
              <li key={item.title}>
                <Link href={item.path} className={link}>
                  {item.title}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Cuenta">
            <li>
              <a href={BRAND.account} className={link}>
                Mi cuenta
              </a>
            </li>
            <li>
              <a href={`${BRAND.account}/orders`} className={link}>
                Mis pedidos
              </a>
            </li>
            <li>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer"
                className={link}
              >
                Contacto por DM
              </a>
            </li>
          </Column>
        </div>
      </div>

      <div className="shell">
        <p
          aria-hidden
          className="font-display -mb-[0.12em] text-center text-[25vw] leading-[0.8] text-paper/[0.07] select-none 2xl:text-[400px]"
        >
          SASSY.
        </p>
      </div>

      <div className="border-t border-paper/10">
        <div className="shell eyebrow flex flex-col gap-2 py-5 text-[10px] text-paper/40 md:flex-row md:justify-between">
          <p>
            © {year} {name}. Todos los derechos reservados.
          </p>
          <p>Santiago, Chile · Pagos seguros vía Shopify</p>
        </div>
      </div>
    </footer>
  );
}
