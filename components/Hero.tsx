import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { WHATSAPP_BASE_URL } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-forest text-cream">
      <div className="jaali-pattern absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-terracotta/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-gold-soft uppercase">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Zohra Zaika Homemade Pickles
          </p>
          <h1 className="font-display mt-5 text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-[3.4rem]">
            Discover the Royal Taste of Homemade Pickles
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
            Traditional Indian flavours, lovingly prepared to bring the taste of
            home to every meal.
          </p>
          <p className="mt-3 text-sm font-medium tracking-wide text-gold-soft">
            Ghar Ka Swad, Shahi Andaaz!
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#pickles"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-[15px] font-bold text-forest transition hover:brightness-105"
            >
              Shop Our Pickles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 bg-white/10 px-6 py-3 text-[15px] font-semibold text-cream transition hover:bg-white/15"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Order on WhatsApp
            </a>
          </div>

          <dl className="mt-8 flex gap-8 text-sm">
            <div>
              <dt className="sr-only">Varieties</dt>
              <dd className="font-display text-2xl font-bold text-gold">4</dd>
              <dd className="text-cream/70">Classic varieties</dd>
            </div>
            <div>
              <dt className="sr-only">Sizes</dt>
              <dd className="font-display text-2xl font-bold text-gold">3</dd>
              <dd className="text-cream/70">Sizes per pickle</dd>
            </div>
            <div>
              <dt className="sr-only">Ordering</dt>
              <dd className="font-display text-2xl font-bold text-gold">1-tap</dd>
              <dd className="text-cream/70">WhatsApp ordering</dd>
            </div>
          </dl>
        </div>

        {/* Visual: original Zohra Zaika pickle photos */}
        <div
          className="relative mx-auto w-full max-w-md"
          role="img"
          aria-label="Original Zohra Zaika homemade pickles - Amla, Murga, Nimbu, Mango"
        >
          <div className="rounded-[2rem] border border-gold/30 bg-gradient-to-br from-[#1e4d36] to-[#0e2419] p-6 shadow-2xl sm:p-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Amla", src: "/images/amla-pickle.png" },
                { label: "Murga", src: "/images/murga-pickle.png" },
                { label: "Nimbu", src: "/images/nimbu-pickle.jpg" },
                { label: "Mango", src: "" },
              ].map((jar) => (
                <div key={jar.label} className="text-center">
                  <div className="relative mx-auto h-28 w-full overflow-hidden rounded-2xl bg-[#faf5e9] ring-2 ring-gold/60 sm:h-32">
                    {jar.src ? (
                      <Image
                        src={jar.src}
                        alt={`Zohra Zaika Shahi ${jar.label} pickle`}
                        fill
                        sizes="120px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <span className="grid h-full place-items-center px-1 text-center text-[10px] leading-tight font-bold text-forest">
                        Fresh batch on order
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[12px] font-bold text-cream">
                    Shahi {jar.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-cream/80">
              {["Small Batch", "Murga", "Amla", "Nimbu", "Mango"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-full border border-gold/30 bg-white/5 px-3 py-1"
                  >
                    {s}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
