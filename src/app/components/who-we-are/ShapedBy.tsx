import Image from "next/image";
import React from "react";
import { BodyText1, H2 } from "../Typography2";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";
import { ShapedByProps } from "@/app/types/who-we-are.type";

const ShapedBy: React.FC<ShapedByProps> = ({ data }) => {
  const { ctaButton, description, image, mobImage, title } = data;
  return (
    <>
      {mobImage?.url && (
        <div className="rounded-[14px] overflow-hidden mb-[20px] h-[240px] relative block lg:hidden mx-[20px]">
          <Image
            src={mobImage?.url}
            alt={mobImage?.alternativeText || "banner"}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="w-full relative lg:h-screen">
        {image?.url && (
          <Image
            src={image?.url}
            alt={image?.alternativeText || "banner"}
            fill
            className="hidden lg:block"
          />
        )}
        <div className="lg:absolute w-full lg:py-[80px] px-[20px] lg:px-[60px]">
          {title && (
            <FadeInReveal>
              <H2 className="text-blue-200 lg:text-white max-w-[unset] lg:max-w-[470px]">
                {title}
              </H2>
            </FadeInReveal>
          )}
          <div className="grid mt-[12px] lg:mt-[180px] justify-end">
            <FadeInReveal>
              {description && (
                <BodyText1 className="max-w-[620px] text-grey-400 lg:text-white">
                  {description}
                </BodyText1>
              )}
              {ctaButton?.title && (
                <div className="mt-[28px] lg:mt-[38px]">
                  <Button
                    title={ctaButton?.title}
                    href={ctaButton?.link || "#"}
                  />
                </div>
              )}
            </FadeInReveal>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShapedBy;
