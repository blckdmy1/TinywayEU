"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

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
  { code: "+371", label: "LV", flag: "🇱🇻" },
  { code: "+370", label: "LT", flag: "🇱🇹" },
  { code: "+372", label: "EE", flag: "🇪🇪" },
  { code: "+49", label: "DE", flag: "🇩🇪" },
  { code: "+48", label: "PL", flag: "🇵🇱" },
  { code: "+46", label: "SE", flag: "🇸🇪" },
  { code: "+358", label: "FI", flag: "🇫🇮" },
  { code: "+45", label: "DK", flag: "🇩🇰" },
  { code: "+33", label: "FR", flag: "🇫🇷" },
  { code: "+39", label: "IT", flag: "🇮🇹" },
];

export default function SignupPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [userType, setUserType] = useState<UserType>("customer");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

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
    setCustomerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartnerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPartnerForm((prev) => ({ ...prev, [name]: value }));
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

      if (!cleanName || !cleanSurname || !cleanPhoneNumber || !cleanEmail || !cleanPassword || !cleanRepeatPassword) {
        setError("Please fill in all required fields.");
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

      const existingUser = users.find((user) => user.email.toLowerCase() === cleanEmail);
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
      localStorage.setItem("user", JSON.stringify({ email: cleanEmail, isLoggedIn: true, userType: "customer" }));
      localStorage.setItem("userProfile", JSON.stringify(newUser));
      router.push("/cabinet");
      return;
    }

    // Partner registration
    const cleanCompanyName = partnerForm.companyName.trim();
    const cleanCompanyRegistrationNumber = partnerForm.companyRegistrationNumber.trim();
    const cleanVatNumber = partnerForm.vatNumber.trim();
    const cleanPhoneCountryCode = partnerForm.phoneCountryCode.trim();
    const cleanPhoneNumber = partnerForm.phoneNumber.trim();
    const cleanEmail = partnerForm.email.trim().toLowerCase();
    const cleanPassword = partnerForm.password.trim();
    const cleanRepeatPassword = partnerForm.repeatPassword.trim();
    const cleanAddress = partnerForm.address.trim();
    const fullPhone = `${cleanPhoneCountryCode} ${cleanPhoneNumber}`.trim();

    if (!cleanCompanyName || !cleanCompanyRegistrationNumber || !cleanPhoneNumber || !cleanEmail || !cleanPassword || !cleanRepeatPassword) {
      setError("Please fill in all required fields.");
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

    const existingUser = users.find((user) => user.email.toLowerCase() === cleanEmail);
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
    localStorage.setItem("user", JSON.stringify({ email: cleanEmail, isLoggedIn: true, userType: "partner" }));
    localStorage.setItem("userProfile", JSON.stringify(newUser));
    router.push("/cabinet");
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-baseline gap-0.5 group">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition">TinyWay</span>
              <span className="text-sm font-medium text-primary">.eu</span>
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-white/60 hover:text-white transition"
            >
              {t("login")}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-12 md:py-20">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">{t("createAccount")}</h1>
          <p className="mt-3 text-white/60">{t("chooseAccountType")}</p>
        </div>

        {/* Account Type Toggle */}
        <div className="flex p-1 bg-white/10 rounded-full mb-8">
          <button
            type="button"
            onClick={() => setUserType("customer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-medium transition ${
              userType === "customer"
                ? "bg-white text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {t("customer")}
          </button>
          <button
            type="button"
            onClick={() => setUserType("partner")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-medium transition ${
              userType === "partner"
                ? "bg-white text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {t("partner")}
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 rounded-3xl border border-white/10 shadow-sm p-6 md:p-8 backdrop-blur-sm">
          <form onSubmit={handleSignup} className="space-y-5">
            {userType === "customer" ? (
              <>
                {/* Customer Form */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t("firstName")} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <input
                        name="name"
                        type="text"
                        value={customerForm.name}
                        onChange={handleCustomerChange}
                        placeholder="John"
                        className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t("lastName")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="surname"
                      type="text"
                      value={customerForm.surname}
                      onChange={handleCustomerChange}
                      placeholder="Doe"
                      className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t("phoneNumber")} <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-3">
                    <select
                      name="phoneCountryCode"
                      value={customerForm.phoneCountryCode}
                      onChange={handleCustomerChange}
                      className="h-12 px-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary transition text-white w-28"
                    >
                      {countryOptions.map((c) => (
                        <option key={c.code} value={c.code} className="bg-black text-white">{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <input
                        name="phoneNumber"
                        type="tel"
                        value={customerForm.phoneNumber}
                        onChange={handleCustomerChange}
                        placeholder="20123456"
                        className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t("email")} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      name="email"
                      type="email"
                      value={customerForm.email}
                      onChange={handleCustomerChange}
                      placeholder="john@example.com"
                      className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t("address")} <span className="text-white/40 text-xs">({t("optional")})</span>
                  </label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      name="address"
                      type="text"
                      value={customerForm.address}
                      onChange={handleCustomerChange}
                      placeholder="Street, City, Country"
                      className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t("password")} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={customerForm.password}
                        onChange={handleCustomerChange}
                        placeholder="Min 6 chars"
                        className="w-full h-12 pl-12 pr-12 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t("repeatPassword")} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <input
                        name="repeatPassword"
                        type={showRepeatPassword ? "text" : "password"}
                        value={customerForm.repeatPassword}
                        onChange={handleCustomerChange}
                        placeholder="Repeat"
                        className="w-full h-12 pl-12 pr-12 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                      >
                        {showRepeatPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Partner Form */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t("companyName")} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <input
                      name="companyName"
                      type="text"
                      value={partnerForm.companyName}
                      onChange={handlePartnerChange}
                      placeholder="Company Ltd."
                      className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t("regNumber")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="companyRegistrationNumber"
                      type="text"
                      value={partnerForm.companyRegistrationNumber}
                      onChange={handlePartnerChange}
                      placeholder="40001234567"
                      className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t("vatNumber")} <span className="text-white/40 text-xs">({t("optional")})</span>
                    </label>
                    <input
                      name="vatNumber"
                      type="text"
                      value={partnerForm.vatNumber}
                      onChange={handlePartnerChange}
                      placeholder="LV40001234567"
                      className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t("phoneNumber")} <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-3">
                    <select
                      name="phoneCountryCode"
                      value={partnerForm.phoneCountryCode}
                      onChange={handlePartnerChange}
                      className="h-12 px-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary transition text-white w-28"
                    >
                      {countryOptions.map((c) => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <input
                        name="phoneNumber"
                        type="tel"
                        value={partnerForm.phoneNumber}
                        onChange={handlePartnerChange}
                        placeholder="20123456"
                        className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t("email")} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      name="email"
                      type="email"
                      value={partnerForm.email}
                      onChange={handlePartnerChange}
                      placeholder="info@company.com"
                      className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t("address")} <span className="text-white/40 text-xs">({t("optional")})</span>
                  </label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      name="address"
                      type="text"
                      value={partnerForm.address}
                      onChange={handlePartnerChange}
                      placeholder="Street, City, Country"
                      className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t("password")} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={partnerForm.password}
                        onChange={handlePartnerChange}
                        placeholder="Min 6 chars"
                        className="w-full h-12 pl-12 pr-12 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t("repeatPassword")} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <input
                        name="repeatPassword"
                        type={showRepeatPassword ? "text" : "password"}
                        value={partnerForm.repeatPassword}
                        onChange={handlePartnerChange}
                        placeholder="Repeat"
                        className="w-full h-12 pl-12 pr-12 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-white placeholder:text-white/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                      >
                        {showRepeatPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {t("createAccount")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white/40">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                {t("login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
