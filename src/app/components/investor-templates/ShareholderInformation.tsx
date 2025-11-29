import React from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import ShareHolderBanner from "../shareholder-information/ShareHolderBanner";
import TabsYearsContainer from "../shareholder-information/TabsYearsContainer";

export const dynamic = "force-dynamic";

export default async function ShareholderInformation() {
  const data = await getPageData("/pages/by-slug/shareholder-report");

  return (
    <div>
      {data && <ShareHolderBanner data={data} />}

      {data?.shareholder_reports && (
        <TabsYearsContainer data={data?.shareholder_reports} />
      )}
    </div>
  );
}
