import React from "react";
import { GridCardsSocialProps } from "@/app/types/social-health-and-safety.type";
import AnimatedText from "../AnimatedText";
import { BodyText2, BodyText3, H3 } from "../Typography2";
import { ScaleInGroup } from "../ScrollReveal";
import clsx from "clsx";

const GridCardsContainer: React.FC<GridCardsSocialProps> = ({
  data,
  headingClassName,
}) => {
  const { cards, title } = data;

  return (
    <section className="fluid-container lg:py-[100px] py-[50px] flex lg:flex-row flex-col justify-end relative">
      <div className="lg:w-[50%] static lg:absolute top-[100px] left-0 mb-8">
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

        
      </div>

      <ScaleInGroup
        delay={0.2}
        className="lg:mt-16 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-[16px] sm:gap-[6px] lg:w-[55%] justify-items-center"
      >
        <div
          className="hidden sm:block sm:max-h-[140px] sm:h-auto sm:max-w-[230px]"
          data-scroll
        ></div>

        {cards?.length > 0 &&
          cards?.map(({ title }, i) => (
            <div
              key={i}
              className=" sm:h-auto lg:min-h-[140px] w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between"
              data-scroll
            >
              <BodyText3 className="text-orange-200">{'0' + (i + 1)}</BodyText3>

              <div className="mt-3 md:mt-3 space-y-3">
                {title && <BodyText2>{title}</BodyText2>}
              </div>
            </div>
          ))}
      </ScaleInGroup>
    </section>
  );
};

export default GridCardsContainer;
