import React from "react";
import SocialHealthAndSafetyBanner from "../components/social-health-and-safety/SocialHealthAndSafetyBanner";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import SEO from "@/app/components/SEO";
import WhoCards from "../components/who-we-are/WhoCards";
import OurResponsibility from "../components/social-health-and-safety/OurResponsibility";
import CDMOExp from "../components/cdmo/CDMOExp";
import DrivingEmpowerment from "../components/social-health-and-safety/DrivingEmpowerment";
import GridCardsSocial from "../components/social-health-and-safety/GridCardsSocial";
import EducationDevelopment from "../components/social-health-and-safety/EducationDevelopment";
import ImpactStoriesSlider from "../components/social-health-and-safety/ImpactStoriesSlider";

export const dynamic = "force-dynamic";
const page = async () => {
  const data = await getPageData("/pages/by-slug/social-health-safety");
  // const data = await getPageData("/pages/by-slug/maha-super");
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
const section_nine =[
    {
        "id": 1,
        "title": "Looking for R&D Solutions?",
        "ctaButton": [
            {
                "id": 405,
                "title": "Inquire Now",
                "link": "#"
            }
        ]
    },
    {
        "id": 2,
        "title": "Your CDMO Partner Awaits",
        "ctaButton": [
            {
                "id": 406,
                "title": "Product Portfolio",
                "link": "#"
            },
            {
                "id": 407,
                "title": "Partner with us",
                "link": "#"
            }
        ]
    }
]


  return (
    <div>
      <SEO
        title={seo?.title ?? "Mahasuper"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/mahasuper"}
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
      {section_one && <SocialHealthAndSafetyBanner data={section_one} />}
      {section_two && <OurResponsibility data={section_two} />} 
      {section_three && <WhoCards data={section_three} />}
      {section_four && (
        <DrivingEmpowerment data={section_four} />
      )}

      {section_five && <ImpactStoriesSlider
        data={section_five}
        />}
       {section_six && <GridCardsSocial data={section_six} />}
      {section_seven && (
        <div className="mb-[72px] lg:mb-[140px] mt-[20px]">
          <EducationDevelopment data={section_seven} />
        </div>
      )} 
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_nine && <CDMOExp data={section_nine} />}
    </div>
  );
};

export default page;
