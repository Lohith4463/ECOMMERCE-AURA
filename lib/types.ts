export type Product = {
  id: string;
  name: string;
  slug: string;
  collection: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  gallery: string[];
  colors: string[];
  sizes: string[];
  badge?: string;
  description: string;
  materials: string[];
  inventory: number;
  featured?: boolean;
  trending?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  color: string;
  size: string;
};

export type Order = {
  id: string;
  userId: string;
  total: number;
  status: "pending" | "paid" | "packed" | "shipped" | "delivered";
  createdAt: string;
};
