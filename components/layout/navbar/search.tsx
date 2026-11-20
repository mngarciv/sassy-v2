"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

const inputClass =
  "w-full border-0 border-b border-ink/25 bg-transparent py-2 pr-8 pl-0 text-base text-ink placeholder:text-muted transition-colors duration-300 ease-out outline-none hover:border-ink/60 focus:border-ink focus:ring-0 md:text-sm";

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" role="search" className="relative w-full">
      <label htmlFor="navbar-search" className="sr-only">
        Buscar productos
      </label>
      <input
        id="navbar-search"
        key={searchParams?.get("q")}
        type="search"
        name="q"
        placeholder="Buscar modelo, marca…"
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className={inputClass}
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute top-0 right-0 flex h-full items-center text-ink"
      >
        <MagnifyingGlassIcon className="h-4" strokeWidth={2} />
      </button>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full">
      <input
        aria-label="Buscar productos"
        placeholder="Buscar modelo, marca…"
        className={inputClass}
      />
      <div className="pointer-events-none absolute top-0 right-0 flex h-full items-center text-ink">
        <MagnifyingGlassIcon className="h-4" strokeWidth={2} />
      </div>
    </form>
  );
}
