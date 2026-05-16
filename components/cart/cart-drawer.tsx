"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            aria-label="Close cart"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#060912]/95 p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Cart</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">Your orbit</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCart} aria-label="Close cart">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-8 flex-1 space-y-4 overflow-auto">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="font-display text-2xl text-white">Nothing locked in yet.</p>
                    <p className="mt-2 text-sm text-white/55">Explore a drop and bring something rare home.</p>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.color}-${item.size}`} className="glass flex gap-4 rounded-[8px] p-3">
                    <div className="relative h-24 w-20 overflow-hidden rounded-md bg-muted">
                      <Image src={item.product.image} alt={item.product.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-white">{item.product.name}</p>
                          <p className="mt-1 text-xs text-white/50">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="text-white/45 hover:text-white" aria-label="Remove item">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-white/10">
                          <button className="p-2" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease quantity">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button className="p-2" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase quantity">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-semibold text-white">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-white/10 pt-5">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Button asChild className="mt-5 w-full" size="default">
                <Link href="/checkout" onClick={closeCart}>
                  Checkout
                </Link>
              </Button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
