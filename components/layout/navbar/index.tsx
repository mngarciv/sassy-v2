import { UserIcon } from "@heroicons/react/24/outline";
import CartModal from "components/cart/modal";
import { LogoMark } from "components/logo-mark";
import { BRAND, FALLBACK_MENU } from "lib/constants";
import { getMenu } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import { AnnouncementBar } from "./announcement-bar";
import MobileMenu from "./mobile-menu";
import { NavLinks } from "./nav-links";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

const iconButton =
  "flex h-10 w-10 items-center justify-center text-ink transition duration-300 ease-out hover:bg-ink hover:text-paper";

export async function Navbar() {
  const shopifyMenu = await getMenu("next-js-frontend-header-menu");
  const menu = shopifyMenu.length ? shopifyMenu : FALLBACK_MENU;

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <nav className="border-b border-ink/10 bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80">
        <div className="shell flex h-16 items-center gap-4">
          <div className="flex-none lg:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>

          <Link
            href="/"
            prefetch={true}
            aria-label="SASSY SNKRS — inicio"
            className="flex flex-1 items-center justify-center gap-2.5 lg:flex-none lg:justify-start"
          >
            <LogoMark />
            <span className="font-display text-2xl leading-none">
              {SITE_NAME || "SASSY."}
            </span>
          </Link>

          <div className="hidden flex-1 justify-center lg:flex">
            <Suspense fallback={null}>
              <NavLinks menu={menu} />
            </Suspense>
          </div>

          <div className="flex flex-none items-center gap-1">
            <div className="mr-2 hidden w-52 lg:block xl:w-60">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <a
              href={BRAND.account}
              className={`${iconButton} hidden sm:flex`}
              aria-label="Mi cuenta"
              title="Mi cuenta"
            >
              <UserIcon className="h-5" strokeWidth={1.5} />
            </a>
            <CartModal />
          </div>
        </div>
      </nav>
    </header>
  );
}
