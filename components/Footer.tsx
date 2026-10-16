"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { WHATSAPP_BASE_URL, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { MAP_DIRECTIONS_URL } from "./LocationSection";
import Logo from "./Logo";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // Compute the copyright year on the client so prerendering stays deterministic.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="bg-[#0f2a1e] text-cream/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="[&_span]:!text-cream [&_.font-display]:!text-cream">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Ghar Ka Swad, Shahi Andaaz! Traditional homemade Indian pickles,
            prepared with care.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-bold tracking-wider text-gold uppercase">
            Explore
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { href: "#home", label: "Home" },
              { href: "#pickles", label: "Our Pickles" },
              { href: "#story", label: "Our Story" },
              { href: "#why-us", label: "Why Choose Us" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-gold-soft">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold tracking-wider text-gold uppercase">
            Pickles
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <a href="#pickles" className="hover:text-gold-soft">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wider text-gold uppercase">
            Order
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-cream hover:text-gold-soft"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-soft"
              >
                Open in Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs leading-relaxed text-cream/60 sm:px-6">
          <p>© {year ?? "—"} Zohra Zaika Homemade Pickles. All rights reserved.</p>
          <p className="mt-1">
            Zohra Zaika Homemade Pickles — prices in Indian Rupees. We deliver
            Pan India; delivery charges confirmed on WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
}
