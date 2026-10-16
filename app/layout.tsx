import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zohra Zaika | Shahi Homemade Pickles",
  description:
    "Zohra Zaika Homemade Pickles — Shahi Amla, Murga, Nimbu & Mango. Made fresh in small batches on order. Pan India delivery. Order on WhatsApp.",
  keywords: [
    "Zohra Zaika",
    "homemade pickles",
    "amla achar",
    "murga achar",
    "nimbu achar",
    "Indian pickles",
  ],
  openGraph: {
    title: "Zohra Zaika | Shahi Homemade Pickles",
    description:
      "Traditional Indian flavours, lovingly prepared. Order Shahi pickles through WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
