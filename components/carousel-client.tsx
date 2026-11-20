"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import useEmblaCarousel from "embla-carousel-react";
import {
  Children,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const control =
  "flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper";

/** Carrusel Embla con loop, flechas y barra de progreso. Recibe tarjetas ya renderizadas. */
export function CarouselClient({ children }: { children: ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });
  const [progress, setProgress] = useState(0);
  const slides = Children.toArray(children);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", onScroll).on("reInit", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);

  return (
    <div>
      <div
        ref={emblaRef}
        className="overflow-hidden pl-4 md:pl-8 2xl:pl-[calc((100vw-1600px)/2+2rem)]"
      >
        <ul className="-ml-3 flex touch-pan-y md:-ml-4">
          {slides.map((slide, i) => (
            <li
              key={i}
              className="min-w-0 flex-[0_0_72%] pl-3 sm:flex-[0_0_44%] md:flex-[0_0_31%] md:pl-4 xl:flex-[0_0_23%]"
            >
              {slide}
            </li>
          ))}
        </ul>
      </div>

      <div className="shell mt-8 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-ink/15">
          <div
            className="absolute inset-y-0 left-0 w-1/4 bg-ink transition-transform duration-150 ease-out"
            style={{ transform: `translateX(${progress * 300}%)` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Anterior"
            className={control}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ArrowLeftIcon className="h-4" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            className={control}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ArrowRightIcon className="h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
