import Link from "next/link";

const arrivals = [
  {
    name: "MacBook Pro",
    description: "Fast laptop for work, study and creative tasks.",
  },
  {
    name: "Wireless Headphones",
    description: "Comfortable listening with a modern wireless design.",
  },
  {
    name: "Smart Watch",
    description: "Track daily activity, health and notifications.",
  },
  {
    name: "Robot Vacuum",
    description: "Smart cleaning solution for a modern home.",
  },
];

export default function NewArrivalsPage() {
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
            New Arrivals
          </p>
          <h1 className="mt-2 text-4xl font-bold">Latest Products</h1>
          <p className="mt-4 max-w-2xl text-black/60">
            Explore the newest items added to the store. Customers can quickly
            discover what is new and trending this week.
          </p>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Recently Added</h2>
            <p className="mt-2 text-black/60">
              Fresh products just added to the marketplace.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {arrivals.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-black/10 bg-[#fafafa] p-5"
              >
                <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                  New
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