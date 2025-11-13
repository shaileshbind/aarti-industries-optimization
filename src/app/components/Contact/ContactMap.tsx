import React from "react";
import { BodyText2, H2, SubH3 } from "../Typography2";
import Image from "next/image";

const ContactMap = () => {
  return (
    <div className="my-[50px] lg:my-[100px]">
      <H2 className="max-w-[unset] lg:max-w-[550px] text-center mx-auto mb-[30px] lg:mb-[60px]">
        Our Global Presence
      </H2>
      <div className="relative container mx-auto w-full h-[180px] lg:h-[600px]">
        <Image
          src="/images/contact/contact-map.svg"
          alt="img"
          fill
          className="object-contain hidden lg:block"
        />
        <Image
          src="/images/contact/contact-map.svg"
          alt="img"
          fill
          className="object-contain block lg:hidden"
        />
      </div>
      <div className="block lg:hidden">
        <div className="grid gap-y-[42px] mt-[50px] container">
          {[...Array(3)].map((_, index) => {
            return (
              <div key={index}>
                <div className="text-white bg-gradient-orange-1 w-fit px-[24px] py-[6px] rounded-full text-[12px] uppercase">
                  R&D centre
                </div>
                <SubH3 className="mt-[10px]">Vapi</SubH3>
                <BodyText2 className="mt-[6px]">
                  Aarti Industries Limited
                </BodyText2>
                <BodyText2>
                  Plot No.-801/23, G.I.D.C Estate, Phase III, Vapi-396 195,
                  Dist.-Valsad, Gujarat, India
                </BodyText2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
