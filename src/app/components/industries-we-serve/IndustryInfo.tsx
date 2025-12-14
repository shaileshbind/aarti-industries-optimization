import React from "react";
import { BodyText2, H3 } from "../Typography2";
import Image from "next/image";
import AnimatedText from "../AnimatedText";
import { FadeInRevealBlur } from "../ScrollReveal";
import { IndustryInfoProps } from "@/app/types/industries-we-serve.type";

const IndustryInfo: React.FC<IndustryInfoProps> = ({ data }) => {
  const { description, image, mobImage, title } = data;

  return (
    <div className="w-full pt-[72px] pb-[50px] lg:pt-[120px] md:pb-[70px] xl:pb-[150px]">
      <div className="container grid lg:grid-cols-[350px_1fr] gap-x-[130px] ">
        <div className="hidden lg:block">
          <div className="relative w-full h-[350px] overflow-hidden rounded-[1rem] flex items-center justify-center">
            {image?.url && (
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={image?.url}
                  alt={image?.alternativeText || "banner"}
                  fill
                  className="object-cover scale-110"
                />
                <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                <span className="absolute right-0 rounded-br-[20px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[300px] overflow-hidden w-[94%] h-[100%]">
                  <Image
                    src={image?.url}
                    alt={image?.alternativeText || "banner"}
                    fill
                    className="object-cover scale-110"
                  />
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          {description && (
            <AnimatedText>
              <H3>{description}</H3>
            </AnimatedText>
          )}
          {mobImage?.url && (
          <div className="block lg:hidden">
            <div className="my-[30px] relative w-full h-[350px] overflow-hidden rounded-[1rem] flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={mobImage?.url}
                    alt={mobImage?.alternativeText || "banner"}
                    fill
                    className="object-cover scale-110"
                  />
                  <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                  <span className="absolute right-0 rounded-br-[20px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[300px] overflow-hidden w-[94%] h-[100%]">
                    <Image
                      src={mobImage?.url}
                      alt={mobImage?.alternativeText || "banner"}
                      fill
                      className="object-cover scale-110"
                    />
                  </span>
                </div>
            </div>
          </div>
          )}
          {title && (
            <FadeInRevealBlur>
              <BodyText2 className="mt-[28px] lg:max-w-[670px]">
                {title}
              </BodyText2>
            </FadeInRevealBlur>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndustryInfo;
