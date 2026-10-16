# Product photos — how to replace placeholders

The site currently uses illustrated CSS/SVG placeholders (no external images),
so the build works offline and looks premium out of the box.

To use your own pickle jar photographs:

1. Add your photos to `public/images/`, for example:
   - `public/images/amla.jpg` (Shahi Amla Achar)
   - `public/images/mango.jpg` (Shahi Aam / Mango Achar)
   - `public/images/nimbu.jpg` (Shahi Nimbu Achar)
   - `public/images/hero-jars.jpg` (hero section)
   - `public/images/story.jpg` (Our Story section)

   Use JPG at ~1200px wide, compressed (e.g. Squoosh / TinyPNG).

2. In `components/ProductImage.tsx`, replace the illustrated `<div>` with:

   ```tsx
   import Image from "next/image";
   <Image
     src="/images/amla.jpg"
     alt="Shahi Amla Achar in a glass jar"
     width={800}
     height={600}
     className="h-52 w-full object-cover"
   />
   ```

   Do the same per product (pass image src via the `Product` object if you like).

3. In `components/Hero.tsx` and `components/Story.tsx`, replace the
   illustrated preview blocks with `<Image>` in the same way.

No other code changes are needed. Alt text is already wired for accessibility.
