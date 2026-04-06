import Link from "next/link";

const bestSellers = [
  {
    name: "iPhone 15",
    description: "One of the most popular smartphones this week.",
  },
  {
    name: "MacBook Pro",
    description: "Strong performance and premium build for daily work.",
  },
  {
    name: "Samsung OLED TV",
    description: "A customer favorite for picture quality and design.",
  },
  {
    name: "PlayStation 5",
    description: "A very popular choice for gaming and entertainment.",
  },
];

export default function BestSellersPage() {
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
            Best Sellers
          </p>
          <h1 className="mt-2 text-4xl font-bold">Most Popular Products</h1>
          <p className="mt-4 max-w-2xl text-black/60">
            The products customers choose most often. This page helps shoppers
            quickly see trusted and popular items.
          </p>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Customer Favorites</h2>
            <p className="mt-2 text-black/60">
              Most popular products this week.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {bestSellers.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5"
              >
                <span className="rounded-full bg-[#f3f3f3] px-3 py-1 text-xs font-medium">
                  Best Seller
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-black/60">
                  {item.description}
                </p>
                <button className="mt-5 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
                  View Product
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}