"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;

  const updateImage = (index: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const arrow =
    "flex h-11 w-11 items-center justify-center bg-paper text-ink transition-colors duration-300 hover:bg-ink hover:text-paper";

  return (
    <form className="flex flex-col-reverse gap-3 md:flex-row">
      {images.length > 1 ? (
        <ul className="no-scrollbar flex gap-2 overflow-x-auto md:w-20 md:flex-none md:flex-col md:overflow-visible">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            return (
              <li key={image.src} className="w-16 flex-none md:w-full">
                <button
                  formAction={() => updateImage(index.toString())}
                  aria-label={`Ver imagen ${index + 1}`}
                  aria-current={isActive}
                  className={clsx(
                    "relative block aspect-[4/5] w-full overflow-hidden bg-paper-2 transition-opacity",
                    isActive
                      ? "ring-1 ring-ink ring-offset-2 ring-offset-paper"
                      : "opacity-60 hover:opacity-100",
                  )}
                >
                  <Image
                    alt={image.altText}
                    src={image.src}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2">
        {images[imageIndex] && (
          <Image
            key={images[imageIndex]?.src}
            className="animate-fadeIn object-cover"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute right-4 bottom-4 flex gap-1">
            <button
              formAction={() => updateImage(previousImageIndex.toString())}
              aria-label="Imagen anterior"
              className={arrow}
            >
              <ArrowLeftIcon className="h-4" />
            </button>
            <button
              formAction={() => updateImage(nextImageIndex.toString())}
              aria-label="Imagen siguiente"
              className={arrow}
            >
              <ArrowRightIcon className="h-4" />
            </button>
          </div>
        ) : null}

        {images.length > 1 ? (
          <span className="eyebrow absolute top-4 left-4 bg-paper px-2 py-1">
            {String(imageIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        ) : null}
      </div>
    </form>
  );
}
