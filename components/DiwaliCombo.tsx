import { Gift, MessageCircle, Truck } from "lucide-react";
import { WHATSAPP_BASE_URL } from "@/lib/whatsapp";
import { formatINR } from "@/lib/format";

const COMBOS = [
  {
    id: "diwali-chhota",
    name: "Diwali Shahi Combo — Chhota",
    includes: "Amla 250g + Murga 250g + Nimbu 250g + Mango 250g",
    detail: "4 jars, perfect for gifting and family tasting. Fresh small batch on order.",
    price: 449,
  },
  {
    id: "diwali-bada",
    name: "Diwali Shahi Combo — Bada",
    includes: "Amla 500g + Murga 500g + Nimbu 500g + Mango 500g",
    detail: "4 big jars for the full festive month. Packed gift-ready. Pan India delivery.",
    price: 899,
  },
];

function comboUrl(name: string, includes: string, price: number) {
  const msg = [
    "Hello Zohra Zaika!",
    "",
    "I would like to order this Diwali Combo:",
    "",
    `1. ${name}`,
    `${includes} - ${formatINR(price)}`,
    "",
    `Total: ${formatINR(price)}`,
    "",
    "Please confirm availability and delivery details.",
    "Thank you!",
  ].join("\n");
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export default function DiwaliCombo() {
  return (
    <section id="diwali-combo" className="scroll-mt-20 bg-gradient-to-br from-[#1e4d36] via-[#0e2419] to-[#3d1e12]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-center text-xs font-bold tracking-[0.25em] text-gold uppercase">
          🪔 Diwali Special 🪔
        </p>
        <h2 className="font-display mt-2 text-center text-3xl font-bold text-cream sm:text-4xl">
          Diwali Shahi Combo Packs
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] text-cream/80">
          Gift-ready combos with all four pickles. Made fresh in small batches
          after you order. Pan India delivery.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {COMBOS.map((c) => (
            <article
              key={c.id}
              className="rounded-3xl border border-gold/40 bg-cream p-6 shadow-xl sm:p-8"
            >
              <p className="inline-flex items-center gap-1.5 rounded-full bg-terracotta px-3 py-1 text-[11px] font-bold text-white uppercase">
                <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                Diwali Combo
              </p>
              <h3 className="font-display mt-3 text-2xl font-bold text-forest">{c.name}</h3>
              <p className="mt-2 text-sm font-semibold text-cocoa/80">{c.includes}</p>
              <p className="mt-1 text-sm text-cocoa/70">{c.detail}</p>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-forest">
                  {formatINR(c.price)}
                </span>
                <span className="text-sm font-medium text-cocoa/60">combo pack</span>
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-[#157a3e]">
                <Truck className="h-4 w-4" aria-hidden="true" />
                Pan India delivery • Gift packing available
              </p>
              <a
                href={comboUrl(c.name, c.includes, c.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1fa855] px-6 py-3 text-[15px] font-bold text-white transition hover:brightness-95"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Order Combo on WhatsApp
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
