"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { collections, products } from "@/lib/data";
import { useCountdown } from "@/hooks/use-countdown";

const stats = [
  ["48K+", "waitlist members"],
  ["12", "city drops"],
  ["99.7%", "delivery precision"]
];

export default function HomePage() {
  const countdown = useCountdown("2026-06-01T20:00:00+05:30");

  return (
    <div className="overflow-hidden">
      <section className="relative flex min-h-screen items-center overflow-hidden px-4 pt-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=90"
            alt="AURA cinematic fashion campaign"
            fill
            priority
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(94,234,255,.22),transparent_28%),linear-gradient(to_bottom,rgba(5,7,13,.4),#05070d_88%)]" />
          <div className="aurora-grid absolute inset-x-0 bottom-0 h-2/3 animate-grid" />
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4" />
              Drop 05 opens soon
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mt-8 max-w-4xl font-display text-6xl leading-[0.92] tracking-wide text-white sm:text-7xl lg:text-8xl"
            >
              AURA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl"
            >
              Cinematic future commerce for rare performance fashion, AI-curated drops, and luxury movement systems.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.65 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button asChild size="default">
                <Link href="/products">
                  Shop the signal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/collections">Explore collections</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="glass mb-8 rounded-[8px] p-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image
                src={products[0].image}
                alt={products[0].name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Featured artifact</p>
                <h2 className="mt-2 text-3xl font-semibold">{products[0].name}</h2>
              </div>
            </div>
          </motion.div>
        </div>
        <ChevronDown className="absolute bottom-6 left-1/2 z-10 h-6 w-6 -translate-x-1/2 animate-bounce text-white/50" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        {stats.map(([value, label], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="glass rounded-[8px] p-6"
          >
            <p className="font-display text-4xl text-white">{value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/50">{label}</p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured collections"
          title="Designed like hardware. Felt like atmosphere."
          copy="Each collection is built around movement, shadow, reflectivity, and restraint."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative min-h-[420px] overflow-hidden rounded-[8px]"
            >
              <Image src={collection.image} alt={collection.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/15 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Collection</p>
                <h3 className="mt-2 text-3xl font-semibold">{collection.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/64">{collection.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading eyebrow="Trending products" title="Objects with velocity." />
          <Button asChild variant="outline">
            <Link href="/products">View all products</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.filter((product) => product.trending).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass grid gap-10 rounded-[8px] p-6 md:grid-cols-[1fr_.9fr] md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Limited edition</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-white sm:text-6xl">Drop 05: Eclipse Run</h2>
            <p className="mt-5 max-w-xl text-white/60">
              A small-batch system of reflective shells, carbon sneakers, and magnetic accessories releasing in one synchronized wave.
            </p>
            <div className="mt-8 grid grid-cols-4 gap-3">
              {Object.entries(countdown).map(([label, value]) => (
                <div key={label} className="rounded-[8px] border border-white/10 bg-black/25 p-4 text-center">
                  <p className="font-display text-2xl text-white">{String(value).padStart(2, "0")}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {[
              [Zap, "AI recommendation matrix trained on your viewed drops."],
              [ShieldCheck, "Firebase protected identity, wishlist, and profile surfaces."],
              [Sparkles, "Razorpay checkout with animated order completion."]
            ].map(([Icon, text]) => (
              <div key={String(text)} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
                <Icon className="h-6 w-6 text-primary" />
                <p className="mt-4 text-sm leading-6 text-white/65">{String(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["The closest online store I have seen to a cinematic product launch.", "Mira R."],
            ["The motion, product detail, and checkout flow feel genuinely premium.", "Ahaan S."],
            ["AURA makes limited drops feel like an event, not a catalogue.", "Devika N."]
          ].map(([quote, name]) => (
            <div key={name} className="glass rounded-[8px] p-6">
              <p className="text-lg leading-8 text-white/78">&ldquo;{quote}&rdquo;</p>
              <p className="mt-6 text-sm font-semibold text-primary">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Newsletter</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">Enter the private frequency.</h2>
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-full border border-white/10 bg-white/[0.06] p-2 sm:flex-row">
            <input className="min-h-12 flex-1 bg-transparent px-5 text-sm outline-none placeholder:text-white/38" placeholder="you@aura.world" />
            <Button>Join waitlist</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
