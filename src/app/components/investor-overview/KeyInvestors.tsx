"use client";
import { useState } from "react";
import { BodyText2, SubH1 } from "../Typography2";
import Link from "next/link";
import Image from "next/image";
import InvestorBarChart from "../InvestorBarChart";
import SmoothScrollContainer from "../SmoothScrollContainer";
import { InvestorKeyProps } from "@/app/types/investor-overview.type";
import { FadeInReveal } from "../ScrollReveal";

const KeyInvestors = ({ data }: InvestorKeyProps) => {
  const { leftSection, rightSection } = data;
  const [active, setActive] = useState(0);

  return (
    <FadeInReveal>
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] xl:grid-cols-[400px_1fr]  gap-y-[18px] gap-x-[24px] fluid-container">
        <div>
          {leftSection?.title && (
            <SubH1 className="!text-[24px] lg:!text-[30px]">
              {leftSection?.title}
            </SubH1>
          )}
          <SmoothScrollContainer
            className="mt-[24px] lg:mt-[28px] max-h-[unset] lg:max-h-[550px] lg:overflow-y-auto investorScrollbar grid gap-y-[18px] bg-gradient-orange-1 rounded-[12px] px-[20px] py-[30px] lg:p-[36px]"
          >
            {leftSection?.content?.map((items) => {
              const url = items?.file?.url ?? items?.link;
              return (
                <div
                  key={items?.id}
                  className="flex gap-x-[12px] xl:gap-x-[20px] justify-between w-full pb-[14px] lg:pb-4 border-b border-b-white/10"
                >
                  <BodyText2 className="text-white">{items?.heading}</BodyText2>
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
          </SmoothScrollContainer>
        </div>
        <div>
          {rightSection?.title && (
            <SubH1 className="!text-[24px] lg:!text-[30px] hidden lg:block">
              {rightSection?.title}
            </SubH1>
          )}
          <div className="mt-[unset] lg:mt-[28px] bg-grey-100 rounded-[12px] px-[20px] py-[26px] lg:p-[30px] max-h-[unset] lg:max-h-[550px] lg:overflow-y-hidden ">
            {rightSection?.title && (
              <SubH1 className="!text-[24px] lg:!text-[30px] mb-[16px] block lg:hidden">
                {rightSection?.title}
              </SubH1>
            )}
            <div className="flex gap-[10px] flex-wrap">
              {rightSection?.content?.map((items, index) => {
                return (
                  <div
                    key={items?.id}
                    onClick={() => setActive(index)}
                    className={`${
                      index === active
                        ? "border-transparent text-white !bg-[linear-gradient(142deg,#FA8129_22.06%,#DC4C03_147.93%)] "
                        : "bg-none border-grey-300 text-grey-400"
                    } w-fit border border-grey-300 hover:border-transparent text-[12px] lg:text-[14px] rounded-[10px] py-[6px] lg:py-[9px] px-[8px] lg:px-[16px] text-grey-400 hover:text-white bg-none hover:bg-[linear-gradient(142deg,#FA8129_22.06%,#DC4C03_147.93%)] cursor-pointer`}
                  >
                    {items?.category}
                  </div>
                );
              })}
            </div>
            <div className="h-[1px] w-full bg-grey-200 my-[30px] lg:my-[40px]" />
            <InvestorBarChart
              labels={rightSection?.content?.[active]?.years ?? []}
              data={(rightSection?.content?.[active]?.values ?? []).map(Number)}
            />
          </div>
        </div>
      </div>
    </FadeInReveal>
  );
};

export default KeyInvestors;
