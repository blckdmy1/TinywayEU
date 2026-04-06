import Link from "next/link";

const deals = [
  {
    name: "iPhone 15",
    price: "€999",
    oldPrice: "€1099",
    badge: "Hot Price",
    description: "Premium smartphone with strong performance and camera.",
  },
  {
    name: "Coffee Machine",
    price: "€249",
    oldPrice: "€299",
    badge: "Sale",
    description: "Compact home coffee machine for everyday use.",
  },
  {
    name: "PlayStation 5",
    price: "€599",
    oldPrice: "€679",
    badge: "Limited Offer",
    description: "Popular gaming console with smooth performance.",
  },
  {
    name: "Office Chair",
    price: "€189",
    oldPrice: "€239",
    badge: "Best Value",
    description: "Comfortable chair for work and study setup.",
  },
];

export default function DealsPage() {
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
            Deals
          </p>
          <h1 className="mt-2 text-4xl font-bold">Best Deals Today</h1>
          <p className="mt-4 max-w-2xl text-black/60">
            Discover selected offers with better prices on popular products.
            Clear pricing makes it easy for customers to compare and choose.
          </p>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Top Offers</h2>
            <p className="mt-2 text-black/60">
              Selected products with discounted prices for a limited time.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5"
              >
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                  {item.badge}
                </span>

                <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-black/60">{item.description}</p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-bold">{item.price}</span>
                  <span className="text-sm text-black/40 line-through">
                    {item.oldPrice}
                  </span>
                </div>

                <button className="mt-5 w-full rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
                  View Deal
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}