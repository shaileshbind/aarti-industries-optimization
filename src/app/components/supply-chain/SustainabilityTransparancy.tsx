import React from "react";
import { BodyText1, H3 } from "../Typography2";
import Button from "../Button";
import { SustainabilityTransparancyProps } from "@/app/types/supply-chain.type";

export default function SustainabilityTransparancy({
  data,
}: SustainabilityTransparancyProps) {
  const { title, description, values, ctaButton } = data;

  return (
    <div className="lg:flex justify-between gap-[80px] xl:gap-[126px] fluid-container">
      {title && <H3 className="lg:max-w-[40%] xl:max-w-[434px]">{title}</H3>}

      <div className="lg:w-[60%] pt-4 lg:pt-0">
        {description && <BodyText1>{description}</BodyText1>}

        {values?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            {values?.map((item, index) => (
              <div
                key={"card_" + index}
                className="p-5 rounded-[20px] bg-[#EFF3F5]"
              >
                {item?.value && (
                  <H3 className="text-[#DC4C03]">{item?.value}</H3>
                )}
                {item?.description && (
                  <p className="pt-[6px]">{item?.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {ctaButton?.title && ctaButton?.link && (
          <Button title={ctaButton?.title} href={ctaButton?.link} secondary />
        )}
      </div>
    </div>
  );
}
