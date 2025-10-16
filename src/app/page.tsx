import { getPageData } from "@/_lib/pageData.fetch";
import ByUseSection from "./components/home/ByUseSection";
import ContactBanner from "./components/home/ContactBanner";
import FosteringSafe from "./components/home/FosteringSafe";
import FourtyYears from "./components/home/FourtyYears";
import FrameworkForged from "./components/home/FrameworkForged";
import GlobalPartner from "./components/home/GlobalPartner";
import HomeHero from "./components/home/HomeHero";
import LatestAtAarti from "./components/home/LatestAtAarti";
import SustainableChem from "./components/home/SustainableChem";

export default async function Home() {
  const data = await getPageData("/pages/by-slug/home-page");

  const {
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour,
    sectionFive,
    sectionSix,
    sectionSeven,
    sectionEight,
    sectionNine,
    sectionTen,
  } = data;

  return (
    <div>
      {sectionOne && <HomeHero data={sectionOne} />}

      {sectionTwo && <FourtyYears data={sectionTwo} />}

      {sectionThree && <GlobalPartner data={sectionThree} />}

      {sectionFour && <SustainableChem data={sectionFour} />}

      {sectionFive && <ByUseSection data={sectionFive} />}

      {sectionSix && <FosteringSafe data={sectionSix} />}

      {sectionSeven && <FrameworkForged data={sectionSeven} />}

      {sectionEight && <LatestAtAarti data={sectionEight} />}

      {sectionNine && <ContactBanner data={sectionNine} />}

      {sectionTen && <ContactBanner data={sectionTen} />}
    </div>
  );
}
