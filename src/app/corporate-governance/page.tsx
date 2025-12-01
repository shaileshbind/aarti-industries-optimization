import React from "react";
import OurPhilosophy from "../components/corporateGovernance/OurPhilosophy";
import CorporateBanner from "../components/corporateGovernance/CorporateBanner";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import OurCodeAndPolicies from "../components/corporateGovernance/OurCodeAndPolicies";
import MeetMinds from "../components/sections/MeetMinds";
import ContactBanner from "../components/ContactBanner";
import DirectorsNcommittees from "../components/corporateGovernance/DirectorsNcommittees";
import SEO from "../components/SEO";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/corporate-governance");
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
  const seo = data?.seo
  return (
    <div>
       <SEO
        title={seo?.title ?? "Corporate Governance"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/corporate-governance"}
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
      {section_one && <CorporateBanner data={section_one} />}
      {section_two && <OurPhilosophy data={section_two} />}
      {section_three && <OurCodeAndPolicies data={section_three} />}
      {section_four && (
        <div className="mt-[72px] lg:mt-[120px]">
          <MeetMinds data={section_four} />
        </div>
      )}
      {section_five && <ContactBanner data={section_five} />}
      {section_six && <DirectorsNcommittees data={section_six} />}
      <section className="pb-[72px] lg:pb-30 w-full">
        {section_seven && <ContactBanner data={section_seven} />}
      </section>
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </div>
  );
};

export default page;
