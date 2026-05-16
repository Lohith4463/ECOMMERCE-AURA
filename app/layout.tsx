import type { Metadata } from "next";
import "@/app/globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "AURA | Cinematic Future Commerce",
  description: "Luxury futuristic ecommerce for limited drops, kinetic apparel, and AI-curated recommendations.",
  keywords: ["AURA", "luxury ecommerce", "futuristic fashion", "limited drops"],
  openGraph: {
    title: "AURA | Cinematic Future Commerce",
    description: "A premium modern shopping experience inspired by the future of movement.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AppProviders>
          <div className="noise" />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
