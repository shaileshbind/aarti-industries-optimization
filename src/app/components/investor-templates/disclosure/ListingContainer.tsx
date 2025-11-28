"use client";
import React, { useState } from "react";
import SearchBanner from "../../banners/SearchBanner";
import DisclosureTabs from "./DisclosureTabs";
import DisclosureListingPage from "./DisclosureListingPage";
import { ListingContainerProps } from "@/app/types/disclosure.type";
import { ReportItemProps } from "@/app/types/annual-reports.type";

export default function ListingContainer({
  data,
  categories,
}: ListingContainerProps) {
  const { title, description, image, mobImage } = data?.banner || {};

  const [searchValue, setSearchValue] = useState("");
  const [filteredReports, setFilteredReports] = useState<ReportItemProps[]>(
    data?.reportLayout?.[0]?.reports || []
  );

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchValue.trim()) {
      setFilteredReports(data?.reportLayout?.[0]?.reports || []);
      return;
    }

    const filtered = (data?.reportLayout?.[0]?.reports || []).filter(
      (report) => {
        const searchLower = searchValue.toLowerCase();

        // Search in heading
        const matchesHeading = report.heading
          ?.toLowerCase()
          .includes(searchLower);

        return matchesHeading;
      }
    );

    setFilteredReports(filtered);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    e.stopPropagation();
    setSearchValue(value);

    // Optional: Search as user types
    if (!value.trim()) {
      setFilteredReports(data?.reportLayout?.[0]?.reports || []);
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
      />

      <DisclosureTabs categories={categories} />

      <DisclosureListingPage reports={filteredReports || []} />
    </div>
  );
}
