"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";

type User = {
  email: string;
  isLoggedIn: boolean;
  userType?: "customer" | "partner";
};

type UserProfile = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  address: string;
  deliveryAddress: string;
  photo: string;
};

type LikedItem = {
  id: number;
  name: string;
  price?: number;
  image?: string;
};

type PartnerProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  createdBy: string;
};

type CabinetSection = "account" | "delivery" | "settings" | "liked" | "goods";

const defaultProfile: UserProfile = {
  name: "",
  surname: "",
  phone: "",
  email: "",
  address: "",
  deliveryAddress: "",
  photo: "",
};

const menuItems = [
  { id: "account" as CabinetSection, icon: "user", labelKey: "accountInfo" },
  { id: "delivery" as CabinetSection, icon: "truck", labelKey: "deliveryAddress" },
  { id: "settings" as CabinetSection, icon: "settings", labelKey: "settings" },
  { id: "liked" as CabinetSection, icon: "heart", labelKey: "likedProducts" },
];

export default function CabinetPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [checkedAuth, setCheckedAuth] = useState(false);
  const [activeSection, setActiveSection] = useState<CabinetSection>("account");
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [userType, setUserType] = useState<"customer" | "partner">("customer");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [partnerProducts, setPartnerProducts] = useState<PartnerProduct[]>([]);
  const [productMessage, setProductMessage] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.replace("/login");
      return;
    }

    try {
      const parsedUser: User = JSON.parse(savedUser);

      if (!parsedUser.isLoggedIn) {
        router.replace("/login");
        return;
      }

      setUserType(parsedUser.userType || "customer");

      const savedProfile = localStorage.getItem("userProfile");
      const savedLikedItems = localStorage.getItem("likedProducts");
      const savedPartnerProducts = localStorage.getItem("partnerProducts");

      if (savedProfile) {
        const parsedProfile: UserProfile = JSON.parse(savedProfile);
        setProfile({
          ...defaultProfile,
          ...parsedProfile,
          email: parsedProfile.email || parsedUser.email,
        });
      } else {
        setProfile({
          ...defaultProfile,
          email: parsedUser.email,
        });
      }

      if (savedLikedItems) {
        setLikedItems(JSON.parse(savedLikedItems));
      }

      if (savedPartnerProducts) {
        const parsedProducts: PartnerProduct[] = JSON.parse(savedPartnerProducts);
        const ownProducts = parsedProducts.filter(
          (item) => item.createdBy === parsedUser.email
        );
        setPartnerProducts(ownProducts);
      }

      setCheckedAuth(true);
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("userProfile");
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageBase64 = reader.result as string;
      setProfile((prev) => ({ ...prev, photo: imageBase64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...parsedUser, email: profile.email })
      );
    }

    setSaveMessage("Changes saved successfully.");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const removeLikedItem = (id: number) => {
    const updatedItems = likedItems.filter((item) => item.id !== id);
    setLikedItems(updatedItems);
    localStorage.setItem("likedProducts", JSON.stringify(updatedItems));
  };

  const handleProductChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    const productName = newProduct.name.trim();
    const productPrice = Number(newProduct.price);
    const productStock = Number(newProduct.stock);

    if (!productName || !newProduct.price.trim() || !newProduct.stock.trim()) {
      setProductMessage("Please fill in product name, price, and stock.");
      return;
    }

    if (Number.isNaN(productPrice) || productPrice <= 0) {
      setProductMessage("Please enter a valid price.");
      return;
    }

    if (Number.isNaN(productStock) || productStock < 0) {
      setProductMessage("Please enter a valid stock amount.");
      return;
    }

    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      setProductMessage("User not found.");
      return;
    }

    const parsedUser: User = JSON.parse(savedUser);
    const savedProducts = localStorage.getItem("partnerProducts");
    const allProducts: PartnerProduct[] = savedProducts ? JSON.parse(savedProducts) : [];

    const newItem: PartnerProduct = {
      id: Date.now(),
      name: productName,
      price: productPrice,
      stock: productStock,
      image: newProduct.image.trim(),
      description: newProduct.description.trim(),
      createdBy: parsedUser.email,
    };

    const updatedProducts = [...allProducts, newItem];
    localStorage.setItem("partnerProducts", JSON.stringify(updatedProducts));
    setPartnerProducts((prev) => [...prev, newItem]);

    setNewProduct({ name: "", price: "", stock: "", image: "", description: "" });
    setProductMessage("Product added successfully.");
    setTimeout(() => setProductMessage(""), 3000);
  };

  const handleRemoveProduct = (id: number) => {
    const savedProducts = localStorage.getItem("partnerProducts");
    const allProducts: PartnerProduct[] = savedProducts ? JSON.parse(savedProducts) : [];
    const updatedProducts = allProducts.filter((item) => item.id !== id);

    localStorage.setItem("partnerProducts", JSON.stringify(updatedProducts));
    setPartnerProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "user":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case "truck":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        );
      case "settings":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case "heart":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case "package":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!checkedAuth) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-muted-foreground">{t("checkingAccount")}</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-baseline gap-0.5 group">
                <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition">TinyWay</span>
                <span className="text-sm font-medium text-primary">.eu</span>
              </Link>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">
                  {profile.name || profile.surname ? `${profile.name} ${profile.surname}`.trim() : t("yourProfile")}
                </p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>

              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="h-10 px-4 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition"
              >
                {t("logout")}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          {/* Sidebar */}
          <aside className={`${mobileMenuOpen ? "block" : "hidden"} lg:block mb-6 lg:mb-0`}>
            <nav className="sticky top-24 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {getIcon(item.icon)}
                  {t(item.labelKey)}
                </button>
              ))}

              {userType === "partner" && (
                <button
                  onClick={() => {
                    setActiveSection("goods");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                    activeSection === "goods"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {getIcon("package")}
                  {t("myGoods")}
                </button>
              )}

              <div className="pt-4 mt-4 border-t border-border">
                <Link
                  href="/"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {t("backToHome")}
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            {/* Account Section */}
            {activeSection === "account" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-foreground">{t("accountInfo")}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{t("yourProfile")}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoCard icon="user" label="Name" value={profile.name || "Not set"} />
                  <InfoCard icon="user" label="Surname" value={profile.surname || "Not set"} />
                  <InfoCard icon="phone" label="Phone" value={profile.phone || "Not set"} />
                  <InfoCard icon="mail" label="Email" value={profile.email || "Not set"} />
                  <InfoCard icon="home" label="Address" value={profile.address || "Not set"} />
                  <InfoCard icon="truck" label="Delivery Address" value={profile.deliveryAddress || "Not set"} />
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setActiveSection("settings")}
                    className="h-10 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition"
                  >
                    {t("changeYourInfo")}
                  </button>
                </div>
              </div>
            )}

            {/* Delivery Section */}
            {activeSection === "delivery" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-foreground">{t("deliveryAddress")}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{t("deliveryDetails")}</p>
                </div>

                <div className="p-6 bg-muted/50 rounded-xl border border-border">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t("currentDeliveryAddress")}</p>
                      <p className="text-foreground">{profile.deliveryAddress || t("noDeliveryAddress")}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setActiveSection("settings")}
                    className="h-10 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition"
                  >
                    {t("changeAddress")}
                  </button>
                </div>
              </div>
            )}

            {/* Settings Section */}
            {activeSection === "settings" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-foreground">{t("settings")}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{t("changeYourInfo")}</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
                  {/* Photo Upload */}
                  <div className="flex flex-col items-center p-6 bg-muted/50 rounded-xl border border-border">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden mb-4">
                      {profile.photo ? (
                        <img src={profile.photo} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <label className="cursor-pointer h-9 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition flex items-center justify-center">
                      {t("uploadPhoto")}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Form Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormInput label="Name" name="name" value={profile.name} onChange={handleChange} placeholder="Enter your name" />
                    <FormInput label="Surname" name="surname" value={profile.surname} onChange={handleChange} placeholder="Enter your surname" />
                    <FormInput label="Phone" name="phone" value={profile.phone} onChange={handleChange} placeholder="Enter your phone" />
                    <FormInput label="Email" name="email" value={profile.email} onChange={handleChange} placeholder="Enter your email" />
                    <FormInput label="Address" name="address" value={profile.address} onChange={handleChange} placeholder="Enter your address" />
                    <FormInput label="Delivery Address" name="deliveryAddress" value={profile.deliveryAddress} onChange={handleChange} placeholder="Enter delivery address" />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={handleSaveProfile}
                    className="h-10 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition"
                  >
                    {t("saveChanges")}
                  </button>
                  {saveMessage && (
                    <span className="text-sm text-primary flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {saveMessage}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Liked Products Section */}
            {activeSection === "liked" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-foreground">{t("likedProducts")}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{t("savedGoods")}</p>
                </div>

                {likedItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground mb-4">{t("noLikedProducts")}</p>
                    <Link
                      href="/"
                      className="inline-flex h-10 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition items-center"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {likedItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                        ) : (
                          <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{item.name}</p>
                          {item.price && <p className="text-sm text-primary font-semibold">{item.price.toFixed(2)}</p>}
                        </div>
                        <button
                          onClick={() => removeLikedItem(item.id)}
                          className="h-9 px-4 text-sm font-medium text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition"
                        >
                          {t("remove")}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Partner Products Section */}
            {activeSection === "goods" && userType === "partner" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-foreground">{t("myGoods")}</h1>
                  <p className="text-sm text-muted-foreground mt-1">Manage your products</p>
                </div>

                {/* Add New Product */}
                <div className="p-6 bg-muted/50 rounded-xl border border-border mb-6">
                  <h3 className="text-sm font-medium text-foreground mb-4">Add New Product</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormInput label="Product Name" name="name" value={newProduct.name} onChange={handleProductChange} placeholder="Enter product name" />
                    <FormInput label="Price" name="price" value={newProduct.price} onChange={handleProductChange} placeholder="Enter price" />
                    <FormInput label="Stock" name="stock" value={newProduct.stock} onChange={handleProductChange} placeholder="Enter stock quantity" />
                    <FormInput label="Image URL" name="image" value={newProduct.image} onChange={handleProductChange} placeholder="Enter image URL" />
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                      <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleProductChange}
                        placeholder="Enter product description"
                        rows={3}
                        className="w-full px-4 py-3 text-sm bg-background border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground resize-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={handleAddProduct}
                      className="h-10 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition"
                    >
                      Add Product
                    </button>
                    {productMessage && (
                      <span className="text-sm text-primary">{productMessage}</span>
                    )}
                  </div>
                </div>

                {/* Product List */}
                {partnerProducts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No products added yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {partnerProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover" />
                        ) : (
                          <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                        </div>
                        <p className="text-lg font-semibold text-primary">{product.price.toFixed(2)}</p>
                        <button
                          onClick={() => handleRemoveProduct(product.id)}
                          className="h-9 px-4 text-sm font-medium text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition"
                        >
                          {t("remove")}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper Components
function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  const getInfoIcon = () => {
    switch (icon) {
      case "user":
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
      case "phone":
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />;
      case "mail":
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
      case "home":
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />;
      case "truck":
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-muted/50 rounded-xl border border-border">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {getInfoIcon()}
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
          <p className="text-foreground truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-11 px-4 text-sm bg-background border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground"
      />
    </div>
  );
}
