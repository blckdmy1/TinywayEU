import Link from "next/link";

const categories = [
  {
    name: "Phones",
    description: "Smartphones, accessories, chargers, cases and more.",
    slug: "phones",
  },
  {
    name: "Computers",
    description: "Laptops, desktops, monitors and office equipment.",
    slug: "computers",
  },
  {
    name: "TV & Audio",
    description: "Televisions, speakers, headphones and sound systems.",
    slug: "tv-audio",
  },
  {
    name: "Gaming",
    description: "Consoles, games, accessories and gaming gear.",
    slug: "gaming",
  },
  {
    name: "Home Appliances",
    description: "Kitchen, cleaning and everyday home electronics.",
    slug: "home-appliances",
  },
  {
    name: "Furniture",
    description: "Tables, chairs, storage and interior essentials.",
    slug: "furniture",
  },
  {
    name: "Beauty",
    description: "Beauty tools, skincare devices and essentials.",
    slug: "beauty",
  },
  {
    name: "Sports",
    description: "Fitness, outdoor equipment and sports accessories.",
    slug: "sports",
  },
  {
    name: "Garden",
    description: "Garden tools, furniture and outdoor products.",
    slug: "garden",
  },
  {
    name: "Cameras",
    description: "Cameras, lenses, tripods and photo accessories.",
    slug: "cameras",
  },
  {
    name: "Kids",
    description: "Products for children, play and daily comfort.",
    slug: "kids",
  },
  {
    name: "Perfume",
    description: "Perfumes, cosmetics and personal care products.",
    slug: "perfume",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium hover:underline">
            ← Back to Home
          </Link>

          <Link
            href="/cart"
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white"
          >
            Cart
          </Link>
        </div>

        <section className="mb-8 rounded-2xl border border-black/10 bg-white p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Categories
          </p>
          <h1 className="mt-2 text-4xl font-bold">All Categories</h1>
          <p className="mt-4 max-w-2xl text-black/60">
            Browse all marketplace categories and quickly go to the products
            you need. The layout is simple, clear and easy for customers to use.
          </p>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <p className="mt-2 text-black/60">
              Choose a department to explore products faster.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5 transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm text-black/60">
                  {category.description}
                </p>
                <p className="mt-4 text-sm font-medium text-black">
                  Open category →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}