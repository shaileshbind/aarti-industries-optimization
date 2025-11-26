import React from "react";
import { BodyText1, H2 } from "../Typography2";
import {
  OurCodeAndPoliciesProps,
  // PoliciesProps,
} from "@/app/types/corporate-governance.type";
// import OrangeTabCard from "../cards/OrangeTabCard";
import Button from "../Button";

const OurCodeAndPolicies: React.FC<OurCodeAndPoliciesProps> = ({ data }) => {
  const { description, heading, policies } = data;

  return (
    <div className="lg:max-w-[1320px] mx-auto px-[15px] lg:pt-[70px]">
      <div className="lg:flex justify-between items-center">
        <div>
          <H2>{heading}</H2>
          <BodyText1 className="mt-2 lg:mt-0">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </BodyText1>
        </div>
        <div className="hidden lg:block">
          <Button title="View All" href="/solutions" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-[64px] lg:gap-y-[20px] mx-auto pt-8 lg:pt-[44px]">
        {policies &&
          policies?.map(() => (
            ""
            // <OrangeTabCard
            //   key={policy?.id}
            //   title={policy?.heading}
            //   link={policy?.link}
            // />
          ))}
      </div>

      <div className="flex justify-center mt-10 lg:hidden">
        <Button title="View All" href="/solutions" />
      </div>
    </div>
  );
};

export default OurCodeAndPolicies;
