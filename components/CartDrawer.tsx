"use client";

import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { WEIGHT_OPTIONS, formatWeight, getProduct } from "@/lib/products";
import { formatINR } from "@/lib/format";
import { whatsAppUrlForOrder } from "@/lib/whatsapp";

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    updateWeight,
    removeItem,
  } = useCart();

  if (!isCartOpen) return null;

  const orderUrl =
    items.length > 0 ? whatsAppUrlForOrder(items) : undefined;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/45"
      />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-gold/40 px-5 py-4">
          <h2 className="font-display flex items-center gap-2 text-xl font-bold text-forest">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            Your Cart ({count})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-forest/20 text-forest hover:bg-cream-dark"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="cart-scroll flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-display text-2xl font-bold text-forest">
                  Your cart is empty
                </p>
                <p className="mt-2 text-sm text-cocoa/70">
                  Add some Shahi pickles to get started — they’re packed with
                  traditional flavour.
                </p>
                <a
                  href="#pickles"
                  onClick={closeCart}
                  className="mt-5 inline-block rounded-full bg-forest px-6 py-2.5 text-sm font-bold text-cream hover:bg-forest-deep"
                >
                  Continue shopping
                </a>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                const unitPrice = product.prices[item.weight];
                return (
                  <li
                    key={`${item.productId}-${item.weight}`}
                    className="rounded-2xl border border-gold/40 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display font-bold text-forest">
                          {product.name}
                        </p>
                        <p className="text-sm text-cocoa/70">
                          {formatWeight(item.weight)} · {formatINR(unitPrice)}{" "}
                          each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.weight)}
                        aria-label={`Remove ${product.name} ${formatWeight(item.weight)}`}
                        className="grid h-8 w-8 place-items-center rounded-full text-terracotta hover:bg-terracotta/10"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <label className="text-xs font-semibold text-cocoa/70">
                        Weight{" "}
                        <select
                          value={item.weight}
                          onChange={(e) =>
                            updateWeight(
                              item.productId,
                              item.weight,
                              Number(e.target.value) as 250 | 500 | 1000,
                            )
                          }
                          className="ml-1 rounded-lg border border-forest/25 bg-cream px-2 py-1 text-[13px] font-bold text-forest"
                          aria-label={`Weight for ${product.name}`}
                        >
                          {WEIGHT_OPTIONS.map((w) => (
                            <option key={w} value={w}>
                              {formatWeight(w)} — {formatINR(product.prices[w])}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-1 py-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.weight,
                              item.quantity - 1,
                            )
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="grid h-7 w-7 place-items-center rounded-full hover:bg-cream-dark disabled:opacity-40"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span
                          className="min-w-6 text-center text-sm font-bold"
                          aria-live="polite"
                          aria-label={`Quantity ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.weight,
                              item.quantity + 1,
                            )
                          }
                          disabled={item.quantity >= 20}
                          aria-label="Increase quantity"
                          className="grid h-7 w-7 place-items-center rounded-full hover:bg-cream-dark disabled:opacity-40"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="font-display text-lg font-bold text-forest">
                        {formatINR(unitPrice * item.quantity)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gold/40 bg-white px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-cocoa/70">Subtotal</span>
              <span className="font-bold text-cocoa">{formatINR(subtotal)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-forest">
                Total
              </span>
              <span
                className="font-display text-2xl font-bold text-forest"
                aria-live="polite"
              >
                {formatINR(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-cocoa/60">
              Delivery availability and charges will be confirmed separately on
              WhatsApp.
            </p>
            <div className="mt-3 grid gap-2">
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1fa855] px-5 py-3 text-[15px] font-bold text-white transition hover:brightness-95"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Order on WhatsApp
              </a>
              <a
                href="#pickles"
                onClick={closeCart}
                className="text-center rounded-full border border-forest/25 px-5 py-2.5 text-sm font-bold text-forest hover:bg-cream-dark"
              >
                Continue shopping
              </a>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
