import { Star } from "lucide-react";

// Sir: replace these 3 with your REAL customer names + words from WhatsApp.
// Just change name, city, text — site updates automatically.
const REVIEWS = [
  {
    name: "Fatima",
    city: "Hyderabad",
    text: "Amla pickle tastes just like my mother's recipe. Fresh, not too oily. My kids finished 500g in one week!",
    item: "Shahi Amla Achar",
  },
  {
    name: "Ramesh",
    city: "Bangalore",
    text: "Ordered Murga pickle for the first time. Reached in 3 days, packing was tight, taste is royal. Highly recommended.",
    item: "Shahi Murga Achar",
  },
  {
    name: "Salma",
    city: "Delhi",
    text: "Nimbu pickle is perfect with dal-chawal. Small fresh batch, you can taste the difference. Will order Mango next.",
    item: "Shahi Nimbu Achar",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
          Customer Love
        </p>
        <h2 className="font-display mt-2 text-center text-3xl font-bold text-forest sm:text-4xl">
          Good Feedback From Our Customers
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] text-cocoa/75">
          Real families across Pan India taste our small-batch pickles — and
          order again.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-3xl border border-gold/40 bg-cream p-6 shadow-sm"
            >
              <div className="flex gap-1" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold text-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-cocoa/85">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-4 border-t border-forest/10 pt-3 text-sm">
                <span className="font-bold text-forest">{r.name}</span>
                <span className="text-cocoa/60"> • {r.city}</span>
                <span className="mt-1 block text-[12px] font-semibold text-terracotta">
                  Ordered: {r.item} • Pan India delivery
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
