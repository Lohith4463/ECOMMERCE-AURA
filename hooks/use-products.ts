"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchProductsFromFirestore } from "@/firebase/firestore";
import { products as demoProducts } from "@/lib/data";
import type { Product } from "@/lib/types";

type ProductSource = "loading" | "firestore" | "demo";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [source, setSource] = useState<ProductSource>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const firestoreProducts = await fetchProductsFromFirestore();
        if (!active) return;

        if (firestoreProducts.length > 0) {
          setProducts(firestoreProducts);
          setSource("firestore");
          setError(null);
          return;
        }

        setProducts(demoProducts);
        setSource("demo");
        setError("Firestore is connected, but the products collection is empty.");
      } catch (caught) {
        if (!active) return;

        setProducts(demoProducts);
        setSource("demo");
        setError(caught instanceof Error ? caught.message : "Firestore is not available yet.");
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );

  return { products, categories, source, error, loading: source === "loading" };
}
