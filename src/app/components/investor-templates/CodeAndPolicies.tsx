import React from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import CodePolicyBanner from "../code-and-policies/CodePolicyBanner";
import OrangeCardListing from "../templates/OrangeCardListing";

export const dynamic = "force-dynamic";

const CodeAndPolicies = async () => {
  const data = await getPageData("/pages/by-slug/code-and-policies");

  return (
    <div>
      {data && <CodePolicyBanner data={data} />}

      {data && (
        <OrangeCardListing data={data} reportKey="code_and_policy_reports" />
      )}
    </div>
  );
};

export default CodeAndPolicies;
