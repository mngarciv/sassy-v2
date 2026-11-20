"use client";

import clsx from "clsx";
import { optionLabel } from "lib/product-utils";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return options.map((option) => {
    // Opción con un único valor (p. ej. un solo color): se muestra como dato.
    if (option.values.length === 1) {
      return (
        <p key={option.id} className="mb-6 text-sm">
          <span className="eyebrow mr-3 text-muted">
            {optionLabel(option.name)}
          </span>
          {option.values[0]}
        </p>
      );
    }

    return (
      <form key={option.id}>
        <dl className="mb-8">
          <dt className="mb-3 flex items-center justify-between">
            <span className="eyebrow">{optionLabel(option.name)}</span>
            {searchParams.get(option.name.toLowerCase()) ? (
              <span className="eyebrow text-muted">
                {searchParams.get(option.name.toLowerCase())}
              </span>
            ) : (
              <span className="eyebrow text-signal">Elige una</span>
            )}
          </dt>
          <dd className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase();

              // Base option params on current searchParams so we can preserve any other param state.
              const optionParams: Record<string, string> = {};
              searchParams.forEach((v, k) => (optionParams[k] = v));
              optionParams[optionNameLowerCase] = value;

              // Filter out invalid options and check if the option combination is available for sale.
              const filtered = Object.entries(optionParams).filter(
                ([key, value]) =>
                  options.find(
                    (option) =>
                      option.name.toLowerCase() === key &&
                      option.values.includes(value),
                  ),
              );
              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, value]) =>
                    combination[key] === value && combination.availableForSale,
                ),
              );

              // The option is active if it's in the selected options.
              const isActive = searchParams.get(optionNameLowerCase) === value;

              return (
                <button
                  formAction={() => updateOption(optionNameLowerCase, value)}
                  key={value}
                  aria-disabled={!isAvailableForSale}
                  aria-pressed={isActive}
                  disabled={!isAvailableForSale}
                  title={`${optionLabel(option.name)} ${value}${!isAvailableForSale ? " (agotado)" : ""}`}
                  className={clsx(
                    "flex h-12 items-center justify-center border text-sm transition-colors duration-200",
                    {
                      "cursor-default border-ink bg-ink text-paper": isActive,
                      "border-ink/20 hover:border-ink":
                        !isActive && isAvailableForSale,
                      "cursor-not-allowed border-ink/10 text-ink/30 line-through":
                        !isAvailableForSale,
                    },
                  )}
                >
                  {value}
                </button>
              );
            })}
          </dd>
        </dl>
      </form>
    );
  });
}
