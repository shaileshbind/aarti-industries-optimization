import React from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import AnnualRBanner from "../annual-reports/AnnualRBanner";
import OrangeCardListing from "../templates/OrangeCardListing";

type OrangeCardListingPageProps = {
  params: string;
};

export const dynamic = "force-dynamic";

const OrangeCardListingPage = async ({
  params,
}: OrangeCardListingPageProps) => {
  const data = await getPageData(`/pages/by-slug/${params}`);
  const key = Object.keys(data).pop();

  return (
    <div>
      {data && <AnnualRBanner data={data} />}

      {data && <OrangeCardListing data={data} reportKey={key || ""} />}
    </div>
  );
};

export default OrangeCardListingPage;
