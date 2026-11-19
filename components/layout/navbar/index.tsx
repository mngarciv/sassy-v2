import { HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import CartModal from "components/cart/modal";
import { LogoMark } from "components/logo-mark";
import { FALLBACK_MENU } from "lib/constants";
import { getMenu } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import { AnnouncementBar } from "./announcement-bar";
import MobileMenu from "./mobile-menu";
import { NavLinks } from "./nav-links";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

const iconButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition duration-300 ease-out hover:border-white/30 hover:text-white";

export async function Navbar() {
  const shopifyMenu = await getMenu("next-js-frontend-header-menu");
  const menu = shopifyMenu.length ? shopifyMenu : FALLBACK_MENU;

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-(--breakpoint-2xl) items-center gap-4 px-4 lg:px-6">
          <div className="flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>

          <Link
            href="/"
            prefetch={true}
            aria-label="SASSY SNKRS — inicio"
            className="flex flex-1 items-center justify-center gap-2.5 md:flex-none md:justify-start"
          >
            <LogoMark />
            <span className="text-lg font-black uppercase tracking-tight">
              {SITE_NAME || "SASSY."}
            </span>
          </Link>

          <div className="hidden flex-1 justify-center md:flex lg:ml-8 lg:justify-start">
            <NavLinks menu={menu} />
          </div>

          <div className="flex flex-none items-center gap-2">
            <div className="hidden w-56 lg:block xl:w-64">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <span
              aria-disabled="true"
              title="Favoritos — próximamente"
              className={`${iconButton} hidden cursor-not-allowed opacity-60 md:flex`}
            >
              <HeartIcon className="h-4" />
              <span className="sr-only">Favoritos (próximamente)</span>
            </span>
            <span
              aria-disabled="true"
              title="Perfil — próximamente"
              className={`${iconButton} hidden cursor-not-allowed opacity-60 md:flex`}
            >
              <UserIcon className="h-4" />
              <span className="sr-only">Perfil (próximamente)</span>
            </span>
            <CartModal />
          </div>
        </div>
      </nav>
    </header>
  );
}
