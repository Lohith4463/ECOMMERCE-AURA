import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "@/firebase/config";
import type { CartItem, Order, Product } from "@/lib/types";

export const productCollection = collection(db, "products");
export const orderCollection = collection(db, "orders");

export async function fetchProductsFromFirestore() {
  const snapshot = await getDocs(productCollection);
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })) as Product[];
}

export async function upsertProduct(product: Product) {
  return setDoc(doc(db, "products", product.id), product, { merge: true });
}

export async function removeProduct(productId: string) {
  return deleteDoc(doc(db, "products", productId));
}

export async function createOrder(order: Omit<Order, "id">) {
  return addDoc(orderCollection, order);
}

export async function fetchUserOrders(userId: string) {
  const snapshot = await getDocs(query(orderCollection, where("userId", "==", userId)));
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })) as Order[];
}

export async function syncUserCart(userId: string, cart: CartItem[]) {
  return updateDoc(doc(db, "users", userId), { cart });
}
