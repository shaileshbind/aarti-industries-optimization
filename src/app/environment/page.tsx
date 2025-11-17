import React from "react";
import EnvBanner from "../components/environment/EnvBanner";
import EnvInfo from "../components/environment/EnvInfo";
import EnvCards from "../components/environment/EnvCards";
import EnvStrong from "../components/environment/EnvStrong";
import EnvLatest from "../components/environment/EnvLatest";
import GloballyCertified from "../components/GloballyCertified";
import EnvExp from "../components/environment/EnvExp";
import EnvResp from "../components/environment/EnvResp";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/environment");
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
      <EnvBanner data={section_one} />
      <EnvInfo data={section_two} />
      <EnvCards data={section_two} />
      <EnvResp data={section_three} />
      <EnvStrong data={section_four} />
      <EnvLatest data={section_five} />
      <GloballyCertified
        title="Globally Certified"
        itemsData={globallyCertifiedData}
      />
      <EnvExp data={section_six} />
    </div>
  );
};

export default page;
