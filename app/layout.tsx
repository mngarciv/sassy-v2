import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Archivo } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

/* Display condensada: Archivo variable con eje de ancho (wdth 62–125). */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME || "SASSY."} — Zapatillas originales`,
    template: `%s | ${SITE_NAME || "SASSY."}`,
  },
  description:
    "Zapatillas originales y streetwear. Compra y venta con envíos a todo Chile y el mundo.",
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html
      lang="es-CL"
      className={`${GeistSans.variable} ${GeistMono.variable} ${archivo.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased selection:bg-ink selection:text-paper">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                classNames: {
                  toast: "!rounded-none !border-ink !bg-ink !text-paper",
                },
              }}
            />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
