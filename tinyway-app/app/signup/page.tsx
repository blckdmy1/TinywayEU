"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserType = "customer" | "partner";

type StoredCustomerUser = {
  userType: "customer";
  name: string;
  surname: string;
  phoneCountryCode: string;
  phoneNumber: string;
  phone: string;
  email: string;
  password: string;
  address: string;
};

type StoredPartnerUser = {
  userType: "partner";
  companyName: string;
  companyRegistrationNumber: string;
  vatNumber: string;
  phoneCountryCode: string;
  phoneNumber: string;
  phone: string;
  email: string;
  password: string;
  address: string;
};

type StoredUser = StoredCustomerUser | StoredPartnerUser;

const countryOptions = [
  { code: "+371", label: "Latvia" },
  { code: "+49", label: "Germany" },
  { code: "+370", label: "Lithuania" },
  { code: "+372", label: "Estonia" },
  { code: "+48", label: "Poland" },
  { code: "+46", label: "Sweden" },
  { code: "+358", label: "Finland" },
  { code: "+45", label: "Denmark" },
  { code: "+33", label: "France" },
  { code: "+39", label: "Italy" },
];

export default function SignupPage() {
  const router = useRouter();

  const [userType, setUserType] = useState<UserType>("customer");
  const [error, setError] = useState("");

  const [customerForm, setCustomerForm] = useState({
    name: "",
    surname: "",
    phoneCountryCode: "+371",
    phoneNumber: "",
    email: "",
    password: "",
    repeatPassword: "",
    address: "",
  });

  const [partnerForm, setPartnerForm] = useState({
    companyName: "",
    companyRegistrationNumber: "",
    vatNumber: "",
    phoneCountryCode: "+371",
    phoneNumber: "",
    email: "",
    password: "",
    repeatPassword: "",
    address: "",
  });

  const handleCustomerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCustomerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePartnerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPartnerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const savedUsers = localStorage.getItem("users");
    const users: StoredUser[] = savedUsers ? JSON.parse(savedUsers) : [];

    if (userType === "customer") {
      const cleanName = customerForm.name.trim();
      const cleanSurname = customerForm.surname.trim();
      const cleanPhoneCountryCode = customerForm.phoneCountryCode.trim();
      const cleanPhoneNumber = customerForm.phoneNumber.trim();
      const cleanEmail = customerForm.email.trim().toLowerCase();
      const cleanPassword = customerForm.password.trim();
      const cleanRepeatPassword = customerForm.repeatPassword.trim();
      const cleanAddress = customerForm.address.trim();
      const fullPhone = `${cleanPhoneCountryCode} ${cleanPhoneNumber}`.trim();

      if (
        !cleanName ||
        !cleanSurname ||
        !cleanPhoneCountryCode ||
        !cleanPhoneNumber ||
        !cleanEmail ||
        !cleanPassword ||
        !cleanRepeatPassword
      ) {
        setError("Please fill in all required customer fields.");
        return;
      }

      if (cleanPassword.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (cleanPassword !== cleanRepeatPassword) {
        setError("Passwords do not match.");
        return;
      }

      const existingUser = users.find(
        (user) => user.email.toLowerCase() === cleanEmail
      );

      if (existingUser) {
        setError("User with this email already exists.");
        return;
      }

      const newUser: StoredCustomerUser = {
        userType: "customer",
        name: cleanName,
        surname: cleanSurname,
        phoneCountryCode: cleanPhoneCountryCode,
        phoneNumber: cleanPhoneNumber,
        phone: fullPhone,
        email: cleanEmail,
        password: cleanPassword,
        address: cleanAddress,
      };

      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: cleanEmail,
          isLoggedIn: true,
          userType: "customer",
        })
      );
      localStorage.setItem("userProfile", JSON.stringify(newUser));

      router.push("/cabinet");
      return;
    }

    const cleanCompanyName = partnerForm.companyName.trim();
    const cleanCompanyRegistrationNumber =
      partnerForm.companyRegistrationNumber.trim();
    const cleanVatNumber = partnerForm.vatNumber.trim();
    const cleanPhoneCountryCode = partnerForm.phoneCountryCode.trim();
    const cleanPhoneNumber = partnerForm.phoneNumber.trim();
    const cleanEmail = partnerForm.email.trim().toLowerCase();
    const cleanPassword = partnerForm.password.trim();
    const cleanRepeatPassword = partnerForm.repeatPassword.trim();
    const cleanAddress = partnerForm.address.trim();
    const fullPhone = `${cleanPhoneCountryCode} ${cleanPhoneNumber}`.trim();

    if (
      !cleanCompanyName ||
      !cleanCompanyRegistrationNumber ||
      !cleanPhoneCountryCode ||
      !cleanPhoneNumber ||
      !cleanEmail ||
      !cleanPassword ||
      !cleanRepeatPassword
    ) {
      setError("Please fill in all required partner fields.");
      return;
    }

    if (cleanPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (cleanPassword !== cleanRepeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === cleanEmail
    );

    if (existingUser) {
      setError("User with this email already exists.");
      return;
    }

    const newUser: StoredPartnerUser = {
      userType: "partner",
      companyName: cleanCompanyName,
      companyRegistrationNumber: cleanCompanyRegistrationNumber,
      vatNumber: cleanVatNumber,
      phoneCountryCode: cleanPhoneCountryCode,
      phoneNumber: cleanPhoneNumber,
      phone: fullPhone,
      email: cleanEmail,
      password: cleanPassword,
      address: cleanAddress,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: cleanEmail,
        isLoggedIn: true,
        userType: "partner",
      })
    );
    localStorage.setItem("userProfile", JSON.stringify(newUser));

    router.push("/cabinet");
  };

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
              Sign Up
            </h1>
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Back to login
            </Link>
          </nav>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="flex min-h-[680px] flex-col justify-between rounded-[2rem] border border-primary bg-primary p-8 text-primary-foreground md:p-12">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.45em] text-primary-foreground/60">
                New Account
              </p>
              <h2 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
                Create your TinyWay account
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-primary-foreground/70 md:text-lg">
                Choose your account type. The registration form changes
                automatically for customer or partner.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-primary-foreground/15 bg-primary-foreground/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/50">
                Selected account type
              </p>
              <p className="mt-2 text-lg font-medium">
                {userType === "customer" ? "Customer" : "Partner"}
              </p>
            </div>
          </div>

          <div className="flex min-h-[680px] items-center rounded-[2rem] border border-border bg-muted p-8 md:p-12">
            <div className="w-full">
              <div className="mb-8">
                <p className="mb-3 text-xs uppercase tracking-[0.45em] text-muted-foreground">
                  Registration
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  Create account
                </h2>
              </div>

              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Account type
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType("customer")}
                      className={`rounded-full px-5 py-4 text-sm font-medium uppercase tracking-[0.2em] transition ${
                        userType === "customer"
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      Customer
                    </button>

                    <button
                      type="button"
                      onClick={() => setUserType("partner")}
                      className={`rounded-full px-5 py-4 text-sm font-medium uppercase tracking-[0.2em] transition ${
                        userType === "partner"
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      Partner
                    </button>
                  </div>
                </div>

                {userType === "customer" ? (
                  <>
                    <FormInput
                      label="Name"
                      name="name"
                      value={customerForm.name}
                      onChange={handleCustomerChange}
                      placeholder="Enter your name"
                    />

                    <FormInput
                      label="Surname"
                      name="surname"
                      value={customerForm.surname}
                      onChange={handleCustomerChange}
                      placeholder="Enter your surname"
                    />

                    <PhoneInput
                      countryCodeName="phoneCountryCode"
                      phoneNumberName="phoneNumber"
                      countryCodeValue={customerForm.phoneCountryCode}
                      phoneNumberValue={customerForm.phoneNumber}
                      onChange={handleCustomerChange}
                    />

                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      value={customerForm.email}
                      onChange={handleCustomerChange}
                      placeholder="Enter your email"
                    />

                    <FormInput
                      label="Address (optional)"
                      name="address"
                      value={customerForm.address}
                      onChange={handleCustomerChange}
                      placeholder="Enter your address"
                    />

                    <FormInput
                      label="Password"
                      name="password"
                      type="password"
                      value={customerForm.password}
                      onChange={handleCustomerChange}
                      placeholder="Enter your password"
                    />

                    <FormInput
                      label="Repeat password"
                      name="repeatPassword"
                      type="password"
                      value={customerForm.repeatPassword}
                      onChange={handleCustomerChange}
                      placeholder="Repeat your password"
                    />
                  </>
                ) : (
                  <>
                    <FormInput
                      label="Company name"
                      name="companyName"
                      value={partnerForm.companyName}
                      onChange={handlePartnerChange}
                      placeholder="Enter company name"
                    />

                    <FormInput
                      label="Company registration number"
                      name="companyRegistrationNumber"
                      value={partnerForm.companyRegistrationNumber}
                      onChange={handlePartnerChange}
                      placeholder="Enter registration number"
                    />

                    <FormInput
                      label="VAT number (optional)"
                      name="vatNumber"
                      value={partnerForm.vatNumber}
                      onChange={handlePartnerChange}
                      placeholder="Enter VAT number"
                    />

                    <PhoneInput
                      countryCodeName="phoneCountryCode"
                      phoneNumberName="phoneNumber"
                      countryCodeValue={partnerForm.phoneCountryCode}
                      phoneNumberValue={partnerForm.phoneNumber}
                      onChange={handlePartnerChange}
                    />

                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      value={partnerForm.email}
                      onChange={handlePartnerChange}
                      placeholder="Enter email"
                    />

                    <FormInput
                      label="Address (optional)"
                      name="address"
                      value={partnerForm.address}
                      onChange={handlePartnerChange}
                      placeholder="Enter address"
                    />

                    <FormInput
                      label="Password"
                      name="password"
                      type="password"
                      value={partnerForm.password}
                      onChange={handlePartnerChange}
                      placeholder="Enter password"
                    />

                    <FormInput
                      label="Repeat password"
                      name="repeatPassword"
                      type="password"
                      value={partnerForm.repeatPassword}
                      onChange={handlePartnerChange}
                      placeholder="Repeat your password"
                    />
                  </>
                )}

                {error && (
                  <div className="rounded-[1.25rem] border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
                >
                  Sign up
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-primary underline">
                    Login
                  </Link>
                </p>
              </div>
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
};

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-full border border-border bg-card px-6 py-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  );
}

type PhoneInputProps = {
  countryCodeName: string;
  phoneNumberName: string;
  countryCodeValue: string;
  phoneNumberValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

function PhoneInput({
  countryCodeName,
  phoneNumberName,
  countryCodeValue,
  phoneNumberValue,
  onChange,
}: PhoneInputProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Phone number
      </label>

      <div className="grid grid-cols-[170px_1fr] gap-3">
        <select
          name={countryCodeName}
          value={countryCodeValue}
          onChange={onChange}
          className="rounded-full border border-border bg-card px-4 py-4 text-foreground outline-none transition focus:border-primary"
        >
          {countryOptions.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code} {country.label}
            </option>
          ))}
        </select>

        <input
          name={phoneNumberName}
          type="text"
          value={phoneNumberValue}
          onChange={onChange}
          placeholder="Enter phone number"
          className="w-full rounded-full border border-border bg-card px-6 py-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
        />
      </div>
    </div>
  );
}
