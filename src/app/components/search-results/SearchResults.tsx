"use client";
import React, { useState } from "react";
import SearchBar from "../SearchBar";
import { H1 } from "../Typography2";
import DisclosureListingPage from "../investor-templates/disclosure/DisclosureListingPage";
import { ReportItemProps } from "@/app/types/annual-reports.type";

export default function SearchResults() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredReports, setFilteredReports] = useState<ReportItemProps[]>([]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchValue.trim()) {
      setFilteredReports([]);
      return;
    }

    // TODO: Replace with actual API call to search for documents
    // For now, this is a placeholder that can be connected to your search API
    // Example: const results = await fetchSearchResults(searchValue);
    // setFilteredReports(results);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    e.stopPropagation();
    setSearchValue(value);

    // Optional: Clear results when search is empty
    if (!value.trim()) {
      setFilteredReports([]);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 py-30">
        <H1 className="text-blue-200 font-medium lg:!text-[30px]">Search</H1>
        <SearchBar
          value={searchValue}
          onChange={handleChange}
          handleSearch={handleSearch}
          placeholder="Search by Document Name..."
          headerSearch={true}
        />
      </div>
      <div className="flex flex-col gap-4">
        <DisclosureListingPage reports={filteredReports || []} />
      </div>
    </>
  );
}
