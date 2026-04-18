import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofBand from "@/components/ProofBand";
import Realisations from "@/components/Realisations";
import Method from "@/components/Method";
import Domaines from "@/components/Domaines";
import PricingBridge from "@/components/PricingBridge";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Realisations />
        <ProofBand />
        <Testimonials />
        <Domaines />
        <PricingBridge />
        <Method />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
