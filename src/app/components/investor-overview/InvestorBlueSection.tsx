import Link from "next/link";
import React from "react";
import { BodyText2, Cta, H2, SubH3 } from "../Typography2";
import Image from "next/image";
import { InvestorsBlueProps } from "@/app/types/investor-overview.type";

const InvestorBlueSection = ({ data }: InvestorsBlueProps) => {
  const { reports } = data;
  return (
    <div className="bg-blue-200">
      <div className="fluid-container py-[24px] lg:py-[40px] grid xl:grid-cols-2 gap-y-[40px] gap-x-[160px]">
        <div className="grid lg:grid-cols-2 gap-x-[10px] lg:gap-x-[50px] gap-y-[16px] lg:gap-y-[10px] xl:justify-between ">
          {reports?.map((items) => {
            const url = items?.file?.url ?? items?.link;
            return (
              <div
                key={items?.id}
                className="flex gap-x-[12px] xl:gap-x-[40px] justify-between pb-4 border-b border-b-white/10"
              >
                <Cta className="bg-transparent text-white text-[14px] lg:text-[16px] ">
                  {items?.heading}
                </Cta>
                {url && (
                  <Link
                    href={url}
                    target="_blank"
                    className="flex gap-x-[12px] items-center cursor-pointer "
                  >
                    <Image
                      src="/images/arrow-white-top-r.svg"
                      alt="icon"
                      width={30}
                      height={30}
                      className="hidden lg:block"
                    />
                    <Image
                      src="/images/arrow-white-top-r.svg"
                      alt="icon"
                      width={24}
                      height={24}
                      className="block lg:hidden"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex gap-x-[40px] lg:gap-x-[50px] justify-between ">
          <div>
            <BodyText2 className="text-white">BSE</BodyText2>
            <div className="flex gap-x-[10px] items-end">
              <H2 className="text-white">3425.00</H2>
              <SubH3 className="text-white !text-[16px] lg:!text-[18px] mb-[5px]">
                INR
              </SubH3>
            </div>
            <BodyText2 className="text-white ">-11.50 (-0.34%)</BodyText2>
          </div>
          <div className="w-[1px] h-full bg-blue-100 hidden lg:block" />
          <div>
            <BodyText2 className="text-white">BSE</BodyText2>
            <div className="flex gap-x-[10px] items-end">
              <H2 className="text-white">3425.00</H2>
              <SubH3 className="text-white !text-[16px] lg:!text-[18px] mb-[5px]">
                INR
              </SubH3>
            </div>
            <BodyText2 className="text-white ">-11.50 (-0.34%)</BodyText2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorBlueSection;
