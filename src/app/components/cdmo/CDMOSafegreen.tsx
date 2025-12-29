import Image from "next/image";
import React from "react";
import { BodyText1, H2 } from "../Typography2";
import { CDMOSafegreenProps } from "@/app/types/cdmo.type";
import { FadeInReveal, WordReveal } from "../ScrollReveal";

const CDMOSafegreen: React.FC<CDMOSafegreenProps> = ({ data }) => {
  const { title, description, image } = data?.[0];

  return (
    <section className="flex gap-x-[10px] md:gap-x-[40px] md:flex-row flex-col justify-between lg:pt-[0px] lg:pb-[100px] pt-[22px] pb-[50px] pl-[20px] lg:pl-[40px]">
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center pr-[20px] lg:pr-0">
        {title && (<WordReveal
              stagger={0.1}
              fromY={10}
              duration={3}><H2>{title}</H2></WordReveal>)}

        {description && (
          <FadeInReveal delay={0.2}>
            <BodyText1 className="pt-3 pb-3">{description}</BodyText1>
          </FadeInReveal>
        )}
      </div>
      <div className="w-full md:w-1/2 pr-[20px] lg:pr-0 mt-10 lg:mt-0 shrink-0">
        <FadeInReveal delay={0.2} className="order-1 lg:order-2 relative h-[317px] lg:h-[640px] w-full overflow-hidden ">
          <div
            className={`absolute right-0 top-0 min-h-[317px] lg:min-h-[640px] w-[100%] lg:w-full rounded-[20px] overflow-hidden lg:rounded-l-[30px] lg:rounded-r-[unset] `}
          >
            {image?.url && (
              <Image
                src={image?.url}
                alt={image?.alternativeText || "green-banner"}
                fill
                className="absolute object-cover opacity-40 rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] blur-md "
              />
            )}
            <Image
              src={image?.url}
              alt={image?.alternativeText || "green-banner"}
              width={500}
              height={548}
              className="absolute object-cover rounded-tl-[20px] lg:rounded-tl-[30px]  h-[calc(100%-71px)] lg:h-[calc(100%-93px)] w-[calc(100%-71px)] lg:w-[calc(100%-210px)]"
            />
            <Image
              src="/images/home/star-white.svg"
              alt="img"
              width={72}
              height={72}
              className="absolute top-[-36px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
            />
            <Image
              src="/images/home/star-white.svg"
              alt="img"
              width={72}
              height={72}
              className="absolute bottom-[50px] lg:bottom-[57px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
            />
            <div className="absolute min-h-screen bg-white w-[1px] right-[71px] lg:right-[209.5px]" />
            <div className="absolute w-full bg-white bottom-[71px] lg:bottom-[92.5px] h-[1px]" />
          </div>
        </FadeInReveal>
      </div>
    </section>
  );
};

export default CDMOSafegreen;
