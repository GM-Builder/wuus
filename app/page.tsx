import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/navbar").then((mod) => mod.Navbar));
const Hero = dynamic(() => import("@/components/hero").then((mod) => mod.Hero));
const Services = dynamic(() => import("@/components/services").then((mod) => mod.Services));
const Workflow = dynamic(() => import("@/components/workflow").then((mod) => mod.Workflow));
const Portfolio = dynamic(() => import("@/components/portfolio").then((mod) => mod.Portfolio));
const Testimonial = dynamic(() => import("@/components/testimonial").then((mod) => mod.Testimonial));
const Faq = dynamic(() => import("@/components/faq").then((mod) => mod.Faq));
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer));
const BackToTop = dynamic(() => import("@/components/back-to-top").then((mod) => mod.BackToTop));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Workflow />
      <Portfolio />
      <Testimonial />
      <Faq />
      <Footer />
      <BackToTop />
    </main>
  );
}
