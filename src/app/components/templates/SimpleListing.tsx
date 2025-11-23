"use client";
import React, { useState } from "react";
import OrangeTabCard from "../cards/OrangeTabCard";
import Button from "../Button";
import clsx from "clsx";
import { FormControl, MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SimpleListingProps } from "@/app/types/simple-listing.type";

export default function SimpleListing({ reportLayout }: SimpleListingProps) {
  const [mobileVisibleCount, setMobileVisibleCount] = useState<number>(5);
  const [activeSubCategory, setActiveSubCategory] = useState<string>(
    reportLayout?.[0]?.subCategory || ""
  );

  const mobStyles = {
    backgroundColor: "#F7F9FA",
    borderRadius: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  const menuProps = {
    PaperProps: {
      sx: {
        borderRadius: "8px",
      },
    },
  };

  // Handler for subcategory selection
  const handleSubCategoryClick = (subCat: string) => {
    setActiveSubCategory(subCat);
    setMobileVisibleCount(5);
  };

  // Get current subcategory data
  const currentSubCategory = reportLayout?.find(
    (item) => item.subCategory === activeSubCategory
  );

  // Flatten all reports from the current subcategory
  const allReports =
    currentSubCategory?.reports?.flatMap(
      (reportGroup) => reportGroup.reports
    ) || [];

  return (
    <div className="fluid-container pt-10 pb-10 md:pb-[80px] lg:flex justify-between">
      {/* Left Sidebar - Subcategories (Desktop) */}
      {reportLayout?.length > 1 && (
        <div className="w-[20%] hidden lg:block">
          {reportLayout?.map((subCat, idx) => (
            <div
              key={`subcat_${idx}`}
              className={clsx(
                `py-5 px-2 border-b-2 border-b-[#E1E1E1] cursor-pointer text-base transition-all duration-300`,
                activeSubCategory === subCat.subCategory
                  ? "text-[#002F50]"
                  : "text-[#9997A2] hover:text-[#002F50]"
              )}
              onClick={() => handleSubCategoryClick(subCat.subCategory)}
            >
              {subCat.subCategory}
            </div>
          ))}
        </div>
      )}

      {/* Subcategory dropdown for mobile */}
      {reportLayout?.length > 1 && (
        <div className="block lg:hidden mb-6">
          <FormControl fullWidth>
            <Select
              sx={mobStyles}
              MenuProps={menuProps}
              value={activeSubCategory}
              onChange={(e) => handleSubCategoryClick(e.target.value as string)}
              IconComponent={KeyboardArrowDownIcon}
            >
              {reportLayout?.map((subCat, idx) => (
                <MenuItem
                  key={`mobile_subcat_${idx}`}
                  value={subCat.subCategory}
                >
                  {subCat.subCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {/* Reports Section */}
      <div
        className={clsx(
          "lg:p-10 lg:bg-[#F7F9FA] w-full rounded-[12px]",
          reportLayout?.length > 1 ? "lg:w-[75%]" : "lg:w-full"
        )}
      >
        {/* Report list */}
        <div className="lg:max-h-[60vh] overflow-x-hidden lg:overflow-y-auto scrollbar lg:pr-4">
          {/* Desktop - show all */}
          <div className="hidden lg:block">
            {allReports?.map((item) => (
              <div className="pb-4" key={item.id}>
                <OrangeTabCard
                  title={item?.heading}
                  link={item?.link}
                  scale={false}
                />
              </div>
            ))}
            {allReports.length === 0 && (
              <p className="text-center text-[#4C5861]">No reports available</p>
            )}
          </div>

          {/* Mobile - show limited with pagination */}
          <div className="block lg:hidden">
            {allReports?.slice(0, mobileVisibleCount)?.map((item) => (
              <div className="pb-4" key={item.id}>
                <OrangeTabCard
                  title={item?.heading}
                  link={item?.link}
                  scale={false}
                />
              </div>
            ))}
            {allReports.length === 0 && (
              <p className="text-center text-[#4C5861]">No reports available</p>
            )}
          </div>

          {/* View More Button */}
          {allReports && allReports.length > mobileVisibleCount && (
            <div
              className="flex justify-center lg:hidden mt-4"
              onClick={(e) => {
                e.preventDefault();
                setMobileVisibleCount((prevCount) => prevCount + 5);
              }}
            >
              <Button secondary title="View more" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
