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

type CabinetSection =
  | "account"
  | "delivery"
  | "settings"
  | "liked"
  | "goods";

const defaultProfile: UserProfile = {
  name: "",
  surname: "",
  phone: "",
  email: "",
  address: "",
  deliveryAddress: "",
  photo: "",
};

export default function CabinetPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [checkedAuth, setCheckedAuth] = useState(false);
  const [activeSection, setActiveSection] =
    useState<CabinetSection>("account");
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [userType, setUserType] = useState<"customer" | "partner">("customer");

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageBase64 = reader.result as string;

      setProfile((prev) => ({
        ...prev,
        photo: imageBase64,
      }));
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
        JSON.stringify({
          ...parsedUser,
          email: profile.email,
        })
      );
    }

    setSaveMessage("Changes saved successfully.");

    setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const removeLikedItem = (id: number) => {
    const updatedItems = likedItems.filter((item) => item.id !== id);
    setLikedItems(updatedItems);
    localStorage.setItem("likedProducts", JSON.stringify(updatedItems));
  };

  const handleProductChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const productName = newProduct.name.trim();
    const productPrice = Number(newProduct.price);
    const productStock = Number(newProduct.stock);
    const productImage = newProduct.image.trim();
    const productDescription = newProduct.description.trim();

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
    const allProducts: PartnerProduct[] = savedProducts
      ? JSON.parse(savedProducts)
      : [];

    const newItem: PartnerProduct = {
      id: Date.now(),
      name: productName,
      price: productPrice,
      stock: productStock,
      image: productImage,
      description: productDescription,
      createdBy: parsedUser.email,
    };

    const updatedProducts = [...allProducts, newItem];

    localStorage.setItem("partnerProducts", JSON.stringify(updatedProducts));
    setPartnerProducts((prev) => [...prev, newItem]);

    setNewProduct({
      name: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    });

    setProductMessage("Product added successfully.");

    setTimeout(() => {
      setProductMessage("");
    }, 3000);
  };

  const handleRemoveProduct = (id: number) => {
    const savedProducts = localStorage.getItem("partnerProducts");
    const allProducts: PartnerProduct[] = savedProducts
      ? JSON.parse(savedProducts)
      : [];

    const updatedProducts = allProducts.filter((item) => item.id !== id);

    localStorage.setItem("partnerProducts", JSON.stringify(updatedProducts));
    setPartnerProducts((prev) => prev.filter((item) => item.id !== id));
  };

  if (!checkedAuth) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            <span>Luxury minimal electronics</span>
            <span>Black / White Collection</span>
          </div>

          <div className="rounded-[2rem] border border-border bg-muted p-8 text-center">
            <p className="text-lg text-muted-foreground">{t("checkingAccount")}</p>
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

        <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-muted-foreground">
              TinyWay.eu
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {t("myCabinet")}
            </h1>
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              {t("home")}
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
            >
              {t("logout")}
            </button>
          </nav>
        </header>

        <section className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-[2rem] border border-primary bg-primary p-6 text-primary-foreground">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-primary-foreground/20 bg-primary-foreground/10">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
                    {t("noPhoto")}
                  </span>
                )}
              </div>

              <p className="text-lg font-medium">
                {profile.name || profile.surname
                  ? `${profile.name} ${profile.surname}`.trim()
                  : t("yourProfile")}
              </p>
              <p className="mt-1 text-sm text-primary-foreground/60">
                {profile.email || t("noEmail")}
              </p>
            </div>

            <div className="space-y-3">
              <MenuButton
                label={t("accountInfo")}
                isActive={activeSection === "account"}
                onClick={() => setActiveSection("account")}
              />

              <MenuButton
                label={t("deliveryAddress")}
                isActive={activeSection === "delivery"}
                onClick={() => setActiveSection("delivery")}
              />

              <MenuButton
                label={t("settings")}
                isActive={activeSection === "settings"}
                onClick={() => setActiveSection("settings")}
              />

              <MenuButton
                label={t("likedProducts")}
                isActive={activeSection === "liked"}
                onClick={() => setActiveSection("liked")}
              />

              {userType === "partner" && (
                <MenuButton
                  label={t("myGoods")}
                  isActive={activeSection === "goods"}
                  onClick={() => setActiveSection("goods")}
                />
              )}
            </div>
          </aside>

          <div className="rounded-[2rem] border border-border bg-muted p-8 md:p-10">
            {activeSection === "account" && (
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.45em] text-muted-foreground">
                  {t("accountInfo")}
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  {t("yourProfile")}
                </h2>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <InfoCard label="Name" value={profile.name || "Not added"} />
                  <InfoCard
                    label="Surname"
                    value={profile.surname || "Not added"}
                  />
                  <InfoCard
                    label="Phone number"
                    value={profile.phone || "Not added"}
                  />
                  <InfoCard label="Email" value={profile.email || "Not added"} />
                  <InfoCard
                    label="Address"
                    value={profile.address || "Not added"}
                  />
                  <InfoCard
                    label="Delivery address"
                    value={profile.deliveryAddress || "Not added"}
                  />
                </div>
              </div>
            )}

            {activeSection === "delivery" && (
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.45em] text-muted-foreground">
                  {t("deliveryAddress")}
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  {t("deliveryDetails")}
                </h2>

                <div className="mt-8 rounded-[1.5rem] border border-border bg-card p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t("currentDeliveryAddress")}
                  </p>
                  <p className="mt-3 text-lg text-foreground/70">
                    {profile.deliveryAddress ||
                      t("noDeliveryAddress")}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setActiveSection("settings")}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
                  >
                    {t("changeAddress")}
                  </button>
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.45em] text-muted-foreground">
                  {t("settings")}
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  {t("changeYourInfo")}
                </h2>

                <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
                  <div className="rounded-[1.5rem] border border-primary bg-primary p-6 text-primary-foreground">
                    <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary-foreground/60">
                      {t("profilePhoto")}
                    </p>

                    <div className="mb-6 flex justify-center">
                      {profile.photo ? (
                        <img
                          src={profile.photo}
                          alt="Profile"
                          className="h-28 w-28 rounded-full object-cover border border-primary-foreground/20"
                        />
                      ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
                          {t("noPhoto")}
                        </div>
                      )}
                    </div>

                    <label className="block cursor-pointer rounded-full border border-primary-foreground/20 px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] transition hover:bg-card hover:text-foreground">
                      {t("uploadPhoto")}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="rounded-[1.5rem] border border-border bg-card p-6">
                    <div className="grid gap-5 md:grid-cols-2">
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
                        label="Address"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                      />

                      <FormInput
                        label="Delivery address"
                        name="deliveryAddress"
                        value={profile.deliveryAddress}
                        onChange={handleChange}
                        placeholder="Enter your delivery address"
                      />
                    </div>

