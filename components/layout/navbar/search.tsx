"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

const inputClass =
  "w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 text-base text-white placeholder:text-neutral-500 transition duration-300 ease-out outline-none hover:border-white/30 focus:border-white/40 focus:bg-white/10 md:text-sm";

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
        placeholder="Buscar zapatillas…"
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className={inputClass}
      />
      <div className="pointer-events-none absolute right-0 top-0 mr-4 flex h-full items-center text-neutral-400">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full">
      <input
        aria-label="Buscar productos"
        placeholder="Buscar zapatillas…"
        className={inputClass}
      />
      <div className="pointer-events-none absolute right-0 top-0 mr-4 flex h-full items-center text-neutral-400">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
