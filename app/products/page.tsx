"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/use-products";

export default function ProductsPage() {
  const { products, categories, source, error } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const matchesQuery = `${product.name} ${product.collection} ${product.category}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === "All" || product.category === category;
        return matchesQuery && matchesCategory;
      }),
    [category, products, query]
  );

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Products</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-white sm:text-7xl">Signal catalogue</h1>
        <p className="mt-4 max-w-2xl text-white/58">Search, filter, and lock onto limited objects engineered for modern motion.</p>
        {source === "demo" ? (
          <div className="mt-5 rounded-[8px] border border-primary/20 bg-primary/10 p-4 text-sm text-white/70">
            Showing demo products. {error ?? "Enable Firestore and add products to use live data."}
          </div>
        ) : null}
      </motion.div>

      <div className="sticky top-20 z-30 mt-10 rounded-[8px] border border-white/10 bg-black/55 p-3 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search apparel, drops, collections" className="pl-11" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Button key={item} variant={category === item ? "default" : "outline"} size="sm" onClick={() => setCategory(item)}>
                {item === "All" ? <Filter className="h-4 w-4" /> : null}
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="glass mt-10 rounded-[8px] p-10 text-center">
          <p className="font-display text-3xl">No signal found.</p>
          <p className="mt-3 text-white/58">Try a different category or search phrase.</p>
        </div>
      )}
    </div>
  );
}
