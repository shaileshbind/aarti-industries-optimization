import React from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import CodePolicyBanner from "../code-and-policies/CodePolicyBanner";
import GloballyCertified from "../GloballyCertified";
import OrangeCardListing from "../templates/OrangeCardListing";

export const dynamic = "force-dynamic";

const CodeAndPolicies = async () => {
  const data = await getPageData("/pages/by-slug/code-and-policies");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      {data && <CodePolicyBanner data={data} />}
      {data && (
        <OrangeCardListing data={data} reportKey="code_and_policy_reports" />
      )}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </div>
  );
};

export default CodeAndPolicies;
