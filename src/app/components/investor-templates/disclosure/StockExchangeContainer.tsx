"use client";
import React, { useState } from "react";
import SearchBanner from "../../banners/SearchBanner";
import DisclosureTabs from "./DisclosureTabs";
import { StockExchangeContainerProps } from "@/app/types/disclosure.type";
import YearQuarterListing from "../../templates/YearQuarterListing";
import { YearAndQuarterLayout } from "@/app/types/shareholder.type";

export default function StockExchangeContainer({
  data,
  categories,
}: StockExchangeContainerProps) {
  const { title, description, image, mobImage } = data?.banner || {};
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); // Track the submitted search

  // Filter based on activeSearch (only when submitted)
  const filteredReportLayout = (() => {
    if (!activeSearch.trim()) {
      return data?.reportLayout || [];
    }

    const searchLower = activeSearch.toLowerCase();

    return (data?.reportLayout || [])
      .map((layout) => {
        // Filter yearAndQuarter based on search
        const filteredYearAndQuarter = layout.yearAndQuarter
          ?.map((yearData) => {
            // Filter quarters based on search
            const filteredQuarters = yearData.quarter?.filter((quarterData) => {
              // Check if quarter matches
              const matchesQuarter = quarterData.quarter
                ?.toLowerCase()
                .includes(searchLower);

              // Check if any report heading matches
              const matchesReport = quarterData.report?.some((report) =>
                report.heading?.toLowerCase().includes(searchLower)
              );

              return matchesQuarter || matchesReport;
            });

            // Filter reports within each quarter based on heading only
            const filteredQuartersWithReports = filteredQuarters?.map(
              (quarterData) => {
                // If searching by quarter name, show all reports in that quarter
                const matchesQuarter = quarterData.quarter
                  ?.toLowerCase()
                  .includes(searchLower);

                if (matchesQuarter) {
                  return quarterData;
                }

                // Otherwise, filter reports by heading
                return {
                  ...quarterData,
                  report: quarterData.report?.filter((report) =>
                    report.heading?.toLowerCase().includes(searchLower)
                  ),
                };
              }
            );

            // Only return year data if it has matching quarters
            if (
              filteredQuartersWithReports &&
              filteredQuartersWithReports.length > 0
            ) {
              return {
                ...yearData,
                quarter: filteredQuartersWithReports,
              };
            }

            return null;
          })
          .filter((item): item is NonNullable<typeof item> => item !== null); // Type guard

        // Only return layout if it has matching data
        if (filteredYearAndQuarter && filteredYearAndQuarter.length > 0) {
          return {
            ...layout,
            yearAndQuarter: filteredYearAndQuarter,
          };
        }

        return null;
      })
      .filter((item): item is YearAndQuarterLayout => item !== null);
  })();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setActiveSearch(searchValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    e.stopPropagation();
    setSearchValue(value);

    // Clear search results if input is empty
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
        placeholder="Search by Document Name or Quarter"
        showStar3={false}
        lineClassName="hidden md:block"
        bottomMiddleStarClassName="hidden md:block"
      />

      <DisclosureTabs categories={categories} />

      <YearQuarterListing reportLayout={filteredReportLayout} />
    </div>
  );
}
