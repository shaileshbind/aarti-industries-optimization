import React from "react";
import CampusBanner from "../components/cdmo/CDMOBanner";
import CampusInfo from "../components/home/FrameworkForged";
import GloballyCertified from "../components/GloballyCertified";
import WhoExp from "../components/who-we-are/WhoExp";
import { getData } from "@/_lib/getData.fetch";
import { getPageData } from "@/_lib/pageData.fetch";
import ThePeople from "../components/ThePeople";
import ImageGallery from "../components/ImageGallery";
export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getPageData("/pages/by-slug/campus-opportunities");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  
  const {
    section_one,
    section_two,
    section_three,
    section_five,
    section_six
  } = data;

  return (
    <div>
      {section_one && <CampusBanner data={section_one} />}
      {section_two &&
        <div className="container !pt-20 lg:!pt-50">
          <CampusInfo data={section_two} layout="imgLeftContentRight" />
        </div>
      }
      {section_three && <ImageGallery data={section_three} imgArr={section_three} />}
      {section_six && <ThePeople data={section_six} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_five && <WhoExp data={section_five} />}
    </div>
  );
};

export default Page;
