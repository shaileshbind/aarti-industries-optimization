import React from "react";
import { BodyText1, H3 } from "../Typography2";
import Button from "../Button";

export default function SustainabilityTransparancy() {
  return (
    <div className="lg:flex justify-between gap-[80px] xl:gap-[126px] fluid-container">
      <H3 className="lg:max-w-[40%] xl:max-w-[434px]">Sustainability and Transparency from Source to Solution</H3>

      <div className="lg:w-[60%] pt-4 lg:pt-0">
        <BodyText1>
          We are transforming our procurement and logistics ecosystem into one
          of the most responsible and future-ready supply chains in the
          speciality-chemical industry. Guided by our Sustainable Procurement
          Policy and Supply Chain Policy, we integrate sustainability,
          human-rights diligence, and innovation across the entire value chain.
        </BodyText1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          {[16, 16, 16, 16]?.map((item, index) => (
            <div
              key={"card_" + index}
              className="p-5 rounded-[20px] bg-[#EFF3F5]"
            >
              <H3 className="text-[#DC4C03]">100%</H3>
              <p className="pt-[6px]">
                of our Business Partners signed the Supplier Code of Conduct
              </p>
            </div>
          ))}
        </div>

        <Button title="Request more details" secondary />
      </div>
    </div>
  );
}
