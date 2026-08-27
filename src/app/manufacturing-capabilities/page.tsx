import { getPageData } from "@/_lib/pageData.fetch";
import ManufacturingBanner from "../components/manufacturing-capabilities/ManufacturingBanner";
import DetailsContainer from "../components/sections/DetailsContainer";
import ScaleUpEngine from "../components/manufacturing-capabilities/ScaleUpEngine";
import WhatSets from "../components/manufacturing-capabilities/WhatSets";
import GlobalInnovation from "../components/sections/GlobalInnovation";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";
import Explore from "../components/manufacturing-capabilities/Explore";
import SEO from "../components/SEO";

export default async function page() {
  const [data, globallyCertifiedData] = await Promise.all([
    getPageData("/pages/by-slug/manufacturing-capabilities"),
    getData("/globally-certified-datas?populate=*"),
  ]);

  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_seven,
  } = data?.data ?? {};
  const seo = data?.seo;
  return (
    <div>
      <SEO
        title={seo?.title ?? "Manufacturing Capabilities"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          "https://www.aarti-industries.com/manufacturing-capabilities"
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
      {section_one && <ManufacturingBanner data={section_one} />}
      {section_two && (
        <DetailsContainer data={section_two} showBottomLine={false} />
      )}
      {section_three && (
        <div className="pt-5 lg:pt-[40px] pb-[72px] lg:pb-[140px]">
          <ScaleUpEngine data={section_three} />
        </div>
      )}
      {section_four && <WhatSets data={section_four} />}
      {section_five && <GlobalInnovation data={section_five} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_seven && <Explore data={section_seven} />}
    </div>
  );
}
