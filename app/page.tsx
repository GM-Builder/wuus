import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/navbar').then(mod => mod.Navbar));
const Hero = dynamic(() => import('@/components/hero').then(mod => mod.Hero));
const MarqueeBrands = dynamic(() => import('@/components/marquee-brands').then(mod => mod.MarqueeBrands));
const BentoFeatures = dynamic(() => import('@/components/bento-features').then(mod => mod.BentoFeatures));
const Portfolio = dynamic(() => import('@/components/portfolio').then(mod => mod.Portfolio));
const RoiCalculator = dynamic(() => import('@/components/roi-calculator').then(mod => mod.RoiCalculator));
const WhyWuus = dynamic(() => import('@/components/why-wuus').then(mod => mod.WhyWuus));
const Pricing = dynamic(() => import('@/components/pricing').then(mod => mod.Pricing));
const Testimonial = dynamic(() => import('@/components/testimonial').then(mod => mod.Testimonial));
const Faq = dynamic(() => import('@/components/faq').then(mod => mod.Faq));
const CtaSection = dynamic(() => import('@/components/cta-section').then(mod => mod.CtaSection));
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer));
const BackToTop = dynamic(() => import('@/components/back-to-top').then(mod => mod.BackToTop));

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
