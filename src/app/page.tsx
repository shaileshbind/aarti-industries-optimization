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
import HomeMap from "./components/home/HomeMap";

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
  } = data?.data;
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Aarti Industries"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com"}
        robots={seo?.robots ?? "index, follow"}
        ogURL={seo?.ogURL}
        ogImg={seo?.ogImg?.url}
        ogTitle={seo?.ogTitle}
        ogDesc={seo?.ogDesc}
        twtUrl={seo?.twtUrl}
        twtImg={seo?.twtImg?.url}
        twtTitle={seo?.twtTitle}
        twtDesc={seo?.twtDesc}
        schemaData={seo?.schemaData}
      />
      {sectionOne && <HomeHero data={sectionOne} />}
      {sectionTwo && <DetailsContainer data={sectionTwo} />}
      {sectionThree && <GlobalPartner data={sectionThree} />}
      {sectionFour && <SustainableChem data={sectionFour} />}
      <HomeMap/>
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