<div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
                                      <button
                        onClick={handleSaveProfile}
                        className="rounded-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
                      >
                        {t("saveChanges")}
                      </button>

                      {saveMessage && (
                        <p className="text-sm text-primary">{saveMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "liked" && (
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.45em] text-muted-foreground">
                  {t("savedGoods")}
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  {t("likedProducts")}
                </h2>

                <div className="mt-8 space-y-4">
                  {likedItems.length === 0 ? (
                    <div className="rounded-[1.5rem] border border-border bg-card p-6 text-muted-foreground">
                      {t("noLikedProducts")}
                    </div>
                  ) : (
                    likedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-[1.5rem] border border-border bg-card p-4"
                      >
                        <div className="flex items-center gap-4">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-xl bg-muted" />
                          )}

                          <div>
                            <p className="text-lg font-medium">{item.name}</p>
                            {item.price !== undefined && (
                              <p className="text-sm text-muted-foreground">
                                €{item.price}
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeLikedItem(item.id)}
                          className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-destructive hover:text-primary-foreground hover:border-destructive"
                        >
                          {t("remove")}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeSection === "goods" && userType === "partner" && (
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.45em] text-muted-foreground">
                  My Goods
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  Add and manage your products
                </h2>

                <div className="mt-8 rounded-[1.5rem] border border-border bg-card p-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <FormInput
                      label="Product name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleProductChange}
                      placeholder="Enter product name"
                    />

                    <FormInput
                      label="Price"
                      name="price"
                      value={newProduct.price}
                      onChange={handleProductChange}
                      placeholder="Enter product price"
                    />

                    <FormInput
                      label="Stock left"
                      name="stock"
                      value={newProduct.stock}
                      onChange={handleProductChange}
                      placeholder="How many left in stock"
                    />

                    <FormInput
                      label="Image URL"
                      name="image"
                      value={newProduct.image}
                      onChange={handleProductChange}
                      placeholder="Paste product image URL"
                    />

                    <TextAreaInput
                      label="Description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleProductChange}
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
                    <button
                      onClick={handleAddProduct}
                      className="rounded-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
                    >
                      Add product
                    </button>

                    {productMessage && (
                      <p className="text-sm text-primary">{productMessage}</p>
                    )}
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {partnerProducts.length === 0 ? (
                    <div className="rounded-[1.5rem] border border-border bg-card p-6 text-muted-foreground">
                      You have not added any products yet.
                    </div>
                  ) : (
                    partnerProducts.map((product) => (
                      <div
                        key={product.id}
                        className="rounded-[1.5rem] border border-border bg-card p-5"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="flex items-start gap-4">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-20 w-20 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="h-20 w-20 rounded-xl bg-muted" />
                            )}

                            <div>
                              <p className="text-lg font-medium">
                                {product.name}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                €{product.price}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                Stock left: {product.stock}
                              </p>
                              {product.description && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                  {product.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-destructive hover:text-primary-foreground hover:border-destructive"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 TinyWay.eu</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/cabinet" className="hover:text-foreground">
              Cabinet
            </Link>
            <Link href="/cart" className="hover:text-foreground">
              Cart
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

type MenuButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function MenuButton({ label, isActive, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-full px-5 py-3 text-left text-sm font-medium uppercase tracking-[0.2em] transition ${
        isActive
          ? "bg-card text-foreground"
          : "border border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground hover:bg-card hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

type InfoCardProps = {
  label: string;
  value: string;
};

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-xl font-medium">{value}</p>
    </div>
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
        className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground"
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
        className="w-full rounded-full border border-border bg-background px-6 py-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  );
}

type TextAreaInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
};

function TextAreaInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}: TextAreaInputProps) {
  return (
    <div className="md:col-span-2">
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-[1.5rem] border border-border bg-background px-6 py-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  );
}
