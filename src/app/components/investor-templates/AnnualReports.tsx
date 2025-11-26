import React from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import AnnualRBanner from "../annual-reports/AnnualRBanner";
import OrangeCardListing from "../templates/OrangeCardListing";

export const dynamic = "force-dynamic";

const AnnualReports = async () => {
  const data = await getPageData("/pages/by-slug/annual-report");

  return (
    <div>
      {data && <AnnualRBanner data={data} />}

      {data && <OrangeCardListing data={data} reportKey="annual_reports" />}
    </div>
  );
};

export default AnnualReports;
