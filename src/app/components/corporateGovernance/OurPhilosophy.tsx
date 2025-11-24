import React from "react";
import { BodyText1, H2 } from "../Typography2";
import { FadeInReveal } from "../ScrollReveal";
import Image from "next/image";
import { OurPhilosophyProps } from "@/app/types/corporate-governance.type";

const OurPhilosophy: React.FC<OurPhilosophyProps> = ({ data }) => {
  const { description, image, mobImage, heading } = data;

  return (
    <div className=" max-w-[1320px] mx-auto py-30 md:pb-[70px] px-[15px]">
      <div className=" flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-[30%] mt-10 md:mt-0">

          {image && (
            <FadeInReveal>
              <div className="hidden lg:block relative w-full pt-[100%] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <Image

                    src={image?.url}
                    alt={image?.alternativeText || "banner"}
                    fill
                    className={`object-cover scale-110 transition-opacity duration-700 ease-out `}
                  />
                  <i className="absolute top-0 left-0 w-full h-full backdrop-blur-sm"></i>
                  <span className="absolute bottom-0 right-0 rounded-bl-[400px] rounded-tl-[400px] rounded-tr-[400px] rounded-br-[20px] overflow-hidden w-[95%] h-[100%]">
                    <Image

                      src={image?.url}
                      alt={image?.alternativeText || "banner"}
                      fill
                      className={`object-cover scale-110 transition-opacity duration-700 ease-out `}
                    />
                  </span>
                </div>
              </div>
            </FadeInReveal>
          )}
          {mobImage && (
            <FadeInReveal>
              <div className="block lg:hidden relative w-full pt-[100%] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <Image

                    src={mobImage?.url}
                    alt={mobImage?.alternativeText || "banner"}
                    fill
                    className={`object-cover scale-110 transition-opacity duration-700 ease-out `}
                  />
                  <i className="absolute top-0 left-0 w-full h-full backdrop-blur-sm"></i>
                  <span className="absolute bottom-0 right-0 rounded-bl-[400px] rounded-tl-[400px] rounded-tr-[400px] rounded-br-[20px] overflow-hidden w-[95%] h-[100%]">
                    <Image

                      src={mobImage?.url}
                      alt={mobImage?.alternativeText || "banner"}
                      fill
                      className={`object-cover scale-110 transition-opacity duration-700 ease-out `}
                    />
                  </span>
                </div>
              </div>
            </FadeInReveal>
          )}
        </div>
        <div className=" w-full md:w-[70%] pl-20">
          {description && (
            <FadeInReveal>
              <H2 className="max-w-[unset] lg:max-w-[1000px] text-left mx-[unset] lg:mx-auto mb-6">{heading}</H2>
              <BodyText1>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </BodyText1>
            </FadeInReveal>
          )}
        </div>

      </div>
    </div>
  );
};

export default OurPhilosophy;
