import Image from "next/image";
import React from "react";
import { BodyText1, H2 } from "../Typography2";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";

const ShapedBy = () => {
  return (
    <>
      <div className="rounded-[14px] overflow-hidden mb-[20px] h-[240px] relative block lg:hidden mx-[20px]">
        <Image
          src="/images/who-we-are/shaped-bg.png"
          alt="img"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full relative lg:h-screen">
        <Image
          src="/images/who-we-are/shaped-bg.png"
          alt="img"
          fill
          className="hidden lg:block"
        />
        <div className="lg:absolute w-full lg:py-[80px] px-[20px] lg:px-[60px]">
          <FadeInReveal>
            <H2 className="text-blue-200 lg:text-white max-w-[unset] lg:max-w-[470px]">
              Shaped by Four Decades of Milestones
            </H2>
          </FadeInReveal>
          <div className="grid mt-[12px] lg:mt-[180px] justify-end">
            <FadeInReveal>
              <BodyText1 className="max-w-[620px] text-grey-400 lg:text-white">
                From our beginnings in 1984 with a 1200 TPA Nitro Chloro Benzene
                unit in Sarigram to global speciality chemicals leadership,
                today with a footprint of 16 plants, advanced R&D centres, and
                long-term strategic partnerships with global chemical leaders.
                Aarti Industries has evolved into a global partner of choice in
                speciality chemicals for over 1,100 customers across more than
                60 countries, building a legacy as a speciality chemical
                powerhouse.
              </BodyText1>
              <div className="mt-[28px] lg:mt-[38px]">
                <Button title="View Our Journey" href="#" />
              </div>
            </FadeInReveal>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShapedBy;
