import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import DiwaliCombo from "@/components/DiwaliCombo";
import Story from "@/components/Story";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsSection />
      <DiwaliCombo />
      <Story />
      <WhyChoose />
      <Testimonials />
      <LocationSection />
      <ContactSection />
    </main>
  );
}
