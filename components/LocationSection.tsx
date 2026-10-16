import { MapPin, ExternalLink } from "lucide-react";

// Owner-supplied embed. Keep in one place so it is easy to replace.
export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d484.85700649964235!2d78.50949!3d13.5444206!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1792178004963!5m2!1sen!2sin";

export const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=13.5444206,78.50949";

export default function LocationSection() {
  return (
    <section id="location" className="bg-white scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
          Visit Us
        </p>
        <h2 className="font-display mt-2 text-center text-3xl font-bold text-forest sm:text-4xl">
          Find Zohra Zaika Homemade Pickles
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] text-cocoa/75">
          Zohra Zaika Homemade Pickles — visit our kitchen store. We deliver Pan India.
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-gold/40 shadow-sm">
          <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
            <iframe
              src={MAP_EMBED_SRC}
              title="Map showing Zohra Zaika Homemade Pickles shop location"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-2xl bg-cream px-5 py-4 text-sm sm:flex-row">
          <p className="flex items-start gap-2 text-cocoa/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
            <span>
              Zohra Zaika Homemade Pickles kitchen store — open the map for
              directions. We deliver Pan India, so you can also order on WhatsApp.
            </span>
          </p>
          <a
            href={MAP_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 font-bold text-cream hover:bg-forest-deep"
          >
            Open in Google Maps
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
