"use client";
import React, { useState } from "react";
import SearchBanner from "../../banners/SearchBanner";
import DisclosureTabs from "./DisclosureTabs";
import YearAndListing from "../../templates/YearAndListing";
import { YearAndReportContainerProps } from "@/app/types/disclosure.type";
import { YearAndListingLayout } from "@/app/types/year-and-listing.type";

export default function YearAndReportContainer({
  data,
  categories,
}: YearAndReportContainerProps) {
  const { title, description, image, mobImage } = data?.banner || {};
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const filteredReportLayout = (() => {
    if (!activeSearch.trim()) {
      return (data?.reportLayout as YearAndListingLayout[]) || [];
    }

    const searchLower = activeSearch.toLowerCase();

    return ((data?.reportLayout as YearAndListingLayout[]) || [])
      .map((layout) => {
        if (!("yearAndReport" in layout)) return layout;

        const filteredYearAndReport = layout.yearAndReport
          ?.map((yearData) => {
            const filteredReports = yearData.report?.filter((report) =>
              report.heading?.toLowerCase().includes(searchLower),
            );

            if (filteredReports && filteredReports.length > 0) {
              return { ...yearData, report: filteredReports };
            }
            return null;
          })
          .filter(
            (item): item is NonNullable<typeof item> => item !== null,
          );

        if (filteredYearAndReport && filteredYearAndReport.length > 0) {
          return { ...layout, yearAndReport: filteredYearAndReport };
        }
        return null;
      })
      .filter(
        (item): item is YearAndListingLayout => item !== null,
      );
  })();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setActiveSearch(searchValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    e.stopPropagation();
    setSearchValue(value);
    if (!value.trim()) {
      setActiveSearch("");
    }
  };

  return (
    <div>
      <SearchBanner
        title={title}
        desc={description}
        fullBg
        centerText={true}
        image={image?.url}
        mobImage={mobImage?.url}
        alt={image?.alternativeText}
        mobAlt={mobImage?.alternativeText}
        value={searchValue}
        onChange={handleChange}
        handleSearch={handleSearch}
        lineClassName="hidden"
        bottomMiddleStarClassName="hidden"
        showStar3={false}
        showStar2={false}
      />

      <DisclosureTabs categories={categories} />

      <YearAndListing reportLayout={filteredReportLayout} />
    </div>
  );
}
