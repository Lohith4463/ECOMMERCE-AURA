import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/35">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl tracking-[0.28em]">AURA</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/58">
            Future-built apparel, accessories, and drops for movement, precision, and quiet luxury.
          </p>
        </div>
        {[
          ["Shop", "Products", "Collections", "Limited Drops"],
          ["Account", "Profile", "Cart", "Checkout"],
          ["Company", "About", "Journal", "Support"]
        ].map((group) => (
          <div key={group[0]}>
            <p className="text-sm font-semibold text-white">{group[0]}</p>
            <div className="mt-4 grid gap-3 text-sm text-white/55">
              {group.slice(1).map((item) => (
                <Link key={item} href="#" className="hover:text-white">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
