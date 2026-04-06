import Link from "next/link";

export default function MyAccountPage() {
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
            My Account
          </p>
          <h1 className="mt-2 text-4xl font-bold">Account Overview</h1>
          <p className="mt-4 max-w-2xl text-black/60">
            Manage your profile, orders, saved items and account settings in one
            place.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="text-xl font-bold">My Orders</h2>
            <p className="mt-2 text-sm text-black/60">
              View current and past orders, order status and delivery progress.
            </p>
            <button className="mt-5 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
              View Orders
            </button>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="text-xl font-bold">Profile Settings</h2>
            <p className="mt-2 text-sm text-black/60">
              Update your account information and contact details.
            </p>
            <button className="mt-5 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
              Edit Profile
            </button>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="text-xl font-bold">Saved Items</h2>
            <p className="mt-2 text-sm text-black/60">
              Review products you want to return to later.
            </p>
            <button className="mt-5 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
              Open Saved Items
            </button>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="text-xl font-bold">Help & Support</h2>
            <p className="mt-2 text-sm text-black/60">
              Get help with account, payment, delivery and returns.
            </p>
            <button className="mt-5 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}