'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '@/lib/i18n';

type CartItem = {
  id: string | number;
  title?: string;
  name?: string;
  price: number;
  image?: string;
  thumbnail?: string;
  quantity?: number;
};

const CART_KEY = 'cart';

export default function CartPage() {
  const { t } = useI18n();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }

    setIsLoaded(true);
  }, []);

  const saveCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    saveCart(updatedCart);
  };

  const removeItem = (id: string | number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity ?? 1;
      return total + item.price * quantity;
    }, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity ?? 1), 0);
  }, [cartItems]);

  if (!isLoaded) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 bg-background text-foreground min-h-screen">
        <h1 className="mb-6 text-3xl font-bold">{t("cartTitle")}</h1>
        <p className="text-muted-foreground">{t("loadingCart")}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 bg-background text-foreground min-h-screen">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">{t("cartTitle")}</h1>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="w-fit rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/20"
          >
            {t("clearCart")}
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">{t("emptyCart")}</h2>
          <p className="mb-6 text-muted-foreground">
            {t("noProductsYet")}
          </p>

          <Link
            href="/"
            className="inline-block rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            {t("continueShopping")}
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {cartItems.map((item) => {
              const quantity = item.quantity ?? 1;
              const title = item.title || item.name || 'Product';
              const imageSrc = item.image || item.thumbnail || '/placeholder.png';

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative h-28 w-full overflow-hidden rounded-xl bg-muted sm:w-28">
                      <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${item.id}`}
                          className="text-lg font-semibold hover:text-primary"
                        >
                          {title}
                        </Link>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {t("price")}: €{item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            className="h-9 w-9 rounded-lg border border-border text-lg hover:bg-muted"
                          >
                            -
                          </button>

                          <span className="min-w-[40px] text-center font-medium">
                            {quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            className="h-9 w-9 rounded-lg border border-border text-lg hover:bg-muted"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <p className="font-semibold">
                            €{(item.price * quantity).toFixed(2)}
                          </p>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm font-medium text-destructive hover:underline"
                          >
                            {t("remove")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">{t("orderSummary")}</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("items")}</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("subtotal")}</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("delivery")}</span>
                <span>{t("free")}</span>
              </div>
            </div>

            <div className="my-5 border-t border-border" />

            <div className="mb-6 flex items-center justify-between text-lg font-bold">
              <span>{t("total")}</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90">
              {t("checkout")}
            </button>

            <Link
              href="/"
              className="mt-3 block text-center text-sm text-primary hover:underline"
            >
              {t("continueShopping")}
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
