import React from "react";
import AartiAdvantageBanner from "../components/aarti-advantage/AartiAdvantageBanner";
import DetailsContainer from "../components/sections/DetailsContainer";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";
import RDAnalyticalExc from "../components/sections/RDAnalyticalExc";
import AilEdge from "../components/aarti-advantage/AilEdge";
import WorksWithPartners from "../components/sections/WorksWithPartners";
import AdvExplore from "../components/aarti-advantage/AdvExplore";
import SEO from "../components/SEO";
import { getPageData } from "@/_lib/pageData.fetch";

export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getPageData("/pages/by-slug/aarti-advantage");

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
  } = data?.data;

  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Aarti Advantage"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/aarti-advantage"}
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

      {section_one && <AartiAdvantageBanner data={section_one} />}

      {section_two && <DetailsContainer data={section_two} />}

      <div>
        <RDAnalyticalExc
          className="lg:!min-w-[0]"
          data={section_three}
          sliderData={section_four}
        />
      </div>

      {section_five && (
        <div className="pt-[180px] pb-[72px] lg:py-[140px]">
          <AilEdge data={section_five} />
        </div>
      )}

      {section_six && (
        <div className="pb-[72px] lg:pb-[140px]">
          <WorksWithPartners data={section_six} className="grid-cols-5" />
        </div>
      )}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_seven && <AdvExplore data={section_seven} />}
    </div>
  );
}
