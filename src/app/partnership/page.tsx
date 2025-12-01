import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import PartnershipBanner from "../components/partnership/PartnershipBanner";
import PartneshipExplore from "../components/partnership/PartnershipExplore";
import CardsSlider from "../components/sections/CardsSlider";
import GridCardsContainer from "../components/sections/GridCardsContainer";
import ParallaxCardSection from "../components/partnership/ParallaxCardSection";
import WhyAarti from "../components/partnership/WhyAarti";
import WorksWithPartners from "../components/partnership/WorksWithPartners";
import SEO from "../components/SEO";
export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getPageData("/pages/by-slug/partnership");
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
  } = data?.data;
  const seo = data?.seo;

  return (
    <div>
       <SEO
        title={seo?.title ?? "Partnership"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/partnership"}
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
      {section_one && <PartnershipBanner data={section_one} />}
      <ParallaxCardSection
        section_two={section_two}
        section_three={section_three}
      />
      {section_four && (
        <GridCardsContainer
          data={section_four}
          headingClassName="!text-[28px] md:!text-[36px] lg:!text-[44px]"
        />
      )}
      {section_five && <WhyAarti data={section_five} />}
      {section_six && <WorksWithPartners data={section_six} />}
      {section_seven && (
        <CardsSlider
          data={section_seven}
          headingClassName="text-[24px] md:text-[30px] xl:text-[36px]"
          className="!mt-[0]"
        />
      )}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_eight && <PartneshipExplore data={section_eight} />}
    </div>
  );
};

export default Page;
