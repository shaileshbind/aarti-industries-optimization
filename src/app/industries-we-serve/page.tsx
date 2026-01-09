import GloballyCertified from "../components/GloballyCertified";
import IndustryExp from "../components/industries-we-serve/IndustryExp";
import OurPortfolio from "../components/industries-we-serve/OurPortfolio";
import IndustryBanner from "../components/industries-we-serve/IndustryBanner";
import IndustryInfo from "../components/industries-we-serve/IndustryInfo";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import SEO from "../components/SEO";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/industries-we-serve");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*",
  );
  const { section_one, section_two, section_three, section_four } = data?.data;
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Industries We Serve"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          "https://www.aarti-industries.com/industries-we-serve"
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
      {section_one && <IndustryBanner data={section_one} />}
      {section_two && <IndustryInfo data={section_two} />}
      {section_three && <OurPortfolio data={section_three} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_four && <IndustryExp data={section_four} />}
    </div>
  );
};

export default page;
