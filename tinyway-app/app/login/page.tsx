"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type StoredUser = {
  email: string;
  password: string;
};

type LoggedUser = {
  email: string;
  isLoggedIn: boolean;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const savedLoggedUser = localStorage.getItem("user");

    if (savedLoggedUser) {
      try {
        const parsedUser: LoggedUser = JSON.parse(savedLoggedUser);

        if (parsedUser.isLoggedIn) {
          router.push("/cabinet");
          return;
        }
      } catch (error) {
        localStorage.removeItem("user");
      }
    }

    setCheckingAuth(false);
  }, [router]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please fill in all fields.");
      return;
    }

    const savedUsers = localStorage.getItem("users");
    const users: StoredUser[] = savedUsers ? JSON.parse(savedUsers) : [];

    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === cleanEmail &&
        user.password === cleanPassword
    );

    if (!matchedUser) {
      setError("Wrong email or password.");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: matchedUser.email,
        isLoggedIn: true,
      })
    );

    router.push("/cabinet");
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="flex min-h-[70vh] items-center justify-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Loading...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4 text-sm uppercase tracking-[0.25em] text-muted-foreground">
          <span>Luxury minimal electronics</span>
          <span>Black / White Collection</span>
        </div>

        <header className="mb-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-muted-foreground">
              TinyWay.eu
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Login
            </h1>
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Back to home
            </Link>
          </nav>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="flex min-h-[560px] flex-col justify-between rounded-[2rem] border border-primary bg-primary p-8 text-primary-foreground md:p-12">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.45em] text-primary-foreground/60">
                Welcome Back
              </p>
              <h2 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
                Sign in to your TinyWay account
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-primary-foreground/70 md:text-lg">
                Login with your email and password to access your personal
                cabinet.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-primary-foreground/15 bg-primary-foreground/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/50">
                New here?
              </p>
              <p className="mt-2 text-lg font-medium">
                Create an account in a few seconds.
              </p>
            </div>
          </div>

          <div className="flex min-h-[560px] items-center rounded-[2rem] border border-border bg-muted p-8 md:p-12">
            <div className="w-full">
              <div className="mb-8">
                <p className="mb-3 text-xs uppercase tracking-[0.45em] text-muted-foreground">
                  Account Access
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  Login to continue
                </h2>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-full border border-border bg-card px-6 py-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-full border border-border bg-card px-6 py-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>

                {error && (
                  <div className="rounded-[1.25rem] border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
                >
                  Login
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Do not have an account?{" "}
                  <Link href="/signup" className="font-medium text-primary underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 TinyWay.eu</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/login" className="hover:text-foreground">
              Login
            </Link>
            <Link href="/signup" className="hover:text-foreground">
              Sign up
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
