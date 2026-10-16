import { HeartHandshake } from "lucide-react";
import Image from "next/image";

export default function Story() {
  return (
    <section id="story" className="bg-white scroll-mt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold/40 via-cream-dark to-terracotta/30 p-8"
          role="img"
          aria-label="Zohra Zaika homemade pickles with brand logo"
        >
          <div className="jaali-pattern absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-forest/10">
            <div className="relative h-64 w-full">
              <Image
                src="/logo.png"
                alt="Zohra Zaika Homemade Pickles brand"
                fill
                sizes="500px"
                className="object-contain p-4"
              />
            </div>
          </div>
          <div className="relative mt-4 rounded-2xl bg-forest p-6 text-cream shadow-xl">
            <p className="font-display text-lg font-bold text-gold">
              Ghar Ka Swad, Shahi Andaaz!
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">
              Shahi Amla, Shahi Murga, Shahi Nimbu and Shahi Mango — four jars, one
              promise: the familiar taste of home.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold">
              {["Amla", "Murga", "Nimbu", "Mango"].map((n) => (
                <span
                  key={n}
                  className="rounded-xl bg-white/10 px-2 py-2 ring-1 ring-gold/40"
                >
                  Shahi
                  <br />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            Our Story
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-balance text-forest sm:text-4xl">
            The Taste of Tradition, Made with Love
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-cocoa/80">
            <p>
              At Zohra Zaika, we celebrate the timeless flavours of Indian
              homemade pickles. Our Shahi Amla, Shahi Murga, Shahi Nimbu and Shahi Mango
              pickles bring traditional taste and warmth to your everyday
              meals.
            </p>
            <p>
              Every jar is inspired by the flavours we grew up loving and the
              joy of sharing good food with family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
