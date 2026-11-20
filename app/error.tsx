"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow text-muted">Algo falló</p>
      <h2 className="font-display mt-4 text-6xl md:text-8xl">
        Se nos cayó
        <br />
        el par<span className="text-signal">.</span>
      </h2>
      <p className="mt-6 max-w-md text-muted">
        Hubo un problema al cargar la tienda. Suele ser momentáneo: inténtalo de
        nuevo.
      </p>
      <button
        className="mt-10 inline-flex h-14 w-fit items-center bg-ink px-8 text-sm font-medium text-paper transition-colors hover:bg-ink-2"
        onClick={() => reset()}
      >
        Reintentar
      </button>
    </section>
  );
}
