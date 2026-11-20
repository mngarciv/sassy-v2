"use client";

import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Abrir carro" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
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
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed top-0 right-0 bottom-0 flex h-full w-full flex-col bg-paper text-ink md:w-[440px]">
              <div className="flex h-16 flex-none items-center justify-between border-b border-ink/10 px-5">
                <p className="font-display text-2xl">
                  Tu carro
                  {cart?.totalQuantity ? (
                    <span className="ml-2 align-top font-mono text-xs text-muted">
                      ({cart.totalQuantity})
                    </span>
                  ) : null}
                </p>
                <button aria-label="Cerrar carro" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                  <ShoppingCartIcon
                    className="h-10 text-muted"
                    strokeWidth={1.25}
                  />
                  <p className="font-display mt-6 text-4xl">
                    Tu carro está vacío
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Encuentra tu próximo par en el catálogo.
                  </p>
                  <Link
                    href="/search"
                    onClick={closeCart}
                    className="mt-8 inline-flex h-12 items-center bg-ink px-8 text-sm font-medium text-paper transition-colors duration-300 hover:bg-ink-2"
                  >
                    Explorar catálogo
                  </Link>
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col justify-between">
                  <ul className="grow overflow-auto px-5">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title,
                        ),
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          },
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams),
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full gap-4 border-b border-ink/10 py-5"
                          >
                            <div className="relative h-24 w-[77px] flex-none overflow-hidden bg-paper-2">
                              <Image
                                className="h-full w-full object-cover"
                                width={154}
                                height={192}
                                alt={
                                  item.merchandise.product.featuredImage
                                    .altText || item.merchandise.product.title
                                }
                                src={item.merchandise.product.featuredImage.url}
                              />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col">
                              <div className="flex items-start justify-between gap-3">
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="min-w-0 hover:underline"
                                >
                                  <span className="block truncate text-sm font-medium">
                                    {item.merchandise.product.title}
                                  </span>
                                  {item.merchandise.title !== DEFAULT_OPTION ? (
                                    <span className="eyebrow mt-1 block text-muted">
                                      {item.merchandise.title}
                                    </span>
                                  ) : null}
                                </Link>
                                <Price
                                  className="flex-none text-right text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                  currencyCodeClassName="hidden"
                                />
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-3">
                                <div className="flex h-9 flex-row items-center border border-ink/20">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-8 text-center font-mono text-sm">
                                    {item.quantity}
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="flex-none border-t border-ink/10 bg-paper-2/60 px-5 pt-5 pb-6">
                    <dl className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-muted">
                        <dt>Impuestos</dt>
                        <dd>
                          <Price
                            className="text-right"
                            amount={cart.cost.totalTaxAmount.amount}
                            currencyCode={cart.cost.totalTaxAmount.currencyCode}
                            currencyCodeClassName="hidden"
                          />
                        </dd>
                      </div>
                      <div className="flex items-center justify-between text-muted">
                        <dt>Envío</dt>
                        <dd>Se calcula al pagar</dd>
                      </div>
                      <div className="flex items-baseline justify-between border-t border-ink/10 pt-3">
                        <dt className="font-medium">Total</dt>
                        <dd>
                          <Price
                            className="text-right text-lg font-medium"
                            amount={cart.cost.totalAmount.amount}
                            currencyCode={cart.cost.totalAmount.currencyCode}
                            currencyCodeClassName="font-mono text-xs text-muted"
                          />
                        </dd>
                      </div>
                    </dl>
                    <form action={redirectToCheckout} className="mt-5">
                      <CheckoutButton />
                    </form>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center text-ink transition-colors duration-300 hover:bg-ink hover:text-paper">
      <XMarkIcon className={clsx("h-5", className)} strokeWidth={1.5} />
    </div>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex h-14 w-full items-center justify-center bg-ink text-sm font-medium text-paper transition-colors duration-300 hover:bg-ink-2 disabled:opacity-70"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-paper" /> : "Ir a pagar →"}
    </button>
  );
}
