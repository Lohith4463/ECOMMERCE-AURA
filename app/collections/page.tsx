import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { collections } from "@/lib/data";

export default function CollectionsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Collections</p>
      <h1 className="mt-3 font-display text-5xl leading-tight text-white sm:text-7xl">Seasonal systems</h1>
      <div className="mt-12 grid gap-6">
        {collections.map((collection, index) => (
          <article key={collection.slug} className="group relative min-h-[440px] overflow-hidden rounded-[8px]">
            <Image src={collection.image} alt={collection.name} fill priority={index === 0} className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/35 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-end p-6 sm:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">AURA {String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-4xl text-white sm:text-6xl">{collection.name}</h2>
              <p className="mt-4 text-white/62">{collection.description}</p>
              <Button asChild className="mt-7 w-fit">
                <Link href="/products">
                  Shop collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
