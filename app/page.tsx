import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/navbar').then(mod => mod.Navbar));
const Hero = dynamic(() => import('@/components/hero').then(mod => mod.Hero));
const MarqueeBrands = dynamic(() => import('@/components/marquee-brands').then(mod => mod.MarqueeBrands));
// const BentoFeatures = dynamic(() => import('@/components/bento-features').then(mod => mod.BentoFeatures));
// const TechAuthority = dynamic(() => import('@/components/tech-authority').then(mod => mod.TechAuthority));
const Storytelling = dynamic(() => import('@/components/storytelling').then(mod => mod.Storytelling));
// const RoiCalculator = dynamic(() => import('@/components/roi-calculator').then(mod => mod.RoiCalculator));
const Services = dynamic(() => import('@/components/services').then(mod => mod.Services));
const Portfolio = dynamic(() => import('@/components/portfolio').then(mod => mod.Portfolio));
const AIBuilderSection = dynamic(() => import('@/components/ai-builder-section').then(mod => mod.AIBuilderSection));
const Workflow = dynamic(() => import('@/components/workflow').then(mod => mod.Workflow));
const WhyWuus = dynamic(() => import('@/components/why-wuus').then(mod => mod.WhyWuus));
const Faq = dynamic(() => import('@/components/faq').then(mod => mod.Faq));
// const Testimonial = dynamic(() => import('@/components/testimonial').then(mod => mod.Testimonial));
// const Pricing = dynamic(() => import('@/components/pricing').then(mod => mod.Pricing));
const CtaSection = dynamic(() => import('@/components/cta-section').then(mod => mod.CtaSection));
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer));
const BackToTop = dynamic(() => import('@/components/back-to-top').then(mod => mod.BackToTop));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Navbar />
      <Hero />
      <MarqueeBrands />
      <Services />
      <Portfolio />
      <AIBuilderSection />
      {/* <BentoFeatures /> */}
      <Storytelling />
      {/* <RoiCalculator /> */}
      <WhyWuus />
      <Workflow />
      {/* <TechAuthority /> */}
      <Faq />
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      <CtaSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
