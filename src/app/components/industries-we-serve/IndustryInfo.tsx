import React from "react";
import { BodyText2, H3 } from "../Typography2";
import Image from "next/image";

const IndustryInfo = () => {
  return (
    <div className="w-full py-[50px] lg:py-[100px]">
      <div className="container grid lg:grid-cols-[350px_1fr] gap-x-[130px] ">
        <div className="hidden lg:block">
          <div className="relative w-full h-[350px] overflow-hidden rounded-[1rem] flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/industry/ind-banner.png"
                alt="img"
                fill
                className="object-cover scale-110"
              />
              <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
              <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[94%] h-[97%]">
                <Image
                  src="/images/industry/ind-banner.png"
                  alt="img"
                  fill
                  className="object-cover scale-110"
                />
              </span>
            </div>
          </div>
        </div>
        <div>
          <H3>
            For over four decades, Aarti Industries has been driving progress
            across various sectors that impact lives every day, from
            pharmaceuticals and agrochemicals to polymers, additives, dyes,
            inks, pigments, fuels, and consumer care products.
          </H3>
          <div className="block lg:hidden">
          <div className="my-[30px] relative w-full h-[350px] overflow-hidden rounded-[1rem] flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/industry/ind-banner.png"
                alt="img"
                fill
                className="object-cover scale-110"
              />
              <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
              <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[94%] h-[97%]">
                <Image
                  src="/images/industry/ind-banner.png"
                  alt="img"
                  fill
                  className="object-cover scale-110"
                />
              </span>
            </div>
          </div>
        </div>
          <BodyText2 className="mt-[28px] lg:max-w-[670px]">
            As one of Indias leading speciality chemical manufacturers, we
            integrate our solutions into essential global value chains,
            delivering intermediates that are compliant, sustainable, and
            engineered for performance. Our products help leading companies in
            India and around the world innovate, scale, and grow responsibly.
          </BodyText2>
        </div>
      </div>
    </div>
  );
};

export default IndustryInfo;
