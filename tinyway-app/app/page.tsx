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
      name: "PlayStation 5",
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
    <main className="min-h-screen bg-[#f7f7f8] text-slate-900">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <span>Fast delivery across Europe</span>
            <span className="hidden md:inline">•</span>
            <span>Secure payments</span>
            <span className="hidden md:inline">•</span>
            <span>Simple returns</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/delivery" className="hover:text-slate-900">
              Delivery
            </Link>
            <Link href="/payment" className="hover:text-slate-900">
              Payment
            </Link>
            <Link href="/returns" className="hover:text-slate-900">
              Returns
            </Link>
            <Link href="/contact-us" className="hover:text-slate-900">
              Support
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <Link href="/" className="shrink-0">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  TinyWay.eu
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Easy shopping for everyday essentials
                </p>
              </Link>

              <div className="flex w-full max-w-3xl items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <button className="hidden border-r border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 md:block">
                  All Categories
                </button>

                <input
                  type="text"
                  placeholder="Search for products, brands or categories"
                  className="w-full bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-slate-400"
                />

                <button className="bg-slate-900 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-slate-800">
                  Search
                </button>
              </div>

              <div className="flex items-center gap-3">
                {user ? (
                  <Link
                    href="/cabinet"
                    className="flex h-11 min-w-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium transition hover:border-slate-900 hover:text-slate-900"
                    title={user.email}
                  >
                    Account
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:border-slate-900 hover:text-slate-900"
                  >
                    Login
                  </Link>
                )}

                <Link
                  href="/cart"
                  className="relative rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
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

            <nav className="flex flex-wrap gap-5 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <Link href="/categories" className="hover:text-slate-900">
                Categories
              </Link>
              <Link href="/deals" className="hover:text-slate-900">
                Deals
              </Link>
              <Link href="/new-arrivals" className="hover:text-slate-900">
                New Arrivals
              </Link>
              <Link href="/best-sellers" className="hover:text-slate-900">
                Best Sellers
              </Link>
              <Link href="/contact-us" className="hover:text-slate-900">
                Contact Us
              </Link>
              <Link href="/my-account" className="hover:text-slate-900">
                My Account
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <section className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Shop by Category
            </h2>

            <div className="space-y-1.5">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <span>{category.name}</span>
                  <span className="text-slate-300">›</span>
                </Link>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="relative overflow-hidden rounded-3xl bg-slate-200 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1600&auto=format&fit=crop"
                  alt="Featured shopping banner"
                  className="h-full min-h-[380px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white md:p-10">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/70">
                    Smart shopping, made simple
                  </p>
                  <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                    Everything your home, work and lifestyle need in one place
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 md:text-base">
                    Discover trusted products, clear prices and popular
                    categories without the clutter.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="#best-sellers"
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Shop Best Sellers
                    </Link>
                    <Link
                      href="#categories-section"
                      className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Browse Categories
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    This week’s top picks
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-snug">
                    Hand-picked deals customers love
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/75">
                    Save on popular products across electronics, home and
                    lifestyle.
                  </p>
                  <Link
                    href="#deals"
                    className="mt-5 inline-flex rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    View Deals
                  </Link>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Why customers choose us
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-slate-700">
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      Clear prices with no confusion
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      Easy category browsing
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      Fast and secure checkout
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      Helpful customer support
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="categories-section"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Popular Categories
                  </p>
                  <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                    Find what you need faster
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                    Start with the most popular sections to quickly reach the
                    products you are looking for.
                  </p>
                </div>

                <Link
                  href="/categories"
                  className="text-sm font-semibold text-slate-900 hover:underline"
                >
                  View all categories
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-slate-900">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Explore products in this category
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Fast delivery
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Quick dispatch and reliable shipping updates.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Secure payment
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Safe checkout with trusted payment methods.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Easy returns
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Clear return policy and helpful support when needed.
            </p>
          </div>
        </section>

        <section
          id="deals"
          className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Best Deals Today
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Save on selected favorites
              </h2>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Great prices on products customers check most often.
              </p>
            </div>

            <Link
              href="/deals"
              className="text-sm font-semibold text-slate-900 hover:underline"
            >
              See all deals
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  {product.badge || "Sale"}
                </div>

                <Link href={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[220px] w-full object-cover"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {product.shortInfo}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-slate-900">
                      €{product.price}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          id="new-arrivals"
          className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                New Arrivals
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Latest products in store
              </h2>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Fresh additions for work, home and entertainment.
              </p>
            </div>

            <Link
              href="/new-arrivals"
              className="text-sm font-semibold text-slate-900 hover:underline"
            >
              View all new arrivals
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(1, 4).map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  New
                </div>

                <Link href={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[220px] w-full object-cover"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {product.shortInfo}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-slate-900">
                      €{product.price}
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-4 block w-full rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-slate-900"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section
          id="best-sellers"
          className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Best Sellers
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Most popular products this week
              </h2>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Trusted picks customers return to again and again.
              </p>
            </div>

            <Link
              href="/best-sellers"
              className="text-sm font-semibold text-slate-900 hover:underline"
            >
              Browse all best sellers
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[260px] w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="pt-4">
                    <div className="mb-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {product.badge || "Popular"}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {product.shortInfo}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-slate-900">
                      €{product.price}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Need help choosing?
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Browse by category, compare products, and find the right item
                faster
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 md:text-base">
                We designed the store to be simple and readable, so customers
                can find products quickly and shop with confidence.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/categories"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  View All Categories
                </Link>
                <Link
                  href="/contact-us"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Useful Links
              </h3>
              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <Link href="/delivery" className="hover:text-slate-900">
                  Delivery Information
                </Link>
                <Link href="/payment" className="hover:text-slate-900">
                  Payment Methods
                </Link>
                <Link href="/returns" className="hover:text-slate-900">
                  Returns & Refunds
                </Link>
                <Link href="/contact-us" className="hover:text-slate-900">
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