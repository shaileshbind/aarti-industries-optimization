"use client";
import ByUseSection from "./components/home/ByUseSection";
import ContactBanner from "./components/home/ContactBanner";
import FosteringSafe from "./components/home/FosteringSafe";
import FourtyYears from "./components/home/FourtyYears";
import FrameworkForged from "./components/home/FrameworkForged";
import GlobalPartner from "./components/home/GlobalPartner";
import HomeHero from "./components/home/HomeHero";
import LatestAtAarti from "./components/home/LatestAtAarti";
import SustainableChem from "./components/home/SustainableChem";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <FourtyYears />
      <GlobalPartner />
      <SustainableChem/>
      <ByUseSection />
      <FosteringSafe />
      <FrameworkForged />
      <LatestAtAarti />
      <ContactBanner />
    </div>
  );
}
