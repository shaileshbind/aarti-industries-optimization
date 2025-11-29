import { getPageData } from "@/_lib/pageData.fetch";
import React from "react";
import FinancialBanner from "../financial-information/FinancialBanner";
import YearQuarterListing from "../templates/YearQuarterListing";

export default async function FinancialInformation() {
  const data = await getPageData("/pages/by-slug/financial-information-report");

  return (
    <div>
      {data && <FinancialBanner data={data} />}

      {data?.financial_information_reports?.[0]?.reportLayout && (
        <YearQuarterListing
          reportLayout={data?.financial_information_reports?.[0]?.reportLayout}
          showFinancialYear
        />
      )}
    </div>
  );
}
