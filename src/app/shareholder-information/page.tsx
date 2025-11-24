import React from "react";
import ShareHolderBanner from "../components/shareholder-information/ShareHolderBanner";
import TabsYearsContainer from "../components/shareholder-information/TabsYearsContainer";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";

export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getPageData("/pages/by-slug/shareholder-report");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      {data && <ShareHolderBanner data={data} />}

      {data?.shareholder_reports && (
        <TabsYearsContainer data={data?.shareholder_reports} />
      )}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </div>
  );
}
