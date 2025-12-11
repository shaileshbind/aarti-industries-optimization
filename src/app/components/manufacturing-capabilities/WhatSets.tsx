import Image from "next/image";
import React from "react";
import { H2 } from "../Typography2";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";
import { WhatSetsProps } from "@/app/types/manufacturing-capabilities.type";

export default function WhatSets({ data }: WhatSetsProps) {
  const { title, image, mobImage, ctaButton, cards } = data;

  return (
    <div className="relative lg:h-[calc(100vh-70px)] ">
      {/* Desktop */}
      {image?.url && (
        <div className="lg:absolute w-full h-full hidden lg:block">
          <Image
            src={image?.url}
            alt={"banner"}
            width={1440}
            height={720}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="relative z-[1] fluid-container lg:py-10 lg:px-8 xl:px-[60px] flex flex-col justify-between h-full">
        <div>
          {title && (
            <H2 className="max-w-[560px] text-[#002F50] lg:text-[#FFF]">
              {title}
            </H2>
          )}

          {ctaButton?.title && ctaButton?.link?.link && ctaButton?.hasExternalLink && (
            <Button
              title={ctaButton?.title}
              href={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`}
              className="mt-6"
            />
          )}

          {/* Mobile */}
          {mobImage?.url && (
            <div className="w-full h-[250px] md:h-[420px] block lg:hidden rounded-[20px] overflow-hidden mt-[34px] mb-4">
              <Image
                src={mobImage?.url}
                alt={"banner"}
                width={1440}
                height={720}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        {cards?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards?.map((item, index) => (
              <FadeInReveal
                key={"card_" + index}
                delay={index * 0.2}
                className="bg-[#EFF3F5] lg:bg-[#FFF] p-4 xl:p-8 flex flex-col gap-6 justify-between md:h-[232px] rounded-[20px]"
              >
                {item?.image?.url && (
                  <Image
                    src={item?.image?.url}
                    alt={"banner"}
                    width={40}
                    height={40}
                  />
                )}

                {item?.title && <p className="text-[#4C5861]">{item?.title}</p>}
              </FadeInReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
