"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    "relative flex h-14 w-full items-center justify-center gap-3 bg-ink text-sm font-medium text-paper transition-colors duration-300";
  const disabledClasses = "cursor-not-allowed bg-ink/30";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Agotado
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Selecciona una talla"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        Selecciona una talla
      </button>
    );
  }

  return (
    <button
      aria-label="Agregar al carro"
      className={clsx(buttonClasses, "hover:bg-ink-2")}
    >
      <PlusIcon className="h-4" />
      Agregar al carro
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale, options } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);

  // Las opciones con un único valor (p. ej. un solo color) se dan por elegidas.
  const fixedOptions = new Set(
    options.filter((o) => o.values.length === 1).map((o) => o.name),
  );
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) =>
        fixedOptions.has(option.name) ||
        option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
