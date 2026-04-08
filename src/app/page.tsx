import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofBand from "@/components/ProofBand";
import Problem from "@/components/Problem";
import Method from "@/components/Method";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollReveal>
          <ProofBand />
        </ScrollReveal>
        <ScrollReveal>
          <Problem />
        </ScrollReveal>
        <ScrollReveal>
          <Method />
        </ScrollReveal>
        <ScrollReveal>
          <UseCases />
        </ScrollReveal>
        <ScrollReveal>
          <Pricing />
        </ScrollReveal>
        <ScrollReveal>
          <FinalCTA />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
