import React from "react";
import { BodyText2, H3, SubH2 } from "../Typography2";
import Image from "next/image";
import AnimatedText from "../AnimatedText";
import { ScaleInGroup } from "../ScrollReveal";
import { CDMOPartnerProps } from "@/app/types/cdmo.type";

const CDMOPartner: React.FC<CDMOPartnerProps> = ({ data }) => {
  const { description, card } = data;

  return (
    <section className="fluid-container lg:py-[100px] py-[50px] flex lg:flex-row flex-col justify-end relative">
      {description && (
        <div className="lg:w-[40%] static lg:absolute top-42 left-0 mb-8">
          <AnimatedText>
            <H3>{description}</H3>
          </AnimatedText>
        </div>
      )}

      {/* <ScaleInGroup delay={0.2} className='lg:mt-16 mt-2 flex gap-2 lg:w-[70%] flex-wrap justify-center lg:justify-normal'>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full hidden lg:block' data-scroll></div>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between' data-scroll> 
          <Image
            src="/images/cdmo/cdmo-card-icon.svg"
            alt="logo"
            width={48}
            height={48}
          />
          <div className='mt-8 space-y-3'>
            <SubH2>Process-Safety-by-Design</SubH2>
            <BodyText2>Safety and sustainability embedded into every stage of development.</BodyText2>
          </div>
        </div>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between' data-scroll>
          <Image
            src="/images/cdmo/cdmo-card-icon.svg"
            alt="logo"
            width={48}
            height={48}
          />
          <div className='mt-8 space-y-3'>
            <SubH2>Process-Safety-by-Design</SubH2>
            <BodyText2>Safety and sustainability embedded into every stage of development.</BodyText2>
          </div>
        </div>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between' data-scroll>
          <Image
            src="/images/cdmo/cdmo-card-icon.svg"
            alt="logo"
            width={48}
            height={48}
          />
          <div className='mt-8 space-y-3'>
            <SubH2>Process-Safety-by-Design</SubH2>
            <BodyText2>Safety and sustainability embedded into every stage of development.</BodyText2>
          </div>
        </div>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between' data-scroll>
          <Image
            src="/images/cdmo/cdmo-card-icon.svg"
            alt="logo"
            width={48}
            height={48}
          />
          <div className='mt-8 space-y-3'>
            <SubH2>Process-Safety-by-Design</SubH2>
            <BodyText2>Safety and sustainability embedded into every stage of development.</BodyText2>
          </div>
        </div>
      </ScaleInGroup> */}

      <ScaleInGroup
        delay={0.2}
        className="lg:mt-16 mt-2 grid grid-cols-1 lg:grid-cols-3 gap-[6px] lg:gap-[6px] lg:w-[70%] justify-items-center"
      >
        {/* Empty placeholder for design spacing */}
        <div
          className="hidden lg:block lg:max-h-[320px] lg:h-auto lg:max-w-[320px]"
          data-scroll
        ></div>

        {/* Cards */}
        {card?.length > 0 &&
          card?.map(({ title, image, description }, i) => (
            <div
              key={i}
              className="lg:max-h-[320px] lg:h-auto w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between"
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

              <div className="mt-8 space-y-3">
                {title && <SubH2>{title}</SubH2>}

                {description && <BodyText2>{description}</BodyText2>}
              </div>
            </div>
          ))}
      </ScaleInGroup>
    </section>
  );
};

export default CDMOPartner;
