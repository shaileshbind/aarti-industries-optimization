import React from "react";
import { H2 } from "../Typography2";
import { OurCodeAndPoliciesProps } from "@/app/types/corporate-governance.type";
import OrangeTabCard from "../cards/OrangeTabCard";
import Button from "../Button";
import { ReportItemProps } from "@/app/types/annual-reports.type";
import { FadeInReveal } from "../ScrollReveal";

const OurCodeAndPolicies: React.FC<OurCodeAndPoliciesProps> = ({ data }) => {
  const { title, sectionTitle, code_and_policy_reports, ctaButton } = data;

  return (
    <FadeInReveal className="lg:max-w-[1320px] mx-auto px-[15px] lg:pt-[70px]">
      <div className="lg:flex justify-between items-center">
        <div className="md:max-w-[486px]">
          {title && <H2>{title}</H2>}

          {sectionTitle && (
            <div className="mt-2">
              <div
                dangerouslySetInnerHTML={{ __html: sectionTitle }}
                className="text-[#4C5861]"
              />
            </div>
          )}
        </div>
        {ctaButton?.title &&
          (ctaButton?.hasExternalLink == "true"
            ? ctaButton?.externalLink
            : ctaButton?.link?.link) && (
            <div className="hidden lg:block">
              <Button
                title={ctaButton?.title}
                href={
                  ctaButton?.hasExternalLink == "true"
                    ? ctaButton?.externalLink
                    : ctaButton?.link?.link
                }
                useTargetBlank={ctaButton?.hasExternalLink == "true"}
              />
            </div>
          )}
      </div>
      <div className="grid lg:grid-cols-2 gap-x-[64px] lg:gap-y-[20px] mx-auto pt-8 lg:pt-[44px]">
        {code_and_policy_reports?.length &&
          code_and_policy_reports?.[0]?.reportLayout?.[0]?.reports?.map(
            (policy: ReportItemProps) => (
              <OrangeTabCard
                key={policy?.id}
                title={policy.heading || ""}
                link={
                  policy?.link
                    ? policy?.link
                    : policy?.file?.url
                      ? policy?.file?.url
                      : ""
                }
              />
            ),
          )}
      </div>

      {ctaButton?.title &&
        (ctaButton?.hasExternalLink == "true"
          ? ctaButton?.externalLink
          : ctaButton?.link?.link) && (
          <div className="flex lg:justify-center mt-10 lg:hidden">
            <Button
              title={ctaButton?.title}
              href={
                ctaButton?.hasExternalLink == "true"
                  ? ctaButton?.externalLink
                  : ctaButton?.link?.link
              }
              useTargetBlank={ctaButton?.hasExternalLink == "true"}
            />
          </div>
        )}
    </FadeInReveal>
  );
};

export default OurCodeAndPolicies;
