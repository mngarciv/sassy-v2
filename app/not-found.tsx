import Footer from "components/layout/footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="shell flex min-h-[70vh] flex-col justify-center py-24">
        <p className="eyebrow text-muted">Error 404</p>
        <h1 className="font-display mt-4 text-[clamp(5rem,18vw,16rem)] leading-[0.8]">
          Sin
          <br />
          stock<span className="text-signal">.</span>
        </h1>
        <p className="mt-8 max-w-md text-base text-muted">
          Esta página no existe o el par ya se fue. Revisa el catálogo: siempre
          entra algo nuevo.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/search"
            className="inline-flex h-14 items-center bg-ink px-8 text-sm font-medium text-paper transition-colors hover:bg-ink-2"
          >
            Ver catálogo
          </Link>
          <Link
            href="/"
            className="inline-flex h-14 items-center border border-ink px-8 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
