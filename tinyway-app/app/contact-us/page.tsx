import Link from "next/link";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
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
            Contact Us
          </p>
          <h1 className="mt-2 text-4xl font-bold">Customer Support</h1>
          <p className="mt-4 max-w-2xl text-black/60">
            Need help with an order, delivery, payment or product choice? Our
            support team is here to help.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="mt-5 space-y-4 text-black/70">
              <p>Email: support@tinyway.eu</p>
              <p>Phone: +371 00000000</p>
              <p>Working hours: Mon–Fri, 9:00–18:00</p>
              <p>Address: Riga, Latvia</p>
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="text-2xl font-bold">How We Can Help</h2>
            <div className="mt-5 space-y-3 text-black/70">
              <p>• Product questions</p>
              <p>• Order support</p>
              <p>• Delivery information</p>
              <p>• Returns and refunds</p>
              <p>• Payment questions</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}