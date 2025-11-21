import React from "react";
import PolicyListComponent from "../components/code-and-policies/PolicyList";
import { getPageData } from "@/_lib/pageData.fetch";
import CodePolicyBanner from "../components/code-and-policies/CodePolicyBanner";
export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/code-and-policies");

  return (
    <div>
      {data && <CodePolicyBanner data={data} />}
      {data && <PolicyListComponent data={data} />}
    </div>
  );
};

export default page;
