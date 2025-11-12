import React from "react";
import RDHeroBanner from "../components/r-and-d/RDHeroBanner";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import ContactBanner from "../components/ContactBanner";
import ImageGallery from "../components/ImageGallery";
import ScrollableCardWithImage from "../components/ScrollableCardWithImage";
import ComprehensiveCare from "../components/thrive-at-aarti/ComprehensiveCare";
import InvestingInPotential from "../components/thrive-at-aarti/InvestingInPotential";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/research-and-development");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  const data2 = await getPageData("/pages/by-slug/home-page");

  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
    section_seven,
    section_eight,
    section_nine,
    section_ten,
  } = data;

  return (
    <div>
      {section_one && <RDHeroBanner data={section_one} />}

      {section_three && (
        <div className="py-[112px]">
          <ScrollableCardWithImage data={section_three} />
        </div>
      )}

      <InvestingInPotential />

      <div className="pt-[120px] pb-5">
        <ComprehensiveCare />
      </div>

      {data2?.sectionSix && <ImageGallery imgArr={data2?.sectionSeven} />}

      {section_nine && (
        <GloballyCertified
          title={section_nine?.certified?.[0]?.title}
          itemsData={globallyCertifiedData}
        />
      )}

      {data2?.sectionTen && <ContactBanner data={data2?.sectionTen} />}
    </div>
  );
};

export default page;
