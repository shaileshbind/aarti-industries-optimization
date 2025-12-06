import React from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import AnnualRBanner from "../annual-reports/AnnualRBanner";
import OrangeCardListing from "../templates/OrangeCardListing";
import SEO from "../SEO";

type OrangeCardListingPageProps = {
  params: string;
};
export const dynamic = "force-dynamic";

const OrangeCardListingPage = async ({
  params,
}: OrangeCardListingPageProps) => {
  const data = await getPageData(`/pages/by-slug/${params}`);
  const key = Object.keys(data?.data).pop();
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? `${data?.data?.title}`}
        metaTitle={seo?.metaTitle ?? `${data?.data?.title}`}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          `https://www.aarti-industries.com/investors/${params}`
        }
        robots={seo?.robots ?? "index, follow"}
        ogURL={seo?.ogURL}
        ogImg={seo?.ogImg?.url}
        ogTitle={seo?.ogTitle}
        ogDesc={seo?.ogDesc}
        twtUrl={seo?.twtUrl}
        twtImg={seo?.twtImg?.url}
        twtTitle={seo?.twtTitle}
        twtDesc={seo?.twtDesc}
        schemaData={seo?.schemaData}
      />
      {data && <AnnualRBanner data={data?.data} />}
      {data && <OrangeCardListing data={data?.data} reportKey={key || ""} />}
    </div>
  );
};

export default OrangeCardListingPage;
