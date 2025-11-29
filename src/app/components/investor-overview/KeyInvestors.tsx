"use client";
import React, { useState } from "react";
import { BodyText2, SubH1 } from "../Typography2";
import Link from "next/link";
import Image from "next/image";
import InvestorBarChart from "../InvestorBarChart";

const KeyInvestors = () => {
  const [active, setActive] = useState(0);
  const keyData = [
    {
      id: 0,
      title: "Revenue from Exports",
      labels: ["FY21", "FY22", "FY23", "FY24", "FY25"],
      data: [2186, 3007, 3573, 3620, 4337],
    },
    {
      id: 1,
      title: "EBITDA",
      labels: ["FY21", "FY22", "FY23", "FY24", "FY25"],
      data: [450, 520, 610, 590, 720],
    },
    {
      id: 2,
      title: "PAT",
      labels: ["FY21", "FY22", "FY23", "FY24", "FY25"],
      data: [320, 400, 470, 450, 580],
    },
    {
      id: 3,
      title: "Net Fixed Assets",
      labels: ["FY21", "FY22", "FY23", "FY24", "FY25"],
      data: [1200, 1350, 1450, 1500, 1600],
    },
    {
      id: 4,
      title: "Capex Spent",
      labels: ["FY21", "FY22", "FY23", "FY24", "FY25"],
      data: [200, 250, 300, 280, 350],
    },
    {
      id: 5,
      title: "Networth",
      labels: ["FY21", "FY22", "FY23", "FY24", "FY25"],
      data: [1800, 2100, 2500, 2700, 3000],
    },
    {
      id: 6,
      title: "Debt Equity Ratio",
      labels: ["FY21", "FY22", "FY23", "FY24", "FY25"],
      data: [0.8, 0.75, 0.7, 0.65, 0.6],
    },
    {
      id: 7,
      title: "Book Value per Share",
      labels: ["FY21", "FY22", "FY23", "FY24", "FY25"],
      data: [45, 50, 55, 58, 62],
    },
    {
      id: 8,
      title: "EPS",
      labels: ["FY21", "FY22", "FY23", "FY24", "FY25"],
      data: [12, 15, 18, 17, 20],
    },
  ];

  return (
    <div>
      <div className="grid lg:grid-cols-[350px_1fr] xl:grid-cols-[400px_1fr]  gap-y-[18px] gap-x-[24px] fluid-container">
        <div>
          <SubH1 className="!text-[24px] lg:!text-[30px]">
            Key Investor Resources
          </SubH1>
          <div className="mt-[24px] lg:mt-[28px] max-h-[unset] lg:max-h-[550px] lg:overflow-y-scroll grid gap-y-[18px] bg-gradient-orange-1 rounded-[12px] px-[20px] py-[30px] lg:p-[36px]">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="flex gap-x-[12px] xl:gap-x-[20px] justify-between w-full pb-[14px] lg:pb-4 border-b border-b-white/10"
              >
                <BodyText2 className="text-white">Market Overview</BodyText2>
                <Link href="#" target="_blank" className="cursor-pointer">
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
              </div>
            ))}
          </div>
        </div>
        <div>
          <SubH1 className="!text-[24px] lg:!text-[30px] hidden lg:block">
            Key Financial Highlights
          </SubH1>
          <div className="mt-[unset] lg:mt-[28px] bg-grey-100 rounded-[12px] px-[20px] py-[26px] lg:p-[30px] max-h-[unset] lg:max-h-[550px] lg:overflow-y-hidden ">
             <SubH1 className="!text-[24px] lg:!text-[30px] mb-[16px] block lg:hidden">
            Key Financial Highlights
          </SubH1>
            <div className="flex gap-[10px] flex-wrap">
              {keyData?.map((items, index) => {
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
                    {items?.title}
                  </div>
                );
              })}
            </div>
            <div className="h-[1px] w-full bg-grey-200 my-[30px] lg:my-[40px]" />
            <InvestorBarChart
              labels={keyData[active]?.labels}
              data={keyData[active]?.data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyInvestors;
