import Image from "next/image";
import type { Product } from "@/lib/products";

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-[4px] border-2 bg-white shadow-sm ${
        veg ? "border-green-700" : "border-red-800"
      }`}
      title={veg ? "Veg" : "Non-veg"}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          veg ? "bg-green-700" : "bg-red-800"
        }`}
      />
    </span>
  );
}

export default function ProductImage({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-forest/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-gold/60">
      {/* Colorful festive stage — smooth zoom on hover, full jar always fits */}
      <div
        className="group relative aspect-[3/4] w-full overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 30%, #fffdf6 0%, #faf0d7 45%, ${product.accent}26 100%)`,
        }}
      >
        {/* decorative sparkles */}
        <span className="absolute top-6 left-6 h-10 w-10 rounded-full bg-white/50 blur-sm" aria-hidden="true" />
        <span className="absolute right-8 bottom-16 h-6 w-6 rounded-full bg-gold/30 blur-[1px]" aria-hidden="true" />
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} - original Zohra Zaika homemade pickle`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-contain object-center p-5 drop-shadow-[0_18px_20px_rgba(0,0,0,0.28)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1"
            priority={false}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center transition-transform duration-700 group-hover:scale-105">
            <span
              className="font-display grid h-20 w-20 place-items-center rounded-full text-3xl font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${product.accent}, #3d1e12)` }}
            >
              {product.shortName[0]}
            </span>
            <p className="text-sm font-bold text-forest">Shahi {product.shortName}</p>
            <p className="max-w-[220px] rounded-full bg-forest px-3 py-1 text-[11px] leading-snug font-bold text-cream">
              Photo coming soon • Fresh batch on order
            </p>
          </div>
        )}
        {/* floating ribbon, never covering jar centre */}
        <span className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-forest/90 px-3 py-1 text-[10px] font-bold tracking-[0.14em] whitespace-nowrap text-gold uppercase shadow-lg backdrop-blur">
          ✨ Homemade ✨
        </span>
      </div>
      {/* compact one-line label bar — same height for all 4 boxes */}
      <div className="flex h-[44px] items-center justify-between gap-2 border-t border-forest/10 bg-gradient-to-r from-white via-[#fffaf0] to-white px-3">
        <span className="flex min-w-0 items-center gap-1.5 text-[12px] font-bold text-forest">
          <VegMark veg={product.veg} />
          <span className="truncate">Shahi {product.shortName}</span>
        </span>
        <span
          className="shrink-0 truncate rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow"
          style={{ background: `linear-gradient(135deg, ${product.accent}, #3d1e12)` }}
          title={product.tagline}
        >
          {product.tagline}
        </span>
      </div>
    </div>
  );
}
