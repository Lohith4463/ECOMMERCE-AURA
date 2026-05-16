"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Rotate3D, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { formatPrice } from "@/lib/utils";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const recommended = products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-[8px] bg-muted"
          >
            <Image
              src={product.gallery[selectedImage]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm backdrop-blur-md">
              <Rotate3D className="h-4 w-4 text-primary" />
              Drag-ready 360 preview effect
            </div>
          </motion.div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.gallery.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelectedImage(index)}
                className="relative aspect-[4/3] overflow-hidden rounded-[8px] border border-white/10"
                aria-label={`View product image ${index + 1}`}
              >
                <Image src={image} alt="" fill sizes="180px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">{product.collection}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-6xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-white/55">{product.rating} verified rating</span>
          </div>
          <p className="mt-6 text-3xl font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-5 text-base leading-8 text-white/62">{product.description}</p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-3 text-sm font-semibold text-white">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((item) => (
                  <Button key={item} variant={color === item ? "default" : "outline"} size="sm" onClick={() => setColor(item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-white">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <Button key={item} variant={size === item ? "default" : "outline"} size="sm" onClick={() => setSize(item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              className="flex-1"
              onClick={() => {
                addItem(product, { color, size });
                toast({ title: "Added with precision", description: `${color} / ${size} is now in cart.` });
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </Button>
            <Button variant="outline" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 grid gap-3">
            {product.materials.map((material) => (
              <div key={material} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 text-sm text-white/65">
                {material}
              </div>
            ))}
          </div>
          <Link href="/products" className="mt-8 inline-block text-sm text-primary hover:text-white">
            Back to products
          </Link>
        </motion.div>
      </div>

      <section className="mt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">AI recommendations</p>
        <h2 className="mt-3 font-display text-4xl">Matched to your current signal.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
