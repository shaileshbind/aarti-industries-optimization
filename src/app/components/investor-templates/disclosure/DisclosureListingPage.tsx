"use client";
import { useState } from "react";
import OrangeTabCard from "../../cards/OrangeTabCard";
import { ReportItemProps } from "@/app/types/annual-reports.type";
import { DisclosureListingPageProps } from "@/app/types/disclosure.type";

export default function DisclosureListingPage({
  reports,
}: DisclosureListingPageProps) {
  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="container">
      {reports?.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-2 gap-x-[64px] lg:gap-y-[20px] mx-auto py-[42px] lg:py-[70px] lg:pt-10">
            {reports?.slice(0, visibleCount)?.map((item: ReportItemProps) => (
              <OrangeTabCard
                key={item?.id}
                title={item?.heading ? item?.heading : ""}
                link={
                  item?.link
                    ? item?.link
                    : item?.file?.url
                    ? item?.file?.url
                    : ""
                }
              />
            ))}
          </div>
          {reports && reports?.length > visibleCount && (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleLoadMore}
                className={`animated-underline w-fit cursor-pointer text-orange-200 text-[16px] font-normal leading-[100%] font-alte-hans underline underline-offset-[4px] [text-underline-position:under]`}
              >
                View More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-lg text-[#002F50] py-40 text-center">
          No data found
        </p>
      )}
    </div>
  );
}
