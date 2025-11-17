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
  const data = await getPageData("/pages/by-slug/who-we-are");
  const data2 = await getPageData("/pages/by-slug/environment");
  const data3 = await getPageData("/pages/by-slug/research-and-development");
  const data4 = await getPageData("/pages/by-slug/home-page");
  const data5 = await getPageData("/pages/by-slug/cdmo");

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      {data?.section_one && <DigitalBanner data={data?.section_one} />}

      <div className="py-[72px] lg:py-[140px]">
        <TitleCardsContainer />
      </div>

      {data2?.section_four && <MiddleBanner data={data2?.section_four} />}

      {data3?.section_eight && (
        <DrivingCrossFunctional data={data3?.section_eight} />
      )}

      {data4?.sectionEight && (
        <div className="mb-[72px] lg:mb-[140px] mt-[20px]">
          <FrameworkForged data={data4?.sectionEight} />
        </div>
      )}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {data5?.section_eight && <ExploreCards data={data5?.section_eight} />}
    </div>
  );
}
