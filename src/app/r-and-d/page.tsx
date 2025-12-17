import RDHeroBanner from "../components/r-and-d/RDHeroBanner";
import RDInfo from "../components/sections/RDInfo";
import RDSafety from "../components/r-and-d/RDSafety";
import GloballyCertified from "../components/GloballyCertified";
import RDExplore from "../components/r-and-d/RDExplore";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import ScrollableCardWithImage from "../components/ScrollableCardWithImage";
import SEO from "../components/SEO";
import RDSections from "../components/r-and-d/RDSections";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/research-and-development");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
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
    section_nine,
    section_ten,
  } = data?.data;
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Research & Development"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/r-and-d"}
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
      {section_one && <RDHeroBanner data={section_one} />}
      {section_two && <RDInfo data={section_two} />}
      {section_three && <ScrollableCardWithImage data={section_three} />}
      <RDSections
        analyticalExcData={section_four}
        analyticalExcSliderData={section_five}
        diverseChemData={section_six}
        diverseChemData2={section_seven}
      />
      {section_eight && (
        <div className="pb-[22px] md:pb-[140px]">
          <RDSafety data={section_eight} />
        </div>
      )}
      {section_nine && (
        <GloballyCertified
          title={section_nine?.certified?.[0]?.title}
          itemsData={globallyCertifiedData}
        />
      )}
      {section_ten && <RDExplore data={section_ten} />}
    </div>
  );
};

export default page;
