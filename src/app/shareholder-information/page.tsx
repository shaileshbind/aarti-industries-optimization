import React from "react";
import ShareHolderBanner from "../components/shareholder-information/ShareHolderBanner";
import TabsYearsContainer from "../components/shareholder-information/TabsYearsContainer";
import { getPageData } from "@/_lib/pageData.fetch";

export default async function page() {
  const data = await getPageData("/pages/by-slug/shareholder-report");
  console.log("data", data);

  return (
    <div>
      {data && <ShareHolderBanner data={data} />}

      {data?.shareholder_reports && (
        <TabsYearsContainer data={data?.shareholder_reports} />
      )}
    </div>
  );
}
