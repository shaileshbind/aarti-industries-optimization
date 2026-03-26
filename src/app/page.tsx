import dynamic from "next/dynamic";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import HomeHero from "./components/home/HomeHero";
import SEO from "./components/SEO";

const DetailsContainer = dynamic(() => import("./components/sections/DetailsContainer"));
const GlobalPartner = dynamic(() => import("./components/home/GlobalPartner"));
const HomeSections = dynamic(() => import("./components/home/HomeSections"));
const ByUseSection = dynamic(() => import("./components/home/ByUseSection"));
const ImageGallery = dynamic(() => import("./components/ImageGallery"));
const FrameworkForged = dynamic(() => import("./components/sections/FrameworkForged"));
const LatestAtAarti = dynamic(() => import("./components/home/LatestAtAarti"));
const GloballyCertified = dynamic(() => import("./components/GloballyCertified"));
const HomeExplore = dynamic(() => import("./components/home/HomeExplore"));

export default async function Home() {
  const [data, globallyCertifiedData] = await Promise.all([
    getPageData("/pages/by-slug/home-page"),
    getData("/globally-certified-datas?populate=*"),
  ]);
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
    sectionFiveTitle,
  } = data?.data ?? {};
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
      <HomeSections sustainableChemData={sectionFour} />
      {sectionFive && (
        <ByUseSection data={sectionFive} sectionFiveTitle={sectionFiveTitle} />
      )}
      {sectionSix && <ImageGallery data={sectionSix} imgArr={sectionSeven} />}
      {sectionEight && <FrameworkForged data={sectionEight} />}
      {sectionNine && <LatestAtAarti data={sectionNine} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {sectionTen && <HomeExplore data={sectionTen} />}
    </div>
  );
}
