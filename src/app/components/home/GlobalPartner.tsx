import React from "react";
import Image from "next/image";
import { BodyText2, H2, H3 } from "../Typography2";
import useAnimatedCount from "@/app/hooks/useAnimatedCount";

const GlobalPartner = () => {
  return (
    <div className="w-full min-h-[unset] lg:min-h-[350px] h-auto grid lg:grid-cols-[312px_1fr] gap-[6px]">
      <div className="bg-gradient-orange-1 relative rounded-[14px] lg:rounded-[20px] py-[38px] px-[24px] min-h-[136px] lg:min-h-[350px] overflow-hidden">
        <H3 className="text-white max-w-[230px] md:max-w-fit">
          Global Partner of Choice
        </H3>
        <Image
          src="/images/home/flower-t.svg"
          alt="img"
          width={295}
          height={295}
          className="absolute bottom-[30px] md:bottom-[-86px] right-[-40px] md:right-[-90px] w-[151px] h-[151px] md:w-[295px] md:h-[295px]"
        />
      </div>
      <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-none lg:grid-rows-[1fr_1fr] gap-[6px]">
        <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px]">
          <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px]">
            <H2 className="text-orange-200">{Math.floor(useAnimatedCount(40, 1500))}+</H2>
            <BodyText2>years of speciality chemical expertise</BodyText2>
          </div>
          <div className="rounded-[20px] overflow-hidden relative">
            <Image
              src="/images/home/chemical.png"
              alt="img"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px]">
            <H2 className="text-orange-200">{Math.floor(useAnimatedCount(20, 1500))}+</H2>
            <BodyText2>sectors being served</BodyText2>
          </div>
          <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px]">
            <H2 className="text-orange-200">{Math.floor(useAnimatedCount(2, 1500))}</H2>
            <BodyText2>state-of-the-art R&D facilities</BodyText2>
          </div>
        </div>
        <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px]">
          <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px]">
            <H2 className="text-orange-200">{Math.floor(useAnimatedCount(60, 1500))}+</H2>
            <BodyText2>
              countries served with a growing export footprint
            </BodyText2>
          </div>
          <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px]">
            <H2 className="text-orange-200">{Math.floor(useAnimatedCount(100, 1500))}+</H2>
            <BodyText2>products</BodyText2>
          </div>
          <div className="rounded-[20px] overflow-hidden relative">
            <Image
              src="/images/home/test-lab.png"
              alt="img"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px]">
            <H2 className="text-orange-200">{Math.floor(useAnimatedCount(16, 1500))}</H2>
            <BodyText2>manufacturing facilities across India</BodyText2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPartner;
