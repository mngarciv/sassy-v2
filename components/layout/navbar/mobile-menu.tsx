"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BRAND } from "lib/constants";
import { Menu } from "lib/shopify/types";
import Search, { SearchSkeleton } from "./search";

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Abrir menú"
        className="flex h-10 w-10 items-center justify-center text-ink transition duration-300 ease-out hover:bg-ink hover:text-paper lg:hidden"
      >
        <Bars3Icon className="h-5" strokeWidth={1.5} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-ink/50" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed top-0 bottom-0 left-0 flex h-full w-full max-w-sm flex-col bg-paper text-ink">
              <div className="flex h-16 items-center justify-between border-b border-ink/10 px-4">
                <span className="eyebrow text-muted">Menú</span>
                <button
                  className="flex h-10 w-10 items-center justify-center transition duration-300 ease-out hover:bg-ink hover:text-paper"
                  onClick={closeMobileMenu}
                  aria-label="Cerrar menú"
                >
                  <XMarkIcon className="h-5" strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
                <div className="mb-8 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>
                <ul className="flex w-full flex-col">
                  {menu.map((item: Menu, i) => (
                    <li key={item.title} className="border-b border-ink/10">
                      <Link
                        href={item.path}
                        prefetch={true}
                        onClick={closeMobileMenu}
                        className="flex items-baseline gap-4 py-3"
                      >
                        <span className="eyebrow text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-4xl ${item.path.includes("rebajas") ? "text-signal" : ""}`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-2 pt-10">
                  <a href={BRAND.account} className="eyebrow block">
                    Mi cuenta →
                  </a>
                  <a
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="eyebrow block"
                  >
                    Instagram {BRAND.handle} →
                  </a>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
