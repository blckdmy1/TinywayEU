"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: string;
  shortInfo?: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
};

type Category = {
  name: string;
  image: string;
  slug: string;
};

type LoggedUser = {
  email: string;
  isLoggedIn: boolean;
};

export default function HomePage() {
  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 15",
      price: 999,
      badge: "Best Seller",
      shortInfo: "Powerful smartphone for everyday use",
      image:
        "https://images.unsplash.com/photo-1695048133142-1a20484c1f7b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "MacBook Pro",
      price: 2200,
      badge: "New",
      shortInfo: "Fast laptop for work and study",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Samsung OLED TV",
      price: 1400,
      badge: "Hot Price",
      shortInfo: "Sharp picture and premium sound",
      image:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: 'PlayStation 5',
      price: 599,
      badge: "Popular",
      shortInfo: "Gaming console for entertainment",
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Coffee Machine",
      price: 249,
      badge: "Sale",
      shortInfo: "Perfect for home coffee lovers",
      image:
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Office Chair",
      price: 189,
      badge: "Top Rated",
      shortInfo: "Comfortable chair for work setup",
      image:
        "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const categories: Category[] = [
    {
      name: "Phones",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
      slug: "phones",
    },
    {
      name: "Computers",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
      slug: "computers",
    },
    {
      name: "TV & Audio",
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop",
      slug: "tv-audio",
    },
    {
      name: "Gaming",
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop",
      slug: "gaming",
    },
    {
      name: "Home Appliances",
      image:
        "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?q=80&w=1200&auto=format&fit=crop",
      slug: "home-appliances",
    },
    {
      name: "Furniture",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      slug: "furniture",
    },
    {
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      slug: "beauty",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
      slug: "sports",
    },
    {
      name: "Garden",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop",
      slug: "garden",
    },
    {
      name: "Cameras",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
      slug: "cameras",
    },
    {
      name: "Kids",
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1200&auto=format&fit=crop",
      slug: "kids",
    },
    {
      name: "Perfume",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop",
      slug: "perfume",
    },
  ];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<LoggedUser | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser: LoggedUser = JSON.parse(savedUser);
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const updatedCart = [
      ...cart,
      { id: product.id, name: product.name, price: product.price },
    ];
    setCart(updatedCart);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-black/60 md:px-6">
          <div className="flex gap-4">
            <Link href="/delivery" className="hover:text-black">
              Delivery
            </Link>
            <Link href="/payment" className="hover:text-black">
              Payment
            </Link>
            <Link href="/contacts" className="hover:text-black">
              Customer Support
            </Link>
            <Link href="/returns" className="hover:text-black">
              Returns
            </Link>
          </div>

          <div className="flex gap-4">
            <span>LV</span>
            <span>RU</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <Link href="/" className="shrink-0">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  TinyWay.eu
                </h1>
              </Link>

              <div className="flex w-full max-w-3xl items-center overflow-hidden rounded-full border border-black/15 bg-[#f7f7f7]">
                <button className="border-r border-black/10 px-5 py-3 text-sm font-medium">
                  All Categories
                </button>

                <input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                />

                <button className="bg-black px-6 py-3 text-sm font-medium text-white">
                  Search
                </button>
              </div>

              <div className="flex items-center gap-3">
                {user ? (
                  <Link
                    href="/cabinet"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black transition hover:bg-black hover:text-white"
                    title={user.email}
                  >
                    👤
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-full border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
                  >
                    Login
                  </Link>
                )}

                <Link
                  href="/cart"
                  className="relative rounded-full bg-black px-5 py-2 text-sm font-medium text-white"
                >
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <nav className="flex flex-wrap gap-3 text-sm font-medium text-black/70">
  <Link href="/" className="hover:text-black">
    Home
  </Link>
  <Link href="/categories" className="hover:text-black">
    Categories
  </Link>
  <Link href="/deals" className="hover:text-black">
    Deals
  </Link>
  <Link href="/new-arrivals" className="hover:text-black">
    New Arrivals
  </Link>
  <Link href="/best-sellers" className="hover:text-black">
    Best Sellers
  </Link>
  <Link href="/contact-us" className="hover:text-black">
    Contact Us
  </Link>
  <Link href="/my-account" className="hover:text-black">
    My Account
  </Link>
</nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <section className="mb-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-2xl border border-black/10 bg-white p-4">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
              Categories
            </h2>

            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="block rounded-xl px-3 py-3 text-sm transition hover:bg-[#f3f3f3]"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <div className="relative overflow-hidden rounded-2xl bg-[#e9ecef]">
                <img
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1600&auto=format&fit=crop"
                  alt="Hero"
                  className="h-full min-h-[320px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/70">
                    Marketplace
                  </p>
                  <h2 className="max-w-2xl text-3xl font-bold md:text-5xl">
                    Everything you need in one place
                  </h2>
                  <p className="mt-3 max-w-xl text-white/85">
                    Shop electronics, home goods, beauty, sports, furniture and
                    more at great prices.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="#products"
                      className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href="#deals"
                      className="rounded-full border border-white/40 px-5 py-3 text-sm font-medium text-white"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-2xl bg-black p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Best Deals Today
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">
                    Top offers selected for you
                  </h3>
                  <p className="mt-3 text-white/70">
                    Save more on popular products this week.
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                    Shop by Need
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#f3f3f3] px-4 py-2 text-sm">
                      For Work
                    </span>
                    <span className="rounded-full bg-[#f3f3f3] px-4 py-2 text-sm">
                      For Home
                    </span>
                    <span className="rounded-full bg-[#f3f3f3] px-4 py-2 text-sm">
                      For Gaming
                    </span>
                    <span className="rounded-full bg-[#f3f3f3] px-4 py-2 text-sm">
                      For Travel
                    </span>
                    <span className="rounded-full bg-[#f3f3f3] px-4 py-2 text-sm">
                      For Fitness
                    </span>
                    <span className="rounded-full bg-[#f3f3f3] px-4 py-2 text-sm">
                      For Kids
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <section
              id="categories"
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                    Popular Categories
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    Find the products you need faster
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group overflow-hidden rounded-2xl border border-black/10 bg-[#fafafa]"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className="text-sm font-semibold">{category.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section
          id="deals"
          className="mb-8 rounded-2xl border border-black/10 bg-white p-6"
        >
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">
              Best Deals Today
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Top offers selected for you
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-black/10 bg-white p-4"
              >
                <div className="mb-3 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                  {product.badge || "Sale"}
                </div>

                <Link href={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-xl bg-[#f5f5f5]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[220px] w-full object-cover"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="mt-2 text-sm text-black/60">
                      {product.shortInfo}
                    </p>
                    <p className="mt-3 text-2xl font-bold">€{product.price}</p>
                  </div>
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          id="new-arrivals"
          className="mb-8 rounded-2xl border border-black/10 bg-white p-6"
        >
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">
              New Arrivals
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Latest products added to the store
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(1, 4).map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-black/10 bg-white p-4"
              >
                <div className="mb-3 inline-flex rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                  New
                </div>

                <Link href={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-xl bg-[#f5f5f5]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[220px] w-full object-cover"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="mt-2 text-sm text-black/60">
                      {product.shortInfo}
                    </p>
                    <p className="mt-3 text-2xl font-bold">€{product.price}</p>
                  </div>
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  View Product
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          id="best-sellers"
          className="mb-8 rounded-2xl border border-black/10 bg-white p-6"
        >
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">
              Best Sellers
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Most popular products this week
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl border border-black/10 bg-white p-4 transition hover:shadow-lg"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-xl bg-[#f5f5f5]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[260px] w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="pt-4">
                    <div className="mb-2 inline-flex rounded-full bg-[#f3f3f3] px-3 py-1 text-xs font-medium text-black/70">
                      {product.badge || "Popular"}
                    </div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="mt-2 text-sm text-black/60">
                      {product.shortInfo}
                    </p>
                    <p className="mt-3 text-2xl font-bold">€{product.price}</p>
                  </div>
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                Need Help Choosing?
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Browse by category, compare products, and find the right item
                faster.
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="#categories"
                  className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white"
                >
                  View All Categories
                </Link>
                <Link
                  href="/contacts"
                  className="rounded-full border border-black px-5 py-3 text-sm font-medium"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-[#f7f7f7] p-6">
              <h3 className="text-lg font-semibold">Useful Links</h3>
              <div className="mt-4 grid gap-3 text-sm text-black/70">
                <Link href="/delivery" className="hover:text-black">
                  Delivery Information
                </Link>
                <Link href="/payment" className="hover:text-black">
                  Payment Methods
                </Link>
                <Link href="/returns" className="hover:text-black">
                  Returns & Refunds
                </Link>
                <Link href="/contacts" className="hover:text-black">
                  Customer Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}