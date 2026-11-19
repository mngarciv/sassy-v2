import Footer from "components/layout/footer";
import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

const panel = "glass rounded-2xl p-5 md:sticky md:top-24";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-neutral-950 text-white">
        {/* Formas geométricas en esquinas opuestas (decorativas) */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 -z-10 h-[520px] w-[38vw] max-w-[560px] bg-gradient-to-br from-neutral-800/60 via-neutral-900/30 to-transparent [clip-path:polygon(0_0,100%_0,0_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 -z-10 h-[620px] w-[42vw] max-w-[620px] bg-gradient-to-tl from-neutral-800/50 via-neutral-900/25 to-transparent [clip-path:polygon(100%_0,100%_100%,0_100%)]"
        />
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        />

        <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-6 px-4 pt-8 pb-20 md:flex-row md:gap-8 md:px-6 lg:px-8">
          <aside className="order-first w-full flex-none md:w-[200px]">
            <div className={panel}>
              <Collections />
            </div>
          </aside>

          <div className="order-last min-h-screen w-full md:order-none">
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </div>

          <aside className="order-none w-full flex-none md:order-last md:w-[200px]">
            <div className={panel}>
              <FilterList list={sorting} title="Ordenar por" />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
