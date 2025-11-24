import React from "react";
import AnnualRBanner from "../components/annual-reports/AnnualRBanner";
import { getPageData } from "@/_lib/pageData.fetch";
import AnnualList from "../components/annual-reports/AnnualList";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/annual-report");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      {data && <AnnualRBanner data={data} />}
      {data && <AnnualList data={data} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </div>
  );
};

export default page;
