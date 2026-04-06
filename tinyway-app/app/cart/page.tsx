'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

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
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold">Cart</h1>
        <p className="text-gray-600">Loading cart...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Cart</h1>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="w-fit rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Clear cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-gray-600">
            Looks like you have not added any products yet.
          </p>

          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Continue shopping
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
                  className="rounded-2xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative h-28 w-full overflow-hidden rounded-xl bg-gray-100 sm:w-28">
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
                          className="text-lg font-semibold hover:text-blue-600"
                        >
                          {title}
                        </Link>

                        <p className="mt-2 text-sm text-gray-500">
                          Price: €{item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            className="h-9 w-9 rounded-lg border text-lg hover:bg-gray-50"
                          >
                            -
                          </button>

                          <span className="min-w-[40px] text-center font-medium">
                            {quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            className="h-9 w-9 rounded-lg border text-lg hover:bg-gray-50"
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
                            className="text-sm font-medium text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Order summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>Free</span>
              </div>
            </div>

            <div className="my-5 border-t" />

            <div className="mb-6 flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700">
              Checkout
            </button>

            <Link
              href="/"
              className="mt-3 block text-center text-sm text-blue-600 hover:underline"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}