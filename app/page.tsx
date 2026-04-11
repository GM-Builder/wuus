import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MarqueeBrands } from "@/components/marquee-brands";
import { BentoFeatures } from "@/components/bento-features";
import { Portfolio } from "@/components/portfolio";
import { RoiCalculator } from "@/components/roi-calculator";
import { WhyWuus } from "@/components/why-wuus";
import { Pricing } from "@/components/pricing";
import { Testimonial } from "@/components/testimonial";
import { Faq } from "@/components/faq";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

import { BackToTop } from "@/components/back-to-top";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Navbar />
      <Hero />
      <MarqueeBrands />
      <BentoFeatures />
      <Portfolio />
      <RoiCalculator />
      <WhyWuus />
      <Pricing />
      <Testimonial />
      <Faq />
      <CtaSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
