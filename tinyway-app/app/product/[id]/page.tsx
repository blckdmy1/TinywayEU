"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  shortInfo: string;
  description: string;
  category: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    price: 999,
    shortInfo: "Powerful smartphone for everyday use",
    description:
      "Modern smartphone with strong performance, excellent camera quality, and clean design for daily use.",
    category: "phones",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484c1f7b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 2200,
    shortInfo: "Fast laptop for work and study",
    description:
      "High-performance laptop with premium build quality, ideal for office work, study, and creative tasks.",
    category: "computers",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Samsung OLED TV",
    price: 1400,
    shortInfo: "Sharp picture and premium sound",
    description:
      "Large OLED television with bright colors, deep contrast, and immersive sound for movies and gaming.",
    category: "tv-audio",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "PlayStation 5",
    price: 599,
    shortInfo: "Gaming console for entertainment",
    description:
      "Next-generation console for smooth gaming, fast loading, and a strong entertainment experience.",
    category: "gaming",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Coffee Machine",
    price: 249,
    shortInfo: "Perfect for home coffee lovers",
    description:
      "Compact coffee machine designed for quick and easy drinks at home with a modern kitchen look.",
    category: "home-appliances",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Office Chair",
    price: 189,
    shortInfo: "Comfortable chair for work setup",
    description:
      "Ergonomic office chair with soft support and modern style, ideal for home or office desk setup.",
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((item) => item.id === Number(params.id));
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] px-4 py-8 text-black md:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">Product not found</h1>
          <Link href="/" className="mt-4 inline-block underline">
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }

  const addToCart = () => {
    const updatedCart = [
      ...cart,
      { id: product.id, name: product.name, price: product.price },
    ];
    setCart(updatedCart);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium hover:underline">
            ← Back to homepage
          </Link>

          <Link
            href="/cart"
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white"
          >
            Cart ({cart.length})
          </Link>
        </div>

        <section className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl bg-[#f5f5f5]">
              <img
                src={product.image}
                alt={product.name}
                className="h-[420px] w-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                Product
              </p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 text-sm text-black/60">{product.shortInfo}</p>

              <p className="mt-6 text-3xl font-bold">€{product.price}</p>

              <div className="mt-6 rounded-2xl bg-[#f7f7f7] p-4">
                <p className="text-sm leading-7 text-black/70">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={addToCart}
                  className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Add to Cart
                </button>

                <Link
                  href={`/category/${product.category}`}
                  className="rounded-full border border-black px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
                >
                  View Category
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}