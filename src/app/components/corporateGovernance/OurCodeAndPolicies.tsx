import React from "react";
import { BodyText1, H2 } from "../Typography2";
import {
  OurCodeAndPoliciesProps,
  PoliciesProps,
} from "@/app/types/corporate-governance.type";
import OrangeTabCard from "../cards/OrangeTabCard";
import Button from "../Button";

const OurCodeAndPolicies: React.FC<OurCodeAndPoliciesProps> = ({ data }) => {
  const { description, heading, policies } = data;

  return (
    <div className="max-w-[1320px] mx-auto px-[15px] pt-[70px]">
      <div className="flex justify-between items-center">
        <div>
          <H2>{heading}</H2>
          <BodyText1>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </BodyText1>
        </div>
        <div>
          <Button title="View All" href="/solutions" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-[64px] lg:gap-y-[20px] mx-auto lg:pt-[44px]">
        {policies &&
          policies?.map((policy: PoliciesProps) => (
            <OrangeTabCard
              key={policy?.id}
              title={policy.heading}
              link={policy?.link}
            />
          ))}
      </div>
    </div>
  );
};

export default OurCodeAndPolicies;
