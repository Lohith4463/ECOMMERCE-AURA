"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl">Cart</h1>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="glass rounded-[8px] p-10 text-center">
              <p className="text-2xl font-semibold">Your cart is empty.</p>
              <Button asChild className="mt-6">
                <Link href="/products">Explore products</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.color}-${item.size}`} className="glass flex gap-4 rounded-[8px] p-4">
                <div className="relative h-28 w-24 overflow-hidden rounded-md">
                  <Image src={item.product.image} alt={item.product.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="mt-1 text-sm text-white/50">{item.color} / {item.size}</p>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} aria-label="Remove">
                      <Trash2 className="h-5 w-5 text-white/45 hover:text-primary" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-white/10">
                      <button className="p-2" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button className="p-2" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <aside className="glass h-fit rounded-[8px] p-6">
          <p className="text-xl font-semibold">Order summary</p>
          <div className="mt-6 space-y-3 text-sm text-white/58">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Complimentary</span></div>
            <div className="flex justify-between"><span>Estimated tax</span><span>At checkout</span></div>
          </div>
          <div className="mt-6 flex justify-between border-t border-white/10 pt-6 text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Button asChild className="mt-6 w-full">
            <Link href="/checkout">Checkout</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
