"use client";
import ByUseSection from "./components/home/ByUseSection";
import ContactBanner from "./components/home/ContactBanner";
import FosteringSafe from "./components/home/FosteringSafe";
import FourtyYears from "./components/home/FourtyYears";
import FrameworkForged from "./components/home/FrameworkForged";
import GlobalPartner from "./components/home/GlobalPartner";
import HomeHero from "./components/home/HomeHero";
import LatestAtAarti from "./components/home/LatestAtAarti";

export default function Home() {
  return (
    <div>
      <div>
        <HomeHero />
      </div>
      <div className="w-full my-[100px]">
        <FourtyYears />
      </div>
      <div className="container mx-auto my-[100px]">
        <GlobalPartner />
      </div>
      <div>sustainable chem + gsap</div>
      <div>
        <ByUseSection />
      </div>
      <div className="w-full my-[100px]">
        <FosteringSafe />
      </div>
      <div>
        <FrameworkForged />
      </div>
      <div className="w-full my-[100px]">
        <LatestAtAarti />
      </div>
      <div className="container">
        <ContactBanner />
      </div>
    </div>
  );
}
