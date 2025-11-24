import { getPageData } from "@/_lib/pageData.fetch";
import ByUseSection from "./components/home/ByUseSection";
import ContactBanner from "./components/ContactBanner";
import FrameworkForged from "./components/sections/FrameworkForged";
import GlobalPartner from "./components/home/GlobalPartner";
import HomeHero from "./components/home/HomeHero";
import LatestAtAarti from "./components/home/LatestAtAarti";
import SustainableChem from "./components/home/SustainableChem";
import ImageGallery from "./components/ImageGallery";
import DetailsContainer from "./components/sections/DetailsContainer";
import GloballyCertified from "./components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPageData("/pages/by-slug/home-page");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

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

      {sectionTwo && <DetailsContainer data={sectionTwo} />}

      {sectionThree && <GlobalPartner data={sectionThree} />}

      {sectionFour && <SustainableChem data={sectionFour} />}

      {sectionFive && <ByUseSection data={sectionFive} />}

      {sectionSix && <ImageGallery data={sectionSix} imgArr={sectionSeven} />}

      {sectionEight && <FrameworkForged data={sectionEight} />}

      {sectionNine && <LatestAtAarti data={sectionNine} />}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {sectionTen && <ContactBanner data={sectionTen} />}
    </div>
  );
}
