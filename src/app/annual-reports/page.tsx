import React from "react";
import AnnualRBanner from "../components/annual-reports/AnnualRBanner";
import { getPageData } from "@/_lib/pageData.fetch";
import AnnualList from "../components/annual-reports/AnnualList";
export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/annual-report");

  return (
    <div>
      {data && <AnnualRBanner data={data} />}
      {data && <AnnualList data={data} />}
    </div>
  );
};

export default page;
