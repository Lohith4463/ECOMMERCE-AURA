"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05, duration: 0.55 }}
      className="group relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.045]"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-black/10" />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {product.badge ?? product.collection}
          </div>
          <div className="absolute inset-x-5 bottom-5 translate-y-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="h-1.5 rounded-full bg-white/15">
              <div className="h-full w-2/3 rounded-full bg-primary shadow-glow" />
            </div>
            <p className="mt-2 text-xs text-white/60">360 preview ready</p>
          </div>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">{product.category}</p>
            <Link href={`/products/${product.slug}`}>
              <h3 className="mt-2 text-lg font-semibold text-white">{product.name}</h3>
            </Link>
          </div>
          <button className="rounded-full border border-white/10 p-2 text-white/60 transition hover:border-primary/60 hover:text-primary" aria-label="Add to wishlist">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-semibold text-white">{formatPrice(product.price)}</p>
          <Button
            size="sm"
            onClick={() => {
              addItem(product);
              toast({ title: "Added to cart", description: `${product.name} is waiting in your bag.` });
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
