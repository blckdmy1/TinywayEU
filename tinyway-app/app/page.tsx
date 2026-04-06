"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n, languages, Language } from "@/lib/i18n";

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
  const { t, language, setLanguage } = useI18n();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
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
      {/* Modern Glass Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-card/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Main Row */}
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-baseline gap-0.5 group">
              <span className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition">TinyWay</span>
              <span className="text-sm font-medium text-primary">.eu</span>
            </Link>

            {/* Search Bar - Centered */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="w-full h-11 pl-12 pr-4 text-sm bg-muted/50 border border-border rounded-full outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 h-10 px-3 rounded-full hover:bg-muted transition"
                >
                  <span className="text-base">{languages.find(l => l.code === language)?.flag}</span>
                  <span className="hidden sm:block text-sm font-medium text-foreground">{language.toUpperCase()}</span>
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {langMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-2xl shadow-xl py-2 min-w-[180px] z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as Language);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-muted transition flex items-center gap-3 ${
                          language === lang.code ? "bg-muted font-medium" : ""
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-foreground">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Account */}
              <Link
                href={user ? "/cabinet" : "/login"}
                className="hidden sm:flex items-center gap-2 h-10 px-3 rounded-full hover:bg-muted transition"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs text-muted-foreground leading-none">
                    {user ? t("hello") : t("helloSignIn")}
                  </p>
                  <p className="text-sm font-medium text-foreground leading-tight">
                    {user ? user.email.split("@")[0] : t("account")}
                  </p>
                </div>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-center gap-2 h-10 px-3 rounded-full hover:bg-muted transition"
              >
                <div className="relative">
                  <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {cart.length}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block text-sm font-medium text-foreground">{t("cart")}</span>
              </Link>
            </div>
          </div>

          {/* Navigation Row */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-3 -mx-1">
            <Link href="/deals" className="whitespace-nowrap px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition">
              {t("todaysDeals")}
            </Link>
            <Link href="/best-sellers" className="whitespace-nowrap px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition">
              {t("bestSellers")}
            </Link>
            <Link href="/new-arrivals" className="whitespace-nowrap px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition">
              {t("newArrivals")}
            </Link>
            <span className="w-px h-5 bg-border mx-2" />
            <Link href="/category/phones" className="whitespace-nowrap px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition">
              {t("phones")}
            </Link>
            <Link href="/category/computers" className="whitespace-nowrap px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition">
              {t("computers")}
            </Link>
            <Link href="/category/tv-audio" className="hidden md:block whitespace-nowrap px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition">
              {t("tvAudio")}
            </Link>
            <Link href="/category/gaming" className="hidden md:block whitespace-nowrap px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition">
              {t("gaming")}
            </Link>
            <Link href="/contact-us" className="hidden lg:block whitespace-nowrap px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition">
              {t("helpSupport")}
            </Link>
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full h-10 pl-10 pr-4 text-sm bg-muted/50 border border-border rounded-full outline-none focus:border-primary transition placeholder:text-muted-foreground"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <section className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("shopByCategory")}
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
                    {t("thisWeeksTopPicks")}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-snug">
                    {t("handPickedDeals")}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
                    {t("saveOnPopularProducts")}
                  </p>
                  <Link
                    href="#deals"
                    className="mt-5 inline-flex rounded-xl bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                  >
                    {t("viewDeals")}
                  </Link>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t("whyCustomersChooseUs")}
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-foreground/80">
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      {t("clearPrices")}
                    </div>
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      {t("easyBrowsing")}
                    </div>
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      {t("fastCheckout")}
                    </div>
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      {t("helpfulSupport")}
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
                    {t("popularCategories")}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                    {t("findWhatYouNeed")}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                    {t("startWithPopular")}
                  </p>
                </div>

                <Link
                  href="/categories"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {t("viewAllCategories")}
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
                        {t("exploreProducts")}
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
              {t("fastDelivery")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("fastDeliveryDesc")}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">
              {t("securePayment")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("securePaymentDesc")}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">
              {t("easyReturns")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("easyReturnsDesc")}
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
                {t("bestDealsToday")}
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                {t("saveOnFavorites")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                {t("greatPrices")}
              </p>
            </div>

            <Link
              href="/deals"
              className="text-sm font-semibold text-primary hover:underline"
            >
              {t("seeAllDeals")}
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-border bg-card p-4 transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {product.badge || t("sale")}
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
                  {t("addToCart")}
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
                {t("newArrivals")}
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                {t("latestProducts")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                {t("freshAdditions")}
              </p>
            </div>

            <Link
              href="/new-arrivals"
              className="text-sm font-semibold text-primary hover:underline"
            >
              {t("viewAllNewArrivals")}
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(1, 4).map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-border bg-card p-4 transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {t("new")}
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
                  {t("viewProduct")}
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
                {t("bestSellers")}
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                {t("mostPopularWeek")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                {t("trustedPicks")}
              </p>
            </div>

            <Link
              href="/best-sellers"
              className="text-sm font-semibold text-primary hover:underline"
            >
              {t("browseAllBestSellers")}
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
                      {product.badge || t("popular")}
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
                  {t("addToCart")}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("needHelpChoosing")}
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                {t("browseByCategory")}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                {t("simpleReadable")}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/categories"
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  {t("viewAllCategories")}
                </Link>
                <Link
                  href="/contact-us"
                  className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary"
                >
                  {t("contactSupport")}
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-muted p-6">
              <h3 className="text-lg font-semibold text-foreground">
                {t("usefulLinks")}
              </h3>
              <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                <Link href="/delivery" className="hover:text-foreground">
                  {t("deliveryInfo")}
                </Link>
                <Link href="/payment" className="hover:text-foreground">
                  {t("paymentMethods")}
                </Link>
                <Link href="/returns" className="hover:text-foreground">
                  {t("returnsRefunds")}
                </Link>
                <Link href="/contact-us" className="hover:text-foreground">
                  {t("customerSupport")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
