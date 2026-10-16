import { ChefHat, MessageCircle, LayoutGrid, Soup } from "lucide-react";

const FEATURES = [
  {
    icon: Soup,
    title: "Traditional Indian Flavours",
    text: "Classic amla, murga, nimbu and mango recipes inspired by homemade Indian cooking.",
  },
  {
    icon: ChefHat,
    title: "Fresh Small Batches on Order",
    text: "No old stock. We prepare your pickle fresh in a small batch only after you order on WhatsApp.",
  },
  {
    icon: LayoutGrid,
    title: "A Variety of Classic Pickles",
    text: "Four much-loved varieties — Amla, Murga, Nimbu and Mango — each in 250 g, 500 g and 1000 g packs.",
  },
  {
    icon: MessageCircle,
    title: "Easy WhatsApp Ordering",
    text: "Add to cart and confirm your order in one tap — no accounts or payments online.",
  },
];

export default function WhyChoose() {
  return (
    <section id="why-us" className="bg-cream-dark/40 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
          Why Choose Us
        </p>
        <h2 className="font-display mt-2 text-center text-3xl font-bold text-forest sm:text-4xl">
          Why Choose Zohra Zaika
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-gold/40 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest text-gold">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-forest">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa/75">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
