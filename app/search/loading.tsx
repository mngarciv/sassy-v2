import Grid from "components/grid";

export default function Loading() {
  return (
    <>
      <div className="mb-8 space-y-3">
        <div className="h-3 w-32 animate-pulse rounded bg-neutral-800" />
        <div className="h-9 w-48 animate-pulse rounded bg-neutral-800" />
      </div>
      <Grid className="grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <li key={index}>
              <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-900" />
              <div className="mt-4 flex justify-between gap-4 px-1">
                <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-800" />
                <div className="h-4 w-14 animate-pulse rounded bg-neutral-800" />
              </div>
            </li>
          ))}
      </Grid>
    </>
  );
}
