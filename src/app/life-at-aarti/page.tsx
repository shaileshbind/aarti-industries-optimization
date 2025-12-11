import React from "react";
import LifeAtBanner from "../components/life-at-aarti/LifeAtBanner";
import LifeAtValues from "../components/life-at-aarti/LifeAtValues";
import LifeAtSections from "../components/life-at-aarti/LifeAtSections";
import AartiNirvana from "../components/life-at-aarti/AartiNirvana";
import GloballyCertified from "../components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import { getPageData } from "@/_lib/pageData.fetch";
import ContactBanner from "../components/ContactBanner";
import AartiWorldLeader from "../components/life-at-aarti/AartiWorldLeader";
import SEO from "../components/SEO";
export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/life-at-aarti");
  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
    section_seven,
   gallery,
  } = data?.data;
  const seo = data?.seo

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
       <SEO
        title={seo?.title ?? "Life At Aarti"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/life-at-aarti"}
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
      {section_one && <LifeAtBanner data={section_one} />}
      {section_two && <LifeAtValues data2={section_two} />}
      <LifeAtSections
        peopleVisionData={section_three}
        aartiEngageData={section_four}
      />
      {section_five && <AartiNirvana data={section_five}  dataImg={gallery}/>}
      {section_six && <AartiWorldLeader data={section_six} />}
      <GloballyCertified
        title="Globally Certified"
        itemsData={globallyCertifiedData}
      />
      {section_seven && <ContactBanner data={section_seven} />}
    </div>
  );
};

export default page;
