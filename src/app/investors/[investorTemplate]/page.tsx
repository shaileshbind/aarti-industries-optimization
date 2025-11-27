import AnnualReports from "@/app/components/investor-templates/AnnualReports";
import CodeAndPolicies from "@/app/components/investor-templates/CodeAndPolicies";
import FinancialInformation from "@/app/components/investor-templates/FinancialInformation";
import ShareholderInformation from "@/app/components/investor-templates/ShareholderInformation";
import { notFound } from "next/navigation";
import React from "react";

type PageProps = {
  params: {
    investorTemplate: string;
  };
};

export default async function page({ params }: PageProps) {
  const { investorTemplate } = await params;
  const templates = [
    "shareholder-information",
    "annual-reports",
    "code-and-policies",
    "financial-information",
  ];

  if (!templates?.includes(investorTemplate)) {
    return notFound();
  }

  const getTemplateComponent = () => {
    switch (investorTemplate) {
      case templates[0]:
        return <ShareholderInformation />;
      case templates[1]:
        return <AnnualReports />;
      case templates[2]:
        return <CodeAndPolicies />;
      case templates[3]:
        return <FinancialInformation />;
    }
  };

  return <div>{getTemplateComponent()}</div>;
}
