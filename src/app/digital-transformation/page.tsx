import { getData } from "@/_lib/getData.fetch";
import { getPageData } from "@/_lib/pageData.fetch";
import React from "react";
import DigitalBanner from "../components/digital-transformation/DigitalBanner";
import TitleCardsContainer from "../components/TitleCardsContainer";
import MiddleBanner from "../components/digital-transformation/MiddleBanner";
import DrivingCrossFunctional from "../components/digital-transformation/DrivingCrossFunctional";
import FrameworkForged from "../components/sections/FrameworkForged";
import GloballyCertified from "../components/GloballyCertified";
import ExploreCards from "../components/digital-transformation/ExploreCards";

export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getPageData("/pages/by-slug/digital-transformation");
  const data3 = await getPageData("/pages/by-slug/research-and-development");
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
  } = data;

  return (
    <div>
      {section_one && <DigitalBanner data={section_one} />}

      {section_two && (
        <div className="py-[72px] lg:py-[140px]">
          <TitleCardsContainer data={section_two} />
        </div>
      )}

      {section_three && <MiddleBanner data={section_three} />}

      {section_four && (
        <DrivingCrossFunctional data={section_four} />
      )}

      {section_five && (
        <div className="mb-[72px] lg:mb-[140px] mt-[20px]">
          <FrameworkForged data={section_five} />
        </div>
      )}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_six && <ExploreCards data={section_six} />}
    </div>
  );
}
