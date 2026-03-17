import SusBanner from "../components/sustainability-overview/SusBanner";
import { getData } from "@/_lib/getData.fetch";
import SusCore from "../components/sustainability-overview/SusCore";
import AILRoadmap from "../components/sustainability-overview/AILRoadmap";
import SustainabilityOverviewSections from "../components/sustainability-overview/SustainabilityOverviewSections";
import { getPageData } from "@/_lib/pageData.fetch";
import SEO from "../components/SEO";

const page = async () => {
  const [data, globallyCertifiedData] = await Promise.all([
    getPageData("/pages/by-slug/sustainable-overview"),
    getData("/globally-certified-datas?populate=*"),
  ]);
  const { section_one, section_two, section_three, section_four } = data?.data;
  const seo = data?.seo;

  return (
    <>
      <SEO
        title={seo?.title ?? "Sustainability Overview"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          "https://www.aarti-industries.com/sustainability-overview"
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
      <div className="overflow-hidden w-full">
        <SusBanner data={section_one} />
        <SusCore data={section_two} />
        <AILRoadmap data={section_three} />
        <SustainabilityOverviewSections
          sectionFour={section_four}
          globallyCertifiedData={globallyCertifiedData}
        />
      </div>
    </>
  );
};

export default page;
