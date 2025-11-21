"use client";
import React, { useState } from "react";
import { CPReportProps } from "@/app/types/code-and-policies.type";
import OrangeTabCard from "../cards/OrangeTabCard";
import { ReportsProps } from "@/app/types/annual-reports.type";

const PolicyListComponent = ({ data }: CPReportProps) => {
  const { code_and_policy_reports } = data;
  const [visibleCount, setVisibleCount] = useState(12);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };
  return (
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-x-[64px] lg:gap-y-[20px] mx-auto py-[42px] lg:py-[70px]">
        {code_and_policy_reports
          ?.slice(0, visibleCount)
          ?.map((item: ReportsProps) => (
            <OrangeTabCard
              key={item?.reports?.id}
              title={item?.reports?.heading ? item?.reports?.heading : ""}
              link={item?.reports?.link ? item?.reports?.link : ""}
            />
          ))}
      </div>
      {code_and_policy_reports && code_and_policy_reports?.length > 12 && (
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

export default PolicyListComponent;
