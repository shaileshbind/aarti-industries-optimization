import { getPageData } from "@/_lib/pageData.fetch";
import ByUseSection from "./components/home/ByUseSection";
import ContactBanner from "./components/ContactBanner";
import FourtyYears from "./components/home/FourtyYears";
import FrameworkForged from "./components/home/FrameworkForged";
import GlobalPartner from "./components/home/GlobalPartner";
import HomeHero from "./components/home/HomeHero";
import LatestAtAarti from "./components/home/LatestAtAarti";
import SustainableChem from "./components/home/SustainableChem";
import ImageGallery from "./components/ImageGallery";

export const dynamic = "force-dynamic";

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

      {sectionSix && <ImageGallery data={sectionSix} imgArr={sectionSeven} />}

      {sectionEight && <FrameworkForged data={sectionEight} />}

      {sectionNine && <LatestAtAarti data={sectionNine} />}

      {sectionTen && <ContactBanner data={sectionTen} />}
    </div>
  );
}
