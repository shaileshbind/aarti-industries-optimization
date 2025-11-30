import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import MediaContainer from "../components/media-kit/MediaContainer";
import MediaBanner from "../components/media-kit/MediaBanner";
import ContactBanner from "../components/ContactBanner";

export default async function page() {
  const data = await getPageData("/pages/by-slug/home-page");
  const data2 = await getPageData(
    "/pages/by-slug/financial-information-report"
  );

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      <MediaBanner data={data2} />

      <MediaContainer data={data?.sectionNine} />

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {data?.sectionTen && <ContactBanner data={data?.sectionTen} />}
    </div>
  );
}
