import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/infield/Navbar";
import { Hero } from "../components/infield/Hero";
import { BenefitStrip } from "../components/infield/BenefitStrip";
import { Problem } from "../components/infield/Problem";
import { Solution } from "../components/infield/Solution";
import { FeaturesGrid } from "../components/infield/FeaturesGrid";
import { Timeline } from "../components/infield/Timeline";
import { ProofSection } from "../components/infield/ProofSection";
import { Testimonial } from "../components/infield/Testimonial";
import { Industries } from "../components/infield/Industries";
import { GetStarted } from "../components/infield/GetStarted";
import { FAQ } from "../components/infield/FAQ";
import { Contact } from "../components/infield/Contact";
import { Footer } from "../components/infield/Footer";
import { FloatingElements } from "../components/infield/FloatingElements";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Fresh Start" },
      { name: "description", content: "A simple page for a fresh start." },
      { property: "og:title", content: "A Fresh Start" },
      { property: "og:description", content: "A simple page for a fresh start." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <BenefitStrip />
        <Problem />
        <Solution />
        <FeaturesGrid />
        <Timeline />
        <ProofSection />
        <Testimonial />
        <Industries />
        <GetStarted />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}

