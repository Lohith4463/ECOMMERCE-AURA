"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { formatPrice } from "@/lib/utils";
import { loadRazorpayScript } from "@/utils/razorpay";

export default function CheckoutPage() {
  const { subtotal, items, clearCart } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function pay() {
    setLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setLoading(false);
      toast({ title: "Payment script blocked", description: "Check your network and try again." });
      return;
    }

    try {
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: subtotal })
      });
      const order = await response.json();

      if (!response.ok) {
        throw new Error(order.error);
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout did not initialize.");
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AURA",
        description: "AURA limited drop checkout",
        order_id: order.id,
        handler: () => {
          setSuccess(true);
          clearCart();
          toast({ title: "Order confirmed", description: "Your AURA drop is now reserved." });
        },
        theme: { color: "#66f1ff" }
      });

      razorpay.open();
    } catch (error) {
      toast({
        title: "Payment not completed",
        description: error instanceof Error ? error.message : "Add valid Razorpay keys to enable payments."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl">Checkout</h1>
      {success ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass mt-10 rounded-[8px] p-12 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
          <h2 className="mt-6 font-display text-4xl">Order locked.</h2>
          <p className="mt-3 text-white/58">A confirmation will appear in your profile once Firebase order sync is connected.</p>
        </motion.div>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
          <form className="glass grid gap-4 rounded-[8px] p-6">
            <p className="text-xl font-semibold">Delivery address</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="First name" />
              <Input placeholder="Last name" />
            </div>
            <Input placeholder="Email" type="email" />
            <Input placeholder="Street address" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input placeholder="City" />
              <Input placeholder="State" />
              <Input placeholder="PIN code" />
            </div>
          </form>
          <aside className="glass h-fit rounded-[8px] p-6">
            <p className="text-xl font-semibold">Payment</p>
            <div className="mt-5 space-y-3 text-sm text-white/58">
              <div className="flex justify-between"><span>Items</span><span>{items.length}</span></div>
              <div className="flex justify-between"><span>Total</span><span>{formatPrice(subtotal)}</span></div>
            </div>
            <Button className="mt-6 w-full" disabled={loading || subtotal === 0} onClick={pay}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Pay with Razorpay
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
