"use client";

import { useState } from "react";
import { Check, MessageCircle, ShoppingBag, Zap } from "lucide-react";
import { PRODUCTS, WEIGHT_OPTIONS, formatWeight } from "@/lib/products";
import type { Product, WeightOption } from "@/lib/products";
import { formatINR } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { whatsAppUrlForSingle } from "@/lib/whatsapp";
import ProductImage from "./ProductImage";

function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [weight, setWeight] = useState<WeightOption>(product.baseWeight);
  const [added, setAdded] = useState(false);
  const price = product.prices[weight];

  const handleAdd = () => {
    addItem(product.id, weight, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    addItem(product.id, weight, 1);
    openCart();
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-gold/40 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl">
      <div className="p-4 pb-0">
        <ProductImage product={product} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display flex min-h-[28px] items-center gap-2 text-xl font-bold text-forest">
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-sm border-2 bg-white ${
                product.veg ? "border-green-700" : "border-red-800"
              }`}
              title={product.veg ? "Veg" : "Non-veg"}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  product.veg ? "bg-green-700" : "bg-red-800"
                }`}
              />
            </span>
            <span className="truncate">{product.name}</span>
          </h3>
          <p className="mt-1 line-clamp-3 min-h-[63px] text-sm leading-relaxed text-cocoa/75">
            {product.description}
          </p>
        </div>

        {/* bottom block pinned — quantity, price, buttons align in one line across all cards */}
        <div className="mt-auto flex flex-col gap-3 pt-1">
          <p id={`weight-label-${product.id}`} className="text-xs font-bold tracking-wide text-cocoa/70 uppercase">
            Select quantity
          </p>
          <div
            role="radiogroup"
            aria-labelledby={`weight-label-${product.id}`}
            className="mt-2 grid grid-cols-3 gap-2"
          >
            {WEIGHT_OPTIONS.map((w) => {
              const selected = w === weight;
              return (
                <button
                  key={w}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setWeight(w)}
                  className={`rounded-xl border px-2 py-2 text-center text-sm font-bold transition ${
                    selected
                      ? "border-forest bg-forest text-cream"
                      : "border-forest/20 bg-cream text-cocoa hover:border-forest/50"
                  }`}
                >
                  <span className="block">{formatWeight(w)}</span>
                  <span
                    className={`block text-xs font-semibold ${
                      selected ? "text-gold-soft" : "text-terracotta"
                    }`}
                  >
                    {formatINR(product.prices[w])}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="flex items-baseline gap-2" aria-live="polite">
            <span className="font-display bg-gradient-to-r from-forest to-terracotta bg-clip-text text-3xl font-bold text-transparent">
              {formatINR(price)}
            </span>
            <span className="text-sm font-medium text-cocoa/60">
              for {formatWeight(weight)}
            </span>
          </p>

          <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-forest px-4 py-2.5 text-sm font-bold text-cream transition hover:bg-forest-deep"
              aria-live="polite"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Add to Cart
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gold px-4 py-2.5 text-sm font-bold text-forest transition hover:brightness-105"
            >
              <Zap className="h-4 w-4" aria-hidden="true" /> Buy Now
            </button>
          </div>
          <a
            href={whatsAppUrlForSingle(product.name, weight, price)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#1fa855]/40 px-4 py-2 text-[13px] font-semibold text-[#157a3e] transition hover:bg-[#1fa855]/10"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Ask on WhatsApp — {formatWeight(weight)} · {formatINR(price)}
          </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  return (
    <section id="pickles" className="bg-cream scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
          Our Pickles
        </p>
        <h2 className="font-display mt-2 text-center text-3xl font-bold text-forest sm:text-4xl">
          Shahi Collection
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-cocoa/75">
          Four traditional favourites, made fresh in small batches only after
          you order. Choose 250&nbsp;g, 500&nbsp;g or 1000&nbsp;g — the price
          updates automatically. Prices are in Indian Rupees.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <p className="mt-6 rounded-2xl border border-gold/40 bg-cream-dark/60 px-5 py-3 text-center text-sm text-cocoa/75">
          Prices in Indian Rupees. <strong>We deliver Pan India</strong> —
          delivery charges confirmed on WhatsApp when you order. Made fresh in
          small batches after your order.
        </p>
      </div>
    </section>
  );
}
