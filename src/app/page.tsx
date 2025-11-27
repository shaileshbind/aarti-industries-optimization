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
import SEO from "./components/SEO";

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
      <SEO
        title={"Aarti Industries"}
        metaTitle="Aarti Industries Desc"
        metaDescription="Aarti Industries Desc"
        keywords="Aarti Industries, chemical, specialty chemicals"
        canonical="https://example.com/aarti-industries"
        robots="index, follow"
        ogURL="https://example.com/aarti-industries"
        ogImg="https://example.com/images/aarti-industries-logo.png"
        ogTitle="Aarti Industries"
        ogDesc="Aarti Industries Desc"
        twtUrl="https://example.com/aarti-industries"
        twtImg="https://example.com/images/aarti-industries-logo.png"
        twtTitle="Aarti Industries"
        twtDesc="Aarti Industries Desc"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Aarti Industries",
          url: "https://example.com/aarti-industries",
          logo: "https://example.com/images/aarti-industries-logo.png",
        }}
      />
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
