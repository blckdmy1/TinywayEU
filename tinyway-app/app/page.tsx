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
    <main className="min-h-screen bg-background text-foreground">
      {/* Main Header - Warm Theme */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-md">
        {/* Top Row: Logo, Search, Account, Cart */}
        <div className="mx-auto max-w-[1500px] px-4">
          <div className="flex items-center gap-3 py-3 md:gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0 py-1 px-2 rounded-lg hover:bg-primary-foreground/10 transition">
              <span className="text-2xl font-bold tracking-tight font-serif">TinyWay</span>
              <span className="text-sm text-primary-foreground/80 font-medium">.eu</span>
            </Link>

            {/* Deliver To */}
            <Link href="/delivery" className="hidden md:flex flex-col px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition">
              <span className="text-xs text-primary-foreground/70">Deliver to</span>
              <span className="text-sm font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Europe
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex flex-1 max-w-3xl">
              <select className="hidden md:block bg-muted text-foreground text-xs px-3 py-2.5 rounded-l-xl border-r border-border outline-none cursor-pointer">
                <option>All Categories</option>
                {categories.slice(0, 8).map((cat) => (
                  <option key={cat.slug}>{cat.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full px-4 py-2.5 text-sm text-foreground bg-card outline-none md:rounded-none rounded-l-xl placeholder:text-muted-foreground"
              />
              <button className="bg-primary-foreground hover:bg-primary-foreground/90 px-4 py-2.5 rounded-r-xl transition">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Account */}
            <Link
              href={user ? "/cabinet" : "/login"}
              className="hidden sm:flex flex-col px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition"
            >
              <span className="text-xs text-primary-foreground/70">
                {user ? `Hello, ${user.email.split("@")[0]}` : "Hello, sign in"}
              </span>
              <span className="text-sm font-semibold flex items-center gap-1">
                Account
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </Link>

            {/* Orders */}
            <Link
              href="/cabinet"
              className="hidden lg:flex flex-col px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition"
            >
              <span className="text-xs text-primary-foreground/70">Returns</span>
              <span className="text-sm font-semibold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition"
            >
              <div className="relative">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-[11px] font-bold text-primary">
                  {cart.length}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-semibold">Cart</span>
            </Link>
          </div>
        </div>

        {/* Bottom Row: Navigation */}
        <div className="bg-primary/80 border-t border-primary-foreground/10">
          <div className="mx-auto max-w-[1500px] px-4">
            <nav className="flex items-center gap-1 overflow-x-auto py-2 text-sm">
              <button className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 font-semibold rounded-lg hover:bg-primary-foreground/10 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All Categories
              </button>
              <Link href="/deals" className="whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition">
                Today&apos;s Deals
              </Link>
              <Link href="/best-sellers" className="whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition">
                Best Sellers
              </Link>
              <Link href="/new-arrivals" className="whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition">
                New Arrivals
              </Link>
              <Link href="/category/phones" className="whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition">
                Phones
              </Link>
              <Link href="/category/computers" className="whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition">
                Computers
              </Link>
              <Link href="/category/tv-audio" className="hidden md:block whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition">
                TV & Audio
              </Link>
              <Link href="/category/gaming" className="hidden md:block whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition">
                Gaming
              </Link>
              <Link href="/contact-us" className="hidden lg:block whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition">
                Help & Support
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <section className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Shop by Category
            </h2>

            <div className="space-y-1.5">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-foreground/80 transition hover:bg-muted hover:text-foreground"
                >
                  <span>{category.name}</span>
                  <span className="text-muted-foreground/50">›</span>
                </Link>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="relative overflow-hidden rounded-3xl bg-muted shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1600&auto=format&fit=crop"
                  alt="Featured shopping banner"
                  className="h-full min-h-[380px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2d2a26]/80 via-[#2d2a26]/40 to-transparent" />
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
                      className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
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
<div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
                    This week&apos;s top picks
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-snug">
                    Hand-picked deals customers love
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
                    Save on popular products across electronics, home and
                    lifestyle.
                  </p>
                  <Link
                    href="#deals"
                    className="mt-5 inline-flex rounded-xl bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                  >
                    View Deals
                  </Link>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Why customers choose us
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-foreground/80">
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      Clear prices with no confusion
                    </div>
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      Easy category browsing
                    </div>
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      Fast and secure checkout
                    </div>
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      Helpful customer support
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="categories-section"
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Popular Categories
                  </p>
                  <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                    Find what you need faster
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                    Start with the most popular sections to quickly reach the
                    products you are looking for.
                  </p>
                </div>

                <Link
                  href="/categories"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View all categories
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-foreground">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
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
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">
              Fast delivery
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Quick dispatch and reliable shipping updates.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">
              Secure payment
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Safe checkout with trusted payment methods.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">
              Easy returns
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Clear return policy and helpful support when needed.
            </p>
          </div>
        </section>

        <section
          id="deals"
          className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Best Deals Today
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Save on selected favorites
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Great prices on products customers check most often.
              </p>
            </div>

            <Link
              href="/deals"
              className="text-sm font-semibold text-primary hover:underline"
            >
              See all deals
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-border bg-card p-4 transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {product.badge || "Sale"}
                </div>

                <Link href={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[220px] w-full object-cover"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {product.shortInfo}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-foreground">
                      €{product.price}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          id="new-arrivals"
          className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                New Arrivals
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Latest products in store
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Fresh additions for work, home and entertainment.
              </p>
            </div>

            <Link
              href="/new-arrivals"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all new arrivals
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(1, 4).map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-border bg-card p-4 transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  New
                </div>

                <Link href={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[220px] w-full object-cover"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {product.shortInfo}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-foreground">
                      €{product.price}
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-4 block w-full rounded-xl border border-border px-5 py-3 text-center text-sm font-semibold text-foreground transition hover:border-primary"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section
          id="best-sellers"
          className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Best Sellers
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Most popular products this week
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Trusted picks customers return to again and again.
              </p>
            </div>

            <Link
              href="/best-sellers"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Browse all best sellers
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[260px] w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="pt-4">
                    <div className="mb-2 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {product.badge || "Popular"}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {product.shortInfo}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-foreground">
                      €{product.price}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Need help choosing?
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Browse by category, compare products, and find the right item
                faster
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                We designed the store to be simple and readable, so customers
                can find products quickly and shop with confidence.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/categories"
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  View All Categories
                </Link>
                <Link
                  href="/contact-us"
                  className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-muted p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Useful Links
              </h3>
              <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                <Link href="/delivery" className="hover:text-foreground">
                  Delivery Information
                </Link>
                <Link href="/payment" className="hover:text-foreground">
                  Payment Methods
                </Link>
                <Link href="/returns" className="hover:text-foreground">
                  Returns & Refunds
                </Link>
                <Link href="/contact-us" className="hover:text-foreground">
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
