import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import ContactBanner from "../components/ContactBanner";
import ImageGallery from "../components/ImageGallery";
import ScrollableCardWithImage from "../components/ScrollableCardWithImage";
import ComprehensiveCare from "../components/thrive-at-aarti/ComprehensiveCare";
import InvestingInPotential from "../components/thrive-at-aarti/InvestingInPotential";
import ThriveBanner from "../components/thrive-at-aarti/ThriveBanner";
import ThePeople from "../components/ThePeople";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/thrive-at-aarti");
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
  } = data;

  return (
    <div>
      {section_one && <ThriveBanner data={section_one} />}

      {section_two && (
        <div className="py-[74px] lg:py-[112px]">
          <ScrollableCardWithImage data={section_two} />
        </div>
      )}

      {section_three && <InvestingInPotential data={section_three} />}

      {section_four && (
        <div className="pt-[80px] lg:pt-[120px] pb-5">
          <ComprehensiveCare data={section_four} />
        </div>
      )}

      {section_five && <ImageGallery imgArr={section_five} />}

      {section_six && <ThePeople data={section_six} />}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {/* {section_seven && <ContactBanner data={section_seven} />} */}
    </div>
  );
};

export default page;
