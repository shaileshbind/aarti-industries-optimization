import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import MediaContainer from "../components/media-kit/MediaContainer";
import MediaBanner from "../components/media-kit/MediaBanner";
import ContactBanner from "../components/ContactBanner";
import { getDemoData } from "@/_lib/getDemoData.fetch";

export default async function page() {
  const data = await getDemoData("/pages/by-slug/media-kit");

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  const { section_one, section_two, section_three } = data;

  return (
    <div>
      {section_one && <MediaBanner data={section_one} />}

      {section_two && <MediaContainer data={section_two} />}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_three && <ContactBanner data={section_three} />}
    </div>
  );
}
