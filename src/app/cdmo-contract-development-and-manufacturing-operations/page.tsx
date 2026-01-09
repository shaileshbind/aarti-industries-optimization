import CDMOBanner from "../components/cdmo/CDMOBanner";
import CDMODriving from "../components/cdmo/CDMODriving";
import CDMOE2E from "../components/cdmo/CDMOE2E";
import CDMOSafegreen from "../components/cdmo/CDMOSafegreen";
import GloballyCertified from "../components/GloballyCertified";
import CDMOExp from "../components/cdmo/CDMOExp";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import CardsSlider from "../components/sections/CardsSlider";
import GridCardsContainer from "../components/sections/GridCardsContainer";
import SEO from "../components/SEO";

export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getPageData("/pages/by-slug/cdmo");
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
    section_seven,
    section_eight,
  } = data?.data;
  const seo = data?.seo;
  return (
    <div>
      <SEO
        title={seo?.title ?? "CDMO"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          "https://www.aarti-industries.com/cdmo-contract-development-and-manufacturing-operations"
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
      {section_one && <CDMOBanner data={section_one} />}
      {section_two && (
        <GridCardsContainer
          data={section_two}
          className="lg:py-[100px] py-[50px] pt-0"
        />
      )}
      {section_three && <CDMODriving data={section_three} />}
      {section_four && <CDMOE2E data={section_four} />}
      {section_five && <CardsSlider data={section_five} useLink />}
      {section_six && <CDMOSafegreen data={section_six} />}
      {section_seven && (
        <GloballyCertified
          title={section_seven?.title}
          itemsData={globallyCertifiedData}
        />
      )}
      {section_eight && <CDMOExp data={section_eight} />}
    </div>
  );
};

export default Page;
