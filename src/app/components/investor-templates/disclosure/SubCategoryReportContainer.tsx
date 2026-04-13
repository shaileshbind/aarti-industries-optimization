"use client";
import { useState } from "react";
import SearchBanner from "../../banners/SearchBanner";
import DisclosureTabs from "./DisclosureTabs";
import SimpleListing from "../../templates/SimpleListing";
import { SubCategoryReportContainerProps } from "@/app/types/disclosure.type";
import { SubCategoryWithReportLayout } from "@/app/types/shareholder.type";

export default function SubCategoryReportContainer({
  data,
  categories,
}: SubCategoryReportContainerProps) {
  const { title, description, image, mobImage } = data?.banner || {};
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const filteredReportLayout = (() => {
    const layouts =
      (data?.reportLayout as SubCategoryWithReportLayout[]) || [];
    if (!activeSearch.trim()) return layouts;

    const searchLower = activeSearch.toLowerCase();

    return layouts
      .map((layout) => {
        const filteredReportGroups = layout.reports
          ?.map((group) => {
            const filtered = group.reports?.filter((r) =>
              r.heading?.toLowerCase().includes(searchLower),
            );
            if (filtered && filtered.length > 0) {
              return { ...group, reports: filtered };
            }
            return null;
          })
          .filter(
            (g): g is NonNullable<typeof g> => g !== null,
          );

        if (filteredReportGroups && filteredReportGroups.length > 0) {
          return { ...layout, reports: filteredReportGroups };
        }
        return null;
      })
      .filter(
        (item): item is SubCategoryWithReportLayout => item !== null,
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

      <SimpleListing reportLayout={filteredReportLayout} />
    </div>
  );
}
