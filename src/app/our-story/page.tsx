import HeroBanner from "../components/our-story/HeroBanner";
import AboutCompany from "../components/our-story/AboutCompany";
import TimeLine from "../components/our-story/TimeLine";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import GlobalInnovation from "../components/sections/GlobalInnovation";
import SEO from "../components/SEO";
import OurExp from "../components/our-story/OurExp";
export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getPageData("/pages/by-slug/our-story");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  const { section_one, section_two, section_three, section_four, section_five } = data?.data;
  const seo = data?.seo;

  return (
    <>
      <SEO
        title={seo?.title ?? "Our Story"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/our-story"
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
      {section_one && <HeroBanner data={section_one} />}
      {section_two && <AboutCompany data={section_two} />}
      {section_three && <TimeLine data={section_three} />}
      {section_four && (
        <GlobalInnovation data={section_four} useBulletes={false} />
      )}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
     { section_five && <OurExp data={ section_five}/>}
    </>
  );
}
