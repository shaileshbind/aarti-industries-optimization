import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import { getPageData } from "@/_lib/pageData.fetch";
import ThePeople from "../components/ThePeople";
import ImageGallery from "../components/ImageGallery";
import CampusBanner from "../components/campus/CampusBanner";
import CampusExp from "../components/campus/CampusExp";
import CampusFlagship from "../components/campus/CampusFlagship";
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
    section_four,
    section_five,
  } = data;

  return (
    <div>
      {section_one && <CampusBanner data={section_one} />}
      {section_two && (
        <div className="w-full !pt-[]72px lg:!pt-[140px]">
          <CampusFlagship data={section_two} layout="imgLeftContentRight" />
        </div>
      )}
      {section_three && (
        <ImageGallery data={section_three} imgArr={section_three} />
      )}
      {section_four && <ThePeople data={section_four} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_five && <CampusExp data={section_five} />}
    </div>
  );
};

export default Page;
