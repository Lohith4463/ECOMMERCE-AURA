"use client";

import Image from "next/image";
import Link from "next/link";
import { BarChart3, Boxes, LogOut, PackagePlus, Upload } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import { useProducts } from "@/hooks/use-products";
import { upsertProduct } from "@/firebase/firestore";
import type { Product } from "@/lib/types";

const fallbackImage =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90";

export default function AdminPage() {
  const { user, logout, loading } = useAuth();
  const { toast } = useToast();
  const { products, source, error } = useProducts();
  const configuredAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase();
  const fallbackAdminEmail = "admin@example.com";
  const adminEmails = new Set([fallbackAdminEmail, configuredAdminEmail].filter(Boolean));
  const currentEmail = user?.email?.trim().toLowerCase();
  const adminEmail = configuredAdminEmail ?? fallbackAdminEmail;
  const isAdmin = Boolean(currentEmail && adminEmails.has(currentEmail));
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    inventory: "",
    image: ""
  });

  const stats = useMemo(() => {
    const inventory = products.reduce((sum, product) => sum + product.inventory, 0);
    const value = products.reduce((sum, product) => sum + product.price * product.inventory, 0);
    const lowStock = products.filter((product) => product.inventory <= 10).length;
    return { inventory, value, lowStock };
  }, [products]);

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const slug =
        form.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || crypto.randomUUID();
      const image = form.image || fallbackImage;
      const product: Product = {
        id: slug,
        slug,
        name: form.name,
        collection: "AURA Live",
        category: form.category,
        price: Number(form.price),
        rating: 4.8,
        image,
        gallery: [image],
        colors: ["Black"],
        sizes: ["M"],
        description: "Live product added from the AURA admin dashboard.",
        materials: ["Premium finish"],
        inventory: Number(form.inventory),
        featured: true,
        trending: true
      };

      await upsertProduct(product);
      toast({ title: "Product saved", description: "Refresh products to see Firestore data." });
      setForm({ name: "", price: "", category: "", inventory: "", image: "" });
    } catch (caught) {
      toast({
        title: "Firestore setup needed",
        description: caught instanceof Error ? caught.message : "Enable Firestore Database first."
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="grid min-h-screen place-items-center pt-20">Checking admin access...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center px-4 pt-20 text-center">
        <div className="glass max-w-md rounded-[8px] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Admin locked</p>
          <h1 className="mt-3 font-display text-4xl">Admin access required.</h1>
          <p className="mt-3 text-white/58">
            Log in with {adminEmail} to manage products and orders.
          </p>
          {user?.email ? (
            <div className="mt-5 rounded-[8px] border border-white/10 bg-white/[0.04] p-4 text-left">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">Current account</p>
              <p className="mt-2 break-all text-sm text-white/75">{user.email}</p>
            </div>
          ) : null}
          <Button asChild className="mt-6">
            <Link href="/login?redirect=/admin">Sign in to admin</Link>
          </Button>
          {user ? (
            <Button variant="outline" className="mt-3" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Log out current account
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Admin</p>
          <h1 className="mt-3 font-display text-5xl">Command center</h1>
        </div>
        <Button>
          <PackagePlus className="h-4 w-4" />
          Add product
        </Button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          [BarChart3, "Inventory value", formatPrice(stats.value), source === "firestore" ? "Live Firestore data" : "Demo fallback data"],
          [Boxes, "Inventory", `${stats.inventory} units`, `${stats.lowStock} low-stock alerts`],
          [Upload, "Products", `${products.length} items`, error ?? "Firebase Storage ready after setup"]
        ].map(([Icon, label, value, meta]) => (
          <div key={String(label)} className="glass rounded-[8px] p-6">
            <Icon className="h-6 w-6 text-primary" />
            <p className="mt-5 text-sm uppercase tracking-[0.22em] text-white/45">{String(label)}</p>
            <p className="mt-2 text-3xl font-semibold">{String(value)}</p>
            <p className="mt-2 text-sm text-white/52">{String(meta)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <form className="glass h-fit rounded-[8px] p-6" onSubmit={saveProduct}>
          <p className="text-xl font-semibold">Product editor</p>
          <div className="mt-5 grid gap-4">
            <Input
              placeholder="Product name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              required
            />
            <Input
              placeholder="Price"
              type="number"
              min="1"
              value={form.price}
              onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
              required
            />
            <Input
              placeholder="Category"
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
              required
            />
            <Input
              placeholder="Inventory"
              type="number"
              min="0"
              value={form.inventory}
              onChange={(event) => setForm((current) => ({ ...current, inventory: event.target.value }))}
              required
            />
            <Input
              placeholder="Image URL"
              value={form.image}
              onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
            />
            <Button variant="outline" type="button">
              <Upload className="h-4 w-4" />
              Upload product images
            </Button>
            <Button disabled={saving}>{saving ? "Saving..." : "Save to Firestore"}</Button>
          </div>
        </form>

        <div className="glass rounded-[8px] p-4">
          <div className="grid gap-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.04] p-3">
                <div className="relative h-16 w-14 overflow-hidden rounded-md">
                  <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{product.name}</p>
                  <p className="text-sm text-white/50">
                    {product.category} / {product.inventory} in stock
                  </p>
                </div>
                <p className="hidden font-semibold sm:block">{formatPrice(product.price)}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
