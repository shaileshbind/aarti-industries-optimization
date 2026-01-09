import EthicsAndCode from "../components/ethics/EthicsAndCode";
import WhoBanner from "../components/who-we-are/WhoBanner";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import GlobalInnovation from "../components/sections/GlobalInnovation";
import SEO from "../components/SEO";
import SocialExplore from "../components/social-health-and-safety/SocialExplore";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/ethics");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*",
  );
  const { section_one, section_two, section_three, section_four } = data?.data;
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Ethics"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/ethics"}
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
      {section_one && <WhoBanner data={section_one} />}
      {section_two && <EthicsAndCode data={section_two} />}
      {section_three && <GlobalInnovation data={section_three} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_four && <SocialExplore data={section_four} />}
    </div>
  );
};

export default page;
