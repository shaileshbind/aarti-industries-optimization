import { getData } from "@/_lib/getData.fetch";
import { getPageData } from "@/_lib/pageData.fetch";
import DigitalBanner from "../components/digital-transformation/DigitalBanner";
import TitleCardsContainer from "../components/TitleCardsContainer";
import MiddleBanner from "../components/digital-transformation/MiddleBanner";
import DrivingCrossFunctional from "../components/sections/DrivingCrossFunctional";
import FrameworkForged from "../components/sections/FrameworkForged";
import GloballyCertified from "../components/GloballyCertified";
import ExploreCards from "../components/digital-transformation/ExploreCards";
import SEO from "../components/SEO";

export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getPageData("/pages/by-slug/digital-transformation");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*",
  );

  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
  } = data?.data;
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Digital Transformation"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          "https://www.aarti-industries.com/digital-transformation"
        }
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
      {section_one && <DigitalBanner data={section_one} />}
      {section_two && (
        <div className="py-[72px] lg:py-[140px]">
          <TitleCardsContainer data={section_two} />
        </div>
      )}
      {section_three && <MiddleBanner data={section_three} />}
      {section_four && <DrivingCrossFunctional data={section_four} />}
      {section_five && (
        <div className="my-[72px] lg:my-[140px]">
          <FrameworkForged data={section_five} />
        </div>
      )}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_six && <ExploreCards data={section_six} />}
    </div>
  );
}
