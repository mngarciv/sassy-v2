import Grid from "components/grid";
import { PRODUCT_GRID_CLASS } from "lib/constants";

export default function Loading() {
  return (
    <>
      <div className="mb-10 space-y-6">
        <div className="h-3 w-32 animate-pulse bg-paper-3" />
        <div className="h-16 w-2/3 animate-pulse bg-paper-3 md:h-24 md:w-1/3" />
        <div className="h-[70px] border-y border-ink/15" />
      </div>
      <Grid className={PRODUCT_GRID_CLASS}>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <li key={index}>
              <div className="aspect-[4/5] w-full animate-pulse bg-paper-2" />
              <div className="mt-3 space-y-2">
                <div className="h-3 w-1/3 animate-pulse bg-paper-3" />
                <div className="h-4 w-2/3 animate-pulse bg-paper-3" />
              </div>
            </li>
          ))}
      </Grid>
    </>
  );
}
