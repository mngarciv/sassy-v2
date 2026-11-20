"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { formatMoney } from "components/price";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type HeroSlide = {
  handle: string;
  title: string;
  vendor: string;
  image: string;
  alt: string;
  amount: string;
  currencyCode: string;
};

const INTERVAL = 6000;

/** Posición visual de cada carta del stack según su distancia a la activa. */
const STACK = [
  "z-30 translate-x-0 scale-100 opacity-100",
  "z-20 translate-x-[14%] scale-[0.9] opacity-60 brightness-75",
  "z-10 translate-x-[26%] scale-[0.8] opacity-35 brightness-50",
];

export function HeroClient({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next = useCallback(
    () => setActive((i) => (count ? (i + 1) % count : 0)),
    [count],
  );

  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const id = window.setTimeout(next, INTERVAL);
    return () => window.clearTimeout(id);
  }, [active, paused, reduced, count, next]);

  const current = slides[active];

  return (
    <section
      className="relative isolate overflow-hidden bg-ink text-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Fondo ambiental: la foto activa, desaturada y difuminada */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {slides.map((slide, i) => (
          <Image
            key={slide.handle}
            src={slide.image}
            alt=""
            fill
            sizes="100vw"
            className={clsx(
              "scale-110 object-cover blur-[4px] grayscale transition-opacity duration-1000 ease-out",
              i === active ? "opacity-25" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      </div>

      <div className="shell grid min-h-[calc(100svh-6rem)] grid-cols-1 items-center gap-12 py-12 lg:max-h-[920px] lg:grid-cols-12 lg:py-16">
        <div className="flex min-w-0 flex-col lg:col-span-6">
          <p className="eyebrow flex items-center gap-3 text-paper/60">
            <span className="h-px w-8 bg-paper/40" />
            Selección de la semana
          </p>

          <h1 className="font-display mt-10 text-[clamp(4.75rem,15vw,13.5rem)] leading-[0.86]">
            Sé
            <br />
            único<span className="text-signal">.</span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-paper/70 md:text-lg">
            Zapatillas originales y pares difíciles de encontrar. Compra y venta
            con despacho a todo Chile y el mundo.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/search"
              className="group inline-flex h-14 items-center gap-3 bg-paper px-8 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white"
            >
              Explorar todo
              <ArrowRightIcon className="h-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
            <Link
              href="/search/rebajas"
              className="text-sm font-medium underline decoration-paper/40 underline-offset-8 transition-colors hover:decoration-signal"
            >
              Ver rebajas
            </Link>
          </div>
        </div>

        {current ? (
          <div className="min-w-0 lg:col-span-6">
            <div className="relative mr-auto w-[72%] max-w-[460px] lg:mr-[18%] lg:ml-auto">
              <div className="relative aspect-[4/5]">
                {slides.map((slide, i) => {
                  const offset = (i - active + count) % count;
                  const isFront = offset === 0;
                  return (
                    <Link
                      key={slide.handle}
                      href={`/product/${slide.handle}`}
                      tabIndex={isFront ? 0 : -1}
                      aria-hidden={!isFront}
                      className={clsx(
                        "absolute inset-0 origin-right overflow-hidden bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none",
                        STACK[offset] ?? "opacity-0",
                        !isFront && "pointer-events-none",
                      )}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        priority={i === 0}
                        sizes="(min-width: 1024px) 460px, 74vw"
                        className="object-cover"
                      />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div key={current.handle} className="animate-fadeIn min-w-0">
                  {current.vendor ? (
                    <p className="eyebrow text-paper/50">{current.vendor}</p>
                  ) : null}
                  <p className="font-display mt-1 truncate text-3xl">
                    {current.title}
                  </p>
                  <p className="mt-1 text-sm text-paper/70">
                    {formatMoney(current.amount, current.currencyCode)}
                  </p>
                </div>

                {count > 1 ? (
                  <div className="flex flex-none gap-2" role="tablist">
                    {slides.map((slide, i) => (
                      <button
                        key={slide.handle}
                        role="tab"
                        aria-selected={i === active}
                        aria-label={`Ver ${slide.title}`}
                        onClick={() => setActive(i)}
                        className="group w-10 pt-2 text-left"
                      >
                        <span
                          className={clsx(
                            "eyebrow block transition-colors",
                            i === active
                              ? "text-paper"
                              : "text-paper/40 group-hover:text-paper/80",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-2 block h-px w-full overflow-hidden bg-paper/20">
                          {i === active ? (
                            <span
                              key={`${active}-${paused}`}
                              className={clsx(
                                "block h-full origin-left bg-paper",
                                !paused && !reduced && "animate-progress",
                              )}
                              style={{ animationDuration: `${INTERVAL}ms` }}
                            />
                          ) : null}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
