"use client";

import { useState } from "react";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { WHATSAPP_BASE_URL } from "@/lib/whatsapp";
import Logo from "./Logo";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#pickles", label: "Our Pickles" },
  { href: "#story", label: "Our Story" },
  { href: "#why-us", label: "Why Choose Us" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { count, openCart, lastAddedAt } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/40 bg-cream/95 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        <Logo />

        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold text-cocoa/80 transition hover:text-forest"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-[#1fa855] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream transition hover:bg-forest-deep"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            <span
              key={lastAddedAt ?? 0}
              aria-live="polite"
              className="animate-fade-up grid min-h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-xs font-bold text-forest"
            >
              {count}
            </span>
          </button>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-forest/20 text-forest lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-gold/30 bg-cream px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-[15px] font-semibold text-cocoa transition hover:bg-cream-dark hover:text-forest"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#1fa855] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Order on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
