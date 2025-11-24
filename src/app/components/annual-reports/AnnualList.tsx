"use client";
import React, { useState } from "react";
import OrangeTabCard from "../cards/OrangeTabCard";
import { AnnualRProps, ReportItemProps } from "@/app/types/annual-reports.type";

const AnnualList = ({ data }: AnnualRProps) => {
  const { annual_reports } = data;
  const [visibleCount, setVisibleCount] = useState(12);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };
  return (
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-x-[64px] lg:gap-y-[20px] mx-auto py-[42px] lg:py-[70px]">
        {annual_reports?.[0]?.reportLayout?.[0]?.reports
          ?.slice(0, visibleCount)
          ?.map((item: ReportItemProps) => (
            <OrangeTabCard
              key={item?.id}
              title={item?.heading ? item?.heading : ""}
              link={item?.link ? item?.link : ""}
            />
          ))}
      </div>
      {annual_reports && annual_reports?.length > 12 && (
        <div className="flex justify-center mb-8">
          <button
            onClick={handleLoadMore}
            className={`animated-underline w-fit cursor-pointer text-orange-200 text-[16px] font-normal leading-[100% font-alte-hans underline underline-offset-[4px] [text-underline-position:under]`}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default AnnualList;
