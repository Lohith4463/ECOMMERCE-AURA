import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "aura-01",
    name: "AURA Zero Jacket",
    slug: "aura-zero-jacket",
    collection: "Zero Gravity",
    category: "Outerwear",
    price: 24999,
    originalPrice: 29999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=90"
    ],
    colors: ["Graphite", "Ion Blue", "Solar White"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Limited Drop",
    description: "A sculpted performance jacket with thermal mesh, adaptive vents, and a weightless matte shell.",
    materials: ["Aero-knit lining", "Recycled nylon shell", "Magnetic cuff system"],
    inventory: 18,
    featured: true,
    trending: true
  },
  {
    id: "aura-02",
    name: "Pulse Runner X",
    slug: "pulse-runner-x",
    collection: "Pulse",
    category: "Footwear",
    price: 18999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=90"
    ],
    colors: ["Voltage Red", "Carbon", "Mist"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    badge: "Trending",
    description: "A responsive sneaker engineered for city speed, with a luminous heel cage and carbon foam stack.",
    materials: ["Kinetic foam", "Woven mono-mesh", "Carbon-plated shank"],
    inventory: 42,
    featured: true,
    trending: true
  },
  {
    id: "aura-03",
    name: "Halo Utility Vest",
    slug: "halo-utility-vest",
    collection: "Halo",
    category: "Utility",
    price: 15999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506629905607-d9c297d455f7?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1506629905607-d9c297d455f7?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1200&q=90"
    ],
    colors: ["Obsidian", "Moon", "Sage"],
    sizes: ["S", "M", "L", "XL"],
    description: "A modular vest with low-profile storage, water resistance, and clean architectural lines.",
    materials: ["Ripstop shell", "Bonded zips", "Micro-fleece collar"],
    inventory: 26,
    featured: true
  },
  {
    id: "aura-04",
    name: "Signal Layer Tee",
    slug: "signal-layer-tee",
    collection: "Signal",
    category: "Essentials",
    price: 6999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=90"
    ],
    colors: ["Ink", "Ice", "Neon Lime"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "AI Pick",
    description: "A heavyweight tee with a structured drape, reflective print, and cooling touch finish.",
    materials: ["Organic cotton", "Cool-touch modal", "Reflective ink"],
    inventory: 81,
    trending: true
  },
  {
    id: "aura-05",
    name: "Orbit Cargo Pant",
    slug: "orbit-cargo-pant",
    collection: "Orbit",
    category: "Bottoms",
    price: 13999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=90"
    ],
    colors: ["Void", "Clay", "Titanium"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Precision cargo trousers with articulated knees, concealed pockets, and a technical taper.",
    materials: ["Stretch twill", "Laser-cut panels", "Water-repellent finish"],
    inventory: 34,
    trending: true
  },
  {
    id: "aura-06",
    name: "Nova Crossbody",
    slug: "nova-crossbody",
    collection: "Nova",
    category: "Accessories",
    price: 11999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=90"
    ],
    colors: ["Black Glass", "Chrome", "Ultraviolet"],
    sizes: ["OS"],
    badge: "Drop 05",
    description: "A compact daily carry with tech sleeves, aerospace buckles, and a sculpted weatherproof shell.",
    materials: ["Vegan leather", "Aluminum hardware", "Recycled lining"],
    inventory: 22,
    featured: true
  }
];

export const collections = [
  {
    name: "Zero Gravity",
    slug: "zero-gravity",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=90",
    description: "Weightless outerwear and high-altitude layers."
  },
  {
    name: "Pulse",
    slug: "pulse",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1400&q=90",
    description: "Performance footwear built for kinetic city movement."
  },
  {
    name: "Halo",
    slug: "halo",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=90",
    description: "Utility silhouettes with luminous detail systems."
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
