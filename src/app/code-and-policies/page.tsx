import React from "react";
import PolicyListComponent from "../components/code-and-policies/PolicyList";
import { getPageData } from "@/_lib/pageData.fetch";
import CodePolicyBanner from "../components/code-and-policies/CodePolicyBanner";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/code-and-policies");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      {data && <CodePolicyBanner data={data} />}
      {data && <PolicyListComponent data={data} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </div>
  );
};

export default page;
