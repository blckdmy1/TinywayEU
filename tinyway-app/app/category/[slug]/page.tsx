"use client";

import Link from "next/link";

type Category = {
  name: string;
  image: string;
  slug: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  shortInfo: string;
  category: string;
};

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
];

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    price: 999,
    shortInfo: "Powerful smartphone for everyday use",
    category: "phones",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484c1f7b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 2200,
    shortInfo: "Fast laptop for work and study",
    category: "computers",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Samsung OLED TV",
    price: 1400,
    shortInfo: "Sharp picture and premium sound",
    category: "tv-audio",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "PlayStation 5",
    price: 599,
    shortInfo: "Gaming console for entertainment",
    category: "gaming",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Coffee Machine",
    price: 249,
    shortInfo: "Perfect for home coffee lovers",
    category: "home-appliances",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Office Chair",
    price: 189,
    shortInfo: "Comfortable chair for work setup",
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categories.find((item) => item.slug === params.slug);
  const categoryProducts = products.filter(
    (product) => product.category === params.slug
  );

  if (!category) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] px-4 py-8 text-black md:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">Category not found</h1>
          <Link href="/" className="mt-4 inline-block underline">
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }

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
            Cart
          </Link>
        </div>

        <section className="mb-8 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="grid gap-0 md:grid-cols-2">
            <img
              src={category.image}
              alt={category.name}
              className="h-[260px] w-full object-cover md:h-full"
            />

            <div className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                Category
              </p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                {category.name}
              </h1>
              <p className="mt-4 max-w-xl text-black/60">
                Browse products in {category.name}. Clear layout, simple cards,
                and easy product selection.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                Products
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {categoryProducts.length} items
              </h2>
            </div>
          </div>

          {categoryProducts.length === 0 ? (
            <p className="text-black/60">No products in this category yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-black/10 bg-white p-4 transition hover:shadow-lg"
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="overflow-hidden rounded-xl bg-[#f5f5f5]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-[240px] w-full object-cover"
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

                  <Link
                    href={`/product/${product.id}`}
                    className="mt-4 block w-full rounded-full bg-black px-5 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
                  >
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}