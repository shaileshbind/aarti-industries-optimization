import React from "react";
import Image from "next/image";
import { CDMOPartnerProps } from "@/app/types/cdmo.type";
import AnimatedText from "../AnimatedText";
import { BodyText2, H3, SubH2 } from "../Typography2";
import { ScaleInGroup } from "../ScrollReveal";
import clsx from "clsx";

const GridCardsContainer: React.FC<CDMOPartnerProps> = ({
  data,
  headingClassName,
}) => {
  const { description, card, title } = data;

  return (
    <section className="fluid-container lg:py-[100px] py-[50px] flex lg:flex-row flex-col justify-end relative">
      <div className="lg:w-[46%] static lg:absolute top-42 left-0 mb-8">
        {title && (
          <div className="w-full">
            <AnimatedText>
              <H3
                className={clsx(
                  headingClassName ? headingClassName : "lg:!text-[28px]"
                )}
              >
                {title}
              </H3>
            </AnimatedText>
          </div>
        )}

        {description && (
          <div className="lg:w-[70%] mt-[10px]">
            <AnimatedText>
              <BodyText2 className="text-base">{description}</BodyText2>
            </AnimatedText>
          </div>
        )}
      </div>

      <ScaleInGroup
        delay={0.2}
        className="lg:mt-16 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-[16px] sm:gap-[6px] lg:w-[70%] justify-items-center"
      >
        {/* Empty placeholder for design spacing */}
        <div
          className="hidden sm:block sm:max-h-[320px] sm:h-auto sm:max-w-[320px]"
          data-scroll
        ></div>

        {/* Cards */}
        {card?.length > 0 &&
          card?.map(({ title, image, description }, i) => (
            <div
              key={i}
              className=" sm:h-auto lg:min-h-[320px] w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between"
              data-scroll
            >
              {image?.url && (
                <Image
                  src={image?.url}
                  alt={image?.alternativeText || "logo"}
                  width={48}
                  height={48}
                />
              )}

              <div className=" mt-3 md:mt-8 space-y-3">
                {title && <SubH2>{title}</SubH2>}

                {description && <BodyText2>{description}</BodyText2>}
              </div>
            </div>
          ))}
      </ScaleInGroup>
    </section>
  );
};

export default GridCardsContainer;
