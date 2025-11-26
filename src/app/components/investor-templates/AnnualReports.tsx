import React from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import AnnualRBanner from "../annual-reports/AnnualRBanner";
import GloballyCertified from "../GloballyCertified";
import OrangeCardListing from "../templates/OrangeCardListing";

export const dynamic = "force-dynamic";

const AnnualReports = async () => {
  const data = await getPageData("/pages/by-slug/annual-report");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      {data && <AnnualRBanner data={data} />}
      {data && <OrangeCardListing data={data} reportKey="annual_reports" />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </div>
  );
};

export default AnnualReports;
