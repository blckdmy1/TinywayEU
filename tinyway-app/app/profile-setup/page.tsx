"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CurrentUser = {
  email: string;
  isLoggedIn: boolean;
};

type UserProfile = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  address: string;
};

const defaultProfile: UserProfile = {
  name: "",
  surname: "",
  phone: "",
  email: "",
  address: "",
};

export default function ProfileSetupPage() {
  const router = useRouter();

  const [checkedAuth, setCheckedAuth] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.replace("/login");
      return;
    }

    try {
      const parsedUser: CurrentUser = JSON.parse(savedUser);

      if (!parsedUser.isLoggedIn) {
        router.replace("/login");
        return;
      }

      setProfile((prev) => ({
        ...prev,
        email: parsedUser.email,
      }));

      setCheckedAuth(true);
    } catch {
      router.replace("/login");
    }
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!profile.name.trim() || !profile.surname.trim() || !profile.phone.trim() || !profile.email.trim()) {
      setError("Please fill in name, surname, phone number, and email.");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(profile));
    router.push("/cabinet");
  };

  if (!checkedAuth) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="rounded-[2rem] border border-black/10 bg-[#f8f8f8] p-8 text-center">
            <p className="text-lg text-black/60">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4 text-sm uppercase tracking-[0.25em] text-black/60">
          <span>Luxury minimal electronics</span>
          <span>Black / White Collection</span>
        </div>

        <header className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.45em] text-black/50">
            TinyWay.eu
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Complete your profile
          </h1>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="flex min-h-[560px] flex-col justify-between rounded-[2rem] border border-black bg-black p-8 text-white md:p-12">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/60">
                Profile Setup
              </p>
              <h2 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
                Tell us a little about yourself
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/70 md:text-lg">
                Add your basic account information. Address is optional.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-[#f8f8f8] p-8 md:p-12">
            <form onSubmit={handleSave} className="space-y-5">
              <FormInput
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />

              <FormInput
                label="Surname"
                name="surname"
                value={profile.surname}
                onChange={handleChange}
                placeholder="Enter your surname"
              />

              <FormInput
                label="Phone number"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />

              <FormInput
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <FormInput
                label="Address (optional)"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />

              {error && (
                <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-black px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:opacity-85"
              >
                Save and continue
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/cabinet" className="text-sm text-black/50 underline">
                Skip for now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

type FormInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-[0.3em] text-black/45"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-full border border-black/15 bg-white px-6 py-4 text-black outline-none transition placeholder:text-black/35 focus:border-black"
      />
    </div>
  );
}